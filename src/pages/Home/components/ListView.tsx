import { getEmotionBgClass } from "../../../utils/emotionColor";
import { MonthlyWalletList } from "@/types/wallet";

type ListViewProps = {
  onDateSelect: (date: Date) => void;
  data?: MonthlyWalletList;
};

const ListView = ({ onDateSelect, data }: ListViewProps) => {
  const visibleEntries = data?.list.filter((entry) => entry.totalAmount > 0) ?? [];

  if (visibleEntries.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        등록된 데이터가 없습니다.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {data?.list.map((entry) => {
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
            <button className={`${bgClass} w-16 h-16 text-xl md:text-2xl font-semibold text-white rounded-l-lg`}>{day}</button>
            <div className="flex items-center justify-around text-xs md:text-sm text-primary-500 px-5 flex-1">
              <div className="w-1/3">Income<span className="block text-base md:text-lg text-primary-800 2xl:ml-2 font-medium 2xl:inline-block">{income.toLocaleString()}원</span></div>
              <div className="w-1/3">Expense<span className="block text-base md:text-lg text-primary-800 2xl:ml-2 font-medium 2xl:inline-block">{expense.toLocaleString()}원</span></div>
              <div className="w-1/3">Total <span className="block text-base md:text-lg text-primary-800 2xl:ml-2 font-medium 2xl:inline-block">{entry.totalAmount?.toLocaleString()}원</span></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListView;
