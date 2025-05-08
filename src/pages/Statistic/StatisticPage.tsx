import { useState } from "react";
import Frame from "../../components/common/Frame";
import YearMonthDropdown from "../Home/components/YearMonthDropdown";
import YearlyLineChart from "./components/YearlyLineChart";
import EmotionCategoryPieChart from "./components/EmotionCategoryPieChart";
import SummarySwiper from "./components/SummarySwiper";

const StatisticsPage = () => {

  const today = new Date();
  
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth()); // 0-based

  return (
    <div className="space-y-8">
      <div className="flex items-center text-2xl text-primary-900 font-bold">
      <YearMonthDropdown
        year={selectedYear}
        month={selectedMonth}
        onChange={(y, m) => {
        setSelectedYear(y);
        setSelectedMonth(m);
        }}
        showYear={true}
        showMonth={true}
        className="text-2xl mr-2"
      />
      소비내역
      </div>
      {/* 상단 요약 영역 */}
      <div className="w-full">
        <SummarySwiper />
      </div>

      {/* 중단 차트 영역 */}
      <div className="grid grid-cols-[3fr_2fr] gap-6">
        <Frame>
          <h2 className="text-lg font-semibold mb-4">2025년 월별 소비</h2>
          <YearlyLineChart />
        </Frame>
        <Frame>
          <EmotionCategoryPieChart />
        </Frame>
      </div>

      {/* 하단 리스트 영역 */}
      <Frame>
        <h2 className="text-lg font-semibold mb-4">00월 소비 내역</h2>
        <div className="overflow-x-auto">
        </div>
      </Frame>
    </div>
  );
};

export default StatisticsPage;
