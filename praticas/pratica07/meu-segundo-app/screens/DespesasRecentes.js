import { Text, View, StyleSheet } from "react-native";
import DespesaSaida from "../components/DespesaSaida";

function DespesasRecentes() {
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter((despesa) => {
      return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }

  const DUMMY_DESPESAS = [
    {
      id: "1",
      descricao: "Aluguel",
      valor: 1200.0,
      data: new Date("2023-06-01"),
    },
    {
      id: "2",
      descricao: "Supermercado",
      valor: 250.5,
      data: new Date("2023-06-05"),
    },
    {
      id: "3",
      descricao: "Transporte",
      valor: 100.0,
      data: new Date("2023-06-10"),
    },
    {
      id: "4",
      descricao: "Lazer",
      valor: 150.0,
      data: new Date("2023-06-15"),
    },
    {
      id: "5",
      descricao: "Saúde",
      valor: 200.0,
      data: new Date("2023-06-20"),
    },
  ];

  const despesasRecentes = filtrarUltimos7Dias(DUMMY_DESPESAS);
  return (
    <DespesaSaida despesas={despesasRecentes} periodo={"Últimos 7 dias"} />
  );
}

export default DespesasRecentes;
