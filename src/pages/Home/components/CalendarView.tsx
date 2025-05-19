import Calendar from "react-calendar";
import "./CalendarOverride.css";
import { formatDate } from "../../../utils/utils";
import { getEmotionBgClass } from "../../../utils/emotionColor";
import { MonthlyWalletList } from "@/types/wallet";

type CalendarViewProps = {
  year: number;
  month: number;
  onDateSelect: (date: Date) => void;
  data?: MonthlyWalletList;
};


const CalendarView = ({ year, month, onDateSelect, data }: CalendarViewProps) => {
  const value = new Date(year, month, 1);

  return (
      <div className="flex justify-center">
        <Calendar
          value={value}
          activeStartDate={value}
          className="w-full"
          view="month"
          locale="en"
          calendarType="hebrew"
          onClickDay={onDateSelect}
          tileClassName={() => "relative aspect-square p-0 border-none bg-gray-300"}
          tileContent={({ date }) => {
            const match = data?.list.find(
              (entry) => formatDate(entry.date) === formatDate(date)
            );
          
            if (!match || match.entries.length === 0) return null;
          
            const income = match.entries
              .filter((e) => e.type === "INCOME")
              .reduce((sum, e) => sum + e.amount, 0);
          
            const expense = match.entries
              .filter((e) => e.type === "EXPENSE")
              .reduce((sum, e) => sum + e.amount, 0);
          
            const total = income - expense;
          
            if (total === 0) return null;
          
            const maxEntry = match.entries.reduce((prev, curr) =>
              Math.abs(curr.amount) > Math.abs(prev.amount) ? curr : prev,
              match.entries[0]
            );
          
            const bgClass = getEmotionBgClass(maxEntry.emotion);
          
            return (
              <div
                className={`w-full h-full flex items-center justify-center text-sm text-white ${bgClass}`}
              >
                {total.toLocaleString()}원
              </div>
            );
          }}
        />

      </div>

  );
};
export default CalendarView;