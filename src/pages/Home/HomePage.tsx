import { useState } from "react";
import Frame from "../../components/common/Frame";
import { BanknoteArrowDown, BanknoteArrowUp, CalendarDays, ListTodo, Triangle } from "lucide-react";
import CalendarView from "./components/CalendarView";
import ListView from "./components/ListView";
import YearMonthDropdown from "./components/YearMonthDropdown";
import { formatDate } from "../../utils/utils";
import { getEmotionBgClass } from "../../utils/emotionColor";
import { useWalletMonthly, useWalletTotal } from "@/hooks/useWallet";

const HomePage = () => {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  const today = new Date();

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth()); // 0-based
  const [pickerOpen, setPickerOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data: walletData } = useWalletMonthly(selectedYear, selectedMonth + 1);
  const { data: totalData } = useWalletTotal(selectedYear, selectedMonth + 1);

  // 해당 날짜의 상세 내역 필터링
  const selectedWalletEntries =
    walletData?.list.find(
      (entry) =>
        selectedDate && formatDate(entry.date) === formatDate(selectedDate)
    )?.entries || [];

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[3fr_1fr] lg:items-start">
      <Frame>
        {/* 보기 모드 전환 버튼 */}
        <div className="flex gap-2 items-center mb-2 justify-end">
          <button
            className={`p-0 bg-white ${
              viewMode === "calendar" ? "text-primary-800" : "text-gray-500"
            }`}
            onClick={() => setViewMode("calendar")}
          >
            <CalendarDays size={20} />
          </button>
          <span className="border-gray-500 border rounded-full h-5"></span>
          <button
            className={`p-0 bg-white ${
              viewMode === "list" ? "text-primary-800" : "text-gray-500"
            }`}
            onClick={() => setViewMode("list")}
          >
            <ListTodo />
          </button>
        </div>
        <div className="mx-auto w-full sm:w-3/4">
            <div className="relative w-fit mx-auto">
                <div
                    className="flex gap-2 items-center text-2xl sm:text-4xl font-bold cursor-pointer justify-center text-primary-800"
                    onClick={() => setPickerOpen(!pickerOpen)}
                >
                    {selectedYear}.{(selectedMonth + 1).toString().padStart(2, "0")}{" "}
                    <Triangle className="transform rotate-180 fill-current text-primary-800 w-4 h-4 sm:w-6 sm:h-6" />
                </div>

                {pickerOpen && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10">
                    <YearMonthDropdown
                        year={selectedYear}
                        month={selectedMonth}
                        onChange={(y, m) => {
                        setSelectedYear(y);
                        setSelectedMonth(m);
                        setPickerOpen(false);
                        }}
                        showYear={true}
                        showMonth={true}
                        className="bg-white p-4 shadow-md text-xl rounded-md border"
                    />
                    </div>
                )}
            </div>


            {/* 달력 or 리스트 뷰 */}
            <div className="my-10">
                {viewMode === "calendar" ? (
                <CalendarView
                    year={selectedYear}
                    month={selectedMonth}
                    onDateSelect={setSelectedDate}
                    data={walletData}
                />
                ) : (
                <ListView
                    onDateSelect={setSelectedDate}
                    data={walletData}
                />
                )}
            </div>
        </div>
      </Frame>

      {/* 오른쪽 사이드 */}
      <aside className="flex flex-col gap-4">
        {/* 해당 월 총 수입/지출 */}
        <Frame className="bg-white space-y-5">
            <div className="flex justify-between">
                <h3 className="flex gap-1"><BanknoteArrowUp />총 수입</h3>
                <p className="text-accent-blue text-lg font-medium">
                  {totalData?.income?.toLocaleString() || 0}원
                </p>
            </div>
            <div className="border-b"></div>
            <div className="flex justify-between">
                <h3 className="flex gap-1"><BanknoteArrowDown />총 지출</h3>
                <p className="text-accent-red text-lg font-medium">
                  -{totalData?.expense?.toLocaleString() || 0}원
                </p>
            </div>
        </Frame>

        {/* 선택된 날짜 및 상세 내역 */}
        <Frame>
          <h3 className="font-semibold text-gray-700 mb-2">
            {selectedDate
              ? `${selectedDate.getFullYear()}년 ${
                  selectedDate.getMonth() + 1
                }월 ${selectedDate.getDate()}일`
              : "날짜를 선택해주세요"}
          </h3>

          <ul className="space-y-2">
            {selectedWalletEntries.length > 0 ? (
              selectedWalletEntries.map((entry) => (
                <li key={entry.id} className="text-sm border-b pb-1">
                  <div className="flex font-medium gap-2 items-center h-10">
                  <span className={`w-5 h-5 rounded-md ${getEmotionBgClass(entry.emotion)}`}></span>
                    <span>{entry.title}</span>
                        <span className={`ml-auto ${entry.type == "INCOME" ? "text-accent-blue" : "text-accent-red"}`}>
                        {(entry.type === "INCOME" ? entry.amount : -entry.amount).toLocaleString()}원
                    </span>

                  </div>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-400">내역이 없습니다.</p>
            )}
          </ul>
        </Frame>
      </aside>
    </div>
  );
};

export default HomePage;
