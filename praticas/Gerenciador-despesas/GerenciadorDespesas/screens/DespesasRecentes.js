import DespesaSaida from "../components/despesa/DespesaSaida";

function filtrarUltimos7Dias(despesas) {
  const hoje = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(hoje.getDate() - 7);

  return despesas.filter((despesa) => {
    return despesa.data >= seteDiasAtras && despesa.data <= hoje;
  });
}

function DespesasRecentes({ despesas }) {
  const despesasRecentes = filtrarUltimos7Dias(despesas);
  return <DespesaSaida despesas={despesasRecentes} periodo="Últimos 7 dias" />;
}

export default DespesasRecentes;
