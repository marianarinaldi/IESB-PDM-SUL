import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@expenses";

const ExpensesContext = createContext(null);

function normalizeExpense(expense) {
  return {
    ...expense,
    amount: Number(expense.amount),
    date: expense.date instanceof Date ? expense.date : new Date(expense.date),
  };
}

function serializeExpense(expense) {
  return {
    ...expense,
    amount: Number(expense.amount),
    date:
      expense.date instanceof Date
        ? expense.date.toISOString()
        : new Date(expense.date).toISOString(),
  };
}

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense,
      );
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "SET":
      return Array.isArray(action.payload) ? action.payload : [];
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedExpenses) {
          const parsedExpenses =
            JSON.parse(storedExpenses).map(normalizeExpense);
          dispatch({ type: "SET", payload: parsedExpenses });
        }
      } catch (error) {
        console.error("Failed to load expenses from storage", error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function persistExpenses() {
      try {
        const payload = expenses.map(serializeExpense);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (error) {
        console.error("Failed to save expenses to storage", error);
      }
    }

    persistExpenses();
  }, [expenses, isLoaded]);

  const value = useMemo(
    () => ({
      expenses,
      addExpense: (expense) =>
        dispatch({ type: "ADD", payload: normalizeExpense(expense) }),
      updateExpense: (expense) =>
        dispatch({ type: "UPDATE", payload: normalizeExpense(expense) }),
      deleteExpense: (expenseId) =>
        dispatch({ type: "DELETE", payload: expenseId }),
      clearExpenses: () => dispatch({ type: "SET", payload: [] }),
    }),
    [expenses],
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error(
      "useExpenses must be used within an ExpensesContextProvider",
    );
  }

  return context;
}
