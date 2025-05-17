import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  categoryStatistics,
  EmotionStatistics,
} from "../../../types/statistic";
import { getEmotionColorMap } from "../../../utils/emotionColor";
import { Dot } from "lucide-react";
import { sampleCategoryStatistics, sampleEmotionStatistics } from "@/data/wallet";

const CATEGORY_COLORS = [
  "#60a5fa", "#fbbf24", "#f87171", "#a78bfa", "#34d399", "#fb7185", "#7dd3fc", "#fde68a", "#fca5a5"
];

const EmotionCategoryPieChart = () => {
  const [activeTab, setActiveTab] = useState<"emotion" | "category">("emotion");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data: (EmotionStatistics | categoryStatistics)[] =
    activeTab === "emotion" ? sampleEmotionStatistics : sampleCategoryStatistics;

  const CustomLegend = ({ payload }: { payload?: { value: string; color: string; payload: EmotionStatistics | categoryStatistics; }[] }) => {
    if (!payload) return null;
    return (
      <div className="w-full px-7 sm:px-0">
        <ul className="text-sm grid grid-cols-3 gap-3 sm:grid-cols-2 sm:gap-5">
          {payload.map((entry) => (
            <li key={entry.value} className="flex items-start gap-1">
              <span
                style={{ backgroundColor: entry.color }}
                className="w-3 h-3 mt-1 inline-block rounded-full"
              />
              <div className="text-xs">
                <p className="truncate">{entry.value} {entry.payload.rate}%</p>
                {"amount" in entry.payload && (
                  <p className="text-gray-600 text-xs">
                    {entry.payload.amount.toLocaleString()}원
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2 mx-7">
        <h2 className="text-lg font-semibold">소비 통계</h2>
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab("emotion")}
            className={`h-auto p-0 bg-white ${
              activeTab === "emotion"
                ? "text-primary-900 underline"
                : "text-primary-500 hover:text-primary-900 hover:underline"
            }`}
          >
            감정별 통계
          </button>
          <Dot size={16} className="text-primary-500" />
          <button
            onClick={() => setActiveTab("category")}
            className={`h-auto p-0 bg-white ${
              activeTab === "category"
                ? "text-primary-900 underline"
                : "text-primary-500 hover:text-primary-900 hover:underline"
            }`}
          >
            카테고리별 통계
          </button>
        </div>
      </div>

      <div className={`flex flex-col ${isMobile ? "items-center" : "sm:flex-row sm:items-center sm:gap-4"}`}>
        <div className="w-full sm:w-1/2">
          <ResponsiveContainer width="100%" height={isMobile ? 200 : 280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="rate"
                nameKey={activeTab === "emotion" ? "emotion" : "category"}
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 80 : 100}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      {(percent * 100).toFixed(0)}%
                    </text>
                  );
                }}
                labelLine={false}
              >
                {data.map((entry, index) => {
                  let color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
                  if (activeTab === "emotion" && "emotion" in entry) {
                    color = getEmotionColorMap[entry.emotion] || color;
                  }
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Pie>
              <Tooltip
                formatter={(_, __, props) => {
                  const payload = props.payload as EmotionStatistics | categoryStatistics;
                  return `${payload.amount.toLocaleString()}원`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 sm:mt-0">
          <CustomLegend payload={data.map((item, index) => ({
            value: "emotion" in item ? item.emotion : item.category,
            color: "emotion" in item ? getEmotionColorMap[item.emotion] : CATEGORY_COLORS[index % CATEGORY_COLORS.length],
            payload: item,
          }))} />
        </div>
      </div>
    </div>
  );
};

export default EmotionCategoryPieChart;
