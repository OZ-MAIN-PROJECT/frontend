import { sampleData } from "../../../types/wallet";
import { getEmotionBgClass } from "../../../utils/emotionColor";

type ListViewProps = {
  onDateSelect: (date: Date) => void;
};

const ListView = ({ onDateSelect }: ListViewProps) => {
  return (
    <div className="space-y-3">
      {sampleData.entries.map((entry) => {
        if (entry.totalAmount === 0) return null;

        const { date, entries: transactions } = entry;
        const day = new Date(date).getDate();

        // 수입/지출 합계 계산
        const income = transactions
          .filter((e) => e.type === "income")
          .reduce((sum, e) => sum + e.amount, 0);

        const expense = transactions
          .filter((e) => e.type === "expense")
          .reduce((sum, e) => sum + e.amount, 0);

        // 가장 큰 금액의 감정 추출
        const maxEntry = transactions.reduce((prev, curr) =>
          Math.abs(curr.amount) > Math.abs(prev.amount) ? curr : prev
        );
        const emotion = maxEntry.emotion;
        const bgClass = getEmotionBgClass(emotion);

        return (
          <div
            key={date.toISOString()}
            onClick={() => onDateSelect(new Date(date))}
            className={`w-full h-16 p-0 flex items-center rounded-lg bg-gray-200`}
          >
            <button className={`${bgClass} w-16 h-16 text-2xl font-semibold text-white rounded-r-none`}>{day}</button>
            <div className="flex items-center justify-around text-sm text-primary-500 px-5 flex-1">
              <div className="w-1/3">Income<span className="text-lg text-primary-800 ml-2 font-medium">{income.toLocaleString()}원</span></div>
              <div className="w-1/3">Expense<span className="text-lg text-primary-800 ml-2 font-medium">{expense.toLocaleString()}원</span></div>
              <div className="w-1/3">Total <span className="text-lg text-primary-800 ml-2 font-medium">{entry.totalAmount.toLocaleString()}원</span></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
