import { Stack } from "expo-router";
import { ExpensesContextProvider } from "../store/expenses-context";

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="task/[id]"
          options={{
            headerShown: true,
            title: "Tarefa",
          }}
        />
        <Stack.Screen
          name="new-task"
          options={{
            presentation: "modal",
            title: "Nova tarefa",
            headerShown: true,
          }}
        />
      </Stack>
    </ExpensesContextProvider>
  );
}
