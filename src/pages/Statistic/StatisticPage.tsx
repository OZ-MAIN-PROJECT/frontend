import { useState } from "react";
import Frame from "../../components/common/Frame";
import YearMonthDropdown from "../Home/components/YearMonthDropdown";
import YearlyLineChart from "./components/YearlyLineChart";
import EmotionCategoryPieChart from "./components/EmotionCategoryPieChart";
import SummarySwiper from "./components/SummarySwiper";
import WalletList from "../Wallet/components/WalletList";
import { useStatisticsData } from "@/hooks/useStatisticData";

const StatisticsPage = () => {

  const today = new Date();

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth()); // 0-based

  const monthLabel = `${selectedMonth + 1}`.padStart(2, "0");

  const { isLoading, isError, statistic, list } = useStatisticsData(selectedYear, selectedMonth + 1);

  if (isLoading) return <p className="text-center py-10">통계를 불러오는 중...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">데이터를 불러오는 데 실패했습니다.</p>;
  
  return (
    <div className="space-y-4">
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
      {statistic &&
        <SummarySwiper month={selectedMonth} stat={statistic} />
      }
      </div>

      {/* 중단 차트 영역 */}
      <div className="grid gap-4 2xl:grid-cols-[3fr_2fr]">
        <Frame className="bg-white px-0">
          <h2 className="text-lg font-semibold mb-4 mx-7">{selectedYear}년 월별 소비</h2>
          <YearlyLineChart year={selectedYear} month={selectedMonth} />
        </Frame>
        <Frame className="bg-white px-0">
          <EmotionCategoryPieChart year={selectedYear} month={selectedMonth + 1}  />
        </Frame>
      </div>

      {/* 하단 리스트 영역 */}
      <Frame>
        <h2 className="text-lg font-semibold mb-4">{monthLabel}월 소비 내역</h2>
        <div className="overflow-x-auto">
          <WalletList data={list.data?.list.flatMap(day => day.entries) ?? []} />
        </div>
      </Frame>
    </div>
  );
};

export default StatisticsPage;
