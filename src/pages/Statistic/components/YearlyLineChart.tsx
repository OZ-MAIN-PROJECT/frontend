import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { sampleYearlyStatistics } from "../../../types/statistic";

const YearlyLineChart = () => {
  const chartData = sampleYearlyStatistics.monthlyData.map((m) => ({
    month: `${m.month}월`,
    income: m.incomeAmount,
    expense: m.expenseAmount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(v) => `${v / 10000}`} />
        <Tooltip formatter={(value: number) => `${value.toLocaleString()}원`} />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} name="수입" />
        <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} name="지출" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyLineChart;
