import { useState } from "react";
import Frame from "../../components/common/Frame";
import YearMonthDropdown from "../Home/components/YearMonthDropdown";

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
      <div className="grid grid-cols-4 gap-6">
        <Frame>
          <h2 className="text-lg font-bold">00월 소비 금액</h2>
          <p className="text-2xl font-semibold mt-2 text-blue-600">총 000,000,000원</p>
          <p className="text-xs text-gray-400">저번달보다 0% 늘었어요!</p>
        </Frame>
        <Frame>
          <h2 className="text-sm font-semibold text-gray-600">총 수입</h2>
          <p className="text-blue-600 font-bold text-xl">000,000,000원</p>
          <h2 className="text-sm font-semibold mt-4 text-gray-600">총 지출</h2>
          <p className="text-red-500 font-bold text-xl">000,000,000원</p>
        </Frame>
        <Frame>
          <h2 className="text-sm font-semibold">00월 주요 감정 소비</h2>
          <p className="text-pink-400 text-lg font-bold">행복</p>
          <p className="text-sm text-gray-500">소비의 20%를 행복했을 때 사용했어요!</p>
        </Frame>
        <Frame>
          <h2 className="text-sm font-semibold">00월 주요 카테고리 소비</h2>
          <p className="text-indigo-500 text-lg font-bold">식비</p>
          <p className="text-sm text-gray-500">소비의 20%를 식비에 사용했어요!</p>
        </Frame>
      </div>

      {/* 중단 차트 영역 */}
      <div className="grid grid-cols-[3fr_2fr] gap-6">
        <Frame>
          <h2 className="text-lg font-semibold mb-4">2025년 월별 소비</h2>
          {/* 여기에 Bar Chart 삽입 */}
          <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
            Bar Chart 영역
          </div>
        </Frame>
        <Frame>
          <h2 className="text-lg font-semibold mb-4">소비 통계</h2>
          {/* 여기에 Pie Chart 삽입 */}
          <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
            Pie Chart 영역
          </div>
        </Frame>
      </div>

      {/* 하단 테이블 영역 */}
      <Frame>
        <h2 className="text-lg font-semibold mb-4">00월 소비 내역</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2 px-3">일시</th>
                <th className="py-2 px-3">이름</th>
                <th className="py-2 px-3">내용</th>
                <th className="py-2 px-3">카테고리</th>
                <th className="py-2 px-3">감정</th>
                <th className="py-2 px-3">금액</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b text-gray-800">
                  <td className="py-2 px-3">2025.04.0{i + 1}</td>
                  <td className="py-2 px-3">홍길동</td>
                  <td className="py-2 px-3">점심식사</td>
                  <td className="py-2 px-3">식비</td>
                  <td className="py-2 px-3">행복</td>
                  <td className="py-2 px-3 text-red-500">-12,000원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Frame>
    </div>
  );
};

export default StatisticsPage;
