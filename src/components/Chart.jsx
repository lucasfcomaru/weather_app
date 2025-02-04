import styled from "styled-components";
import { theme } from "../theme/Theme";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const StyledChart = styled.div`
  display: flex;
  background: ${theme.yellow1};
  color: ${theme.grey};
  margin-top: 20px;
  padding: 40px;
  border-radius: 6px;
  width: 100%;
  min-height: 400px;

  & h3 {
    font-size: 2rem;
    max-width: 16ch;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 60px;
    align-items: flex-start;
  }

  @media (prefers-color-scheme: light) {
    background: ${theme.grey};
    color: ${theme.white};
  }
`;

const Chart = ({ weather5Days }) => {
  // verificação para garantir que weather5Days não é null
  if (!weather5Days || !weather5Days.list) {
    return <p>Carregando dados do gráfico...</p>;
  }

  // criar array de objetos com datas e temperaturas
  let days = [];
  for (let info of weather5Days.list) {
    let infoFilter = {
      day: info.dt_txt.slice(0, 10),
      temp: info.main.temp,
    };
    days.push(infoFilter);
  }

  // filtrar datas únicas
  let filterDays = [];
  for (let filter of days) {
    if (
      filterDays.length === 0 ||
      filter.day !== filterDays[filterDays.length - 1].day
    ) {
      filterDays.push(filter);
    }
  }

  //mudar as cores dinamicamente conforme o tema do usuário
  const themeLine = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? theme.black
  : theme.yellow1;
  const themeArea = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? theme.grey
  : theme.lightGrey;

  return (
    <StyledChart className="container">
      <h3>Variação de temperatura para os próximos 5 dias</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={filterDays}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <XAxis dataKey="day" label={{ value: "Datas", dy: 20 }} />
          <YAxis
            label={{
              value: "Temperatura",
              angle: -90,
              position: "insideLeft",
              dy: 50,
            }}
          />
          <Area
            type={"monotone"}
            stroke={themeLine}
            strokeWidth={2.5}
            fill={themeArea}
            dataKey="temp"
            dot={themeLine}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledChart>
  );
};

export default Chart;
