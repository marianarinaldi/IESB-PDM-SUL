import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { CATEGORIES, getTheme } from "../constants/theme";
import { useExpenses } from "../store/expenses-context";

const INITIAL_FORM = {
  description: "",
  amount: "",
  date: new Date(),
  category: "",
};

function validate(values) {
  const errors = {};

  if (!values.description.trim() || values.description.trim().length < 3) {
    errors.description = "A descrição deve ter no mínimo 3 caracteres.";
  }

  const amount = parseFloat(values.amount);
  if (!values.amount.trim() || Number.isNaN(amount) || amount <= 0) {
    errors.amount = "O valor deve ser maior que zero.";
  }

  if (
    !(values.date instanceof Date) ||
    Number.isNaN(values.date.getTime()) ||
    values.date > new Date()
  ) {
    errors.date = "A data não pode ser futura.";
  }

  if (!values.category.trim()) {
    errors.category = "Selecione uma categoria.";
  }

  return errors;
}

function GerenciarDespesa({ navigation, route }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const scheme = useColorScheme();
  const colors = getTheme(scheme);
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);

  const currentExpense = useMemo(
    () => expenses.find((expense) => expense.id === expenseId),
    [expenseId, expenses],
  );

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const didPrefillForm = useRef(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar despesa" : "Nova despesa",
    });
  }, [navigation, isEditing]);

  useEffect(() => {
    if (isEditing && currentExpense && !didPrefillForm.current) {
      didPrefillForm.current = true;

      const animationFrame = requestAnimationFrame(() => {
        setForm({
          description: currentExpense.description,
          amount: String(currentExpense.amount),
          date: new Date(currentExpense.date),
          category: currentExpense.category,
        });
      });

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [currentExpense, isEditing]);

  function handleChange(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function handleAmountChange(text) {
    const normalizedText = text.replace(/,/g, ".");

    if (/^\d*\.?\d{0,2}$/.test(normalizedText)) {
      handleChange("amount", normalizedText);
    }
  }

  function handleDateChange(event, selectedDate) {
    setIsDatePickerVisible(Platform.OS === "ios");

    if (selectedDate) {
      handleChange("date", selectedDate);
    }
  }

  function handleSave() {
    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      id: isEditing ? expenseId : `${Date.now()}`,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(payload);
    } else {
      addExpense(payload);
    }

    navigation.goBack();
  }

  function handleDeleteExpense() {
    Alert.alert("Excluir despesa", "Deseja excluir esta despesa?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.formCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Descrição
            </Text>
            <TextInput
              value={form.description}
              onChangeText={(text) => handleChange("description", text)}
              placeholder="Ex.: Almoço"
              placeholderTextColor={colors.placeholder}
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.inputBackground,
                  borderColor: errors.description
                    ? colors.danger
                    : colors.border,
                },
              ]}
              maxLength={60}
            />
            {errors.description ? (
              <Text style={[styles.errorText, { color: colors.danger }]}>
                {errors.description}
              </Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Valor</Text>
            <TextInput
              value={form.amount}
              onChangeText={handleAmountChange}
              placeholder="0,00"
              placeholderTextColor={colors.placeholder}
              keyboardType="decimal-pad"
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.inputBackground,
                  borderColor: errors.amount ? colors.danger : colors.border,
                },
              ]}
            />
            {errors.amount ? (
              <Text style={[styles.errorText, { color: colors.danger }]}>
                {errors.amount}
              </Text>
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Data</Text>
            <Pressable
              onPress={() => setIsDatePickerVisible(true)}
              style={[
                styles.input,
                styles.pressableField,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: errors.date ? colors.danger : colors.border,
                },
              ]}
            >
              <Text style={{ color: colors.text }}>
                {new Intl.DateTimeFormat("pt-BR").format(form.date)}
              </Text>
            </Pressable>
            {errors.date ? (
              <Text style={[styles.errorText, { color: colors.danger }]}>
                {errors.date}
              </Text>
            ) : null}
            {isDatePickerVisible ? (
              <DateTimePicker
                value={form.date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
              />
            ) : null}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Categoria
            </Text>
            <Pressable
              onPress={() => setIsCategoryModalVisible(true)}
              style={[
                styles.input,
                styles.pressableField,
                {
                  backgroundColor: colors.inputBackground,
                  borderColor: errors.category ? colors.danger : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryValue,
                  { color: form.category ? colors.text : colors.placeholder },
                ]}
              >
                {form.category || "Selecione uma categoria"}
              </Text>
              <Ionicons
                name="chevron-down"
                size={18}
                color={colors.textMuted}
              />
            </Pressable>
            {errors.category ? (
              <Text style={[styles.errorText, { color: colors.danger }]}>
                {errors.category}
              </Text>
            ) : null}
          </View>

          <View style={styles.actionsRow}>
            {isEditing ? (
              <Pressable
                onPress={handleDeleteExpense}
                style={[
                  styles.dangerButton,
                  { backgroundColor: colors.danger },
                ]}
              >
                <Ionicons name="trash-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
            ) : null}

            <Pressable
              onPress={handleSave}
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="save-outline" size={18} color="#fff" />
              <Text style={styles.buttonText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isCategoryModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCategoryModalVisible(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setIsCategoryModalVisible(false)}
        >
          <Pressable
            style={[
              styles.modalCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={() => {}}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Selecione a categoria
            </Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => {
                  handleChange("category", category);
                  setIsCategoryModalVisible(false);
                }}
                style={[
                  styles.categoryOption,
                  {
                    borderColor:
                      form.category === category
                        ? colors.primary
                        : colors.border,
                    backgroundColor:
                      form.category === category
                        ? colors.primarySoft
                        : colors.surfaceSoft,
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      form.category === category ? colors.primary : colors.text,
                    fontWeight: "700",
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  formCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "center",
  },
  pressableField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  saveButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  dangerButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "flex-end",
  },
  modalCard: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    padding: 16,
    gap: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  categoryOption: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
});
