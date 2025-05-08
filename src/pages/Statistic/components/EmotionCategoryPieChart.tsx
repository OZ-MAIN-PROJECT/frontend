import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { categoryStatistics, EmotionStatistics, sampleCategoryStatistics, sampleEmotionStatistics } from "../../../types/statistic";
import { getEmotionBgClass } from "../../../utils/emotionColor";

const CATEGORY_COLORS = ["#60a5fa", "#fbbf24", "#f87171", "#a78bfa", "#34d399", "#fb7185"];

const EmotionCategoryPieChart = () => {
  const [activeTab, setActiveTab] = useState<"emotion" | "category">("emotion");

  const data: (EmotionStatistics | categoryStatistics)[] =
    activeTab === "emotion" ? sampleEmotionStatistics : sampleCategoryStatistics;

  return (
    <div>
      <div className="flex justify-between mb-4 gap-2">
      <h2 className="text-lg font-semibold">소비 통계</h2>
      <div className="flex ">
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

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="rate"
            nameKey={activeTab === "emotion" ? "emotion" : "category"}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => {
              const color =
                activeTab === "emotion" && "emotion" in entry
                  ? getComputedStyle(document.documentElement)
                      .getPropertyValue(`--${getEmotionBgClass(entry.emotion).replace("bg-", "")}`)
                      ?.trim() || CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                  : CATEGORY_COLORS[index % CATEGORY_COLORS.length];
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toLocaleString()}원`} />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionCategoryPieChart;
