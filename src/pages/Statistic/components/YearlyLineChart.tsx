import { sampleYearlyStatistics } from "@/data/wallet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const YearlyLineChart = () => {
  const chartData = sampleYearlyStatistics.monthlyStatistics.map((m) => ({
    month: `${m.month}월`,
    income: m.incomeAmount,
    expense: m.expenseAmount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300} className={`pr-5`}>
      <LineChart data={chartData} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis 
          tickFormatter={(v) => `${v / 10000}`}
          tick={{ fontSize: 12 }}
          label={{
            position: "top",
            offset: 10,
            fontSize: 12,
            fill: "#999"
          }}
        />
        <Tooltip formatter={(value: number) => `${value.toLocaleString()}원`} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} name="수입" />
        <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} name="지출" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default YearlyLineChart;