import Calendar from "react-calendar";
import "./CalendarOverride.css";
import { formatDate } from "../../../utils/utils";
import { getEmotionBgClass } from "../../../utils/emotionColor";
import { sampleData } from "@/data/wallet";

type CalendarViewProps = {
  year: number;
  month: number;
  onDateSelect: (date: Date) => void;
};


const CalendarView = ({ year, month, onDateSelect }: CalendarViewProps) => {
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
            const match = sampleData.entries.find(
              (entry) => formatDate(entry.date) === formatDate(date)
            );

            if (!match || match.totalAmount === 0) return null;

            const maxEntry = match.entries.reduce((prev, curr) =>
              Math.abs(curr.amount) > Math.abs(prev.amount) ? curr : prev
            );

            const bgClass = getEmotionBgClass(maxEntry.emotion);

            return (
              <button
                type="button"
                className={`w-full h-full flex items-center justify-center text-sm text-white ${bgClass}`}
              >
                {match.totalAmount.toLocaleString()}
              </button>
            );
          }}
        />

      </div>

  );
};
export default CalendarView;