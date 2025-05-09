import { Wallet } from "@/types/wallet";
import EmotionBadge from "./EmotionBadge";
import { formatDate } from "@/utils/utils";

type WalletListProps = {
  data: Wallet[];
  isPaginated?: boolean;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

export default function WalletList({
  data,
  isPaginated = false,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
}: WalletListProps) {
  return (
    <div className="w-full space-y-4 sm:space-y-0">
      {/* 헤더 */}
      <div className="hidden sm:h-14 items-center sm:grid sm:grid-cols-[1.1fr_1.5fr_1.1fr_0.8fr_1fr] text-base bg-gray-100 text-gray-800 font-medium py-2 px-4">
        <div className="text-left">날짜</div>
        <div className="text-left">제목</div>
        <div className="text-center">금액</div>
        <div className="text-center">카테고리</div>
        <div className="text-center">감정</div>
      </div>

      {data.map((item) => (
        <div
          key={item.id}
          className="flex-wrap sm:flex-nowrap flex border rounded shadow-sm text-base items-center bg-white sm:grid sm:grid-cols-[1fr_1.5fr_1fr_0.8fr_1fr] sm:items-center gap-2 sm:gap-0 sm:shadow-none sm:border-x-0 sm:border-t-0 sm:border-b sm:rounded-none px-4 py-3"
        >
          {/* 날짜 */}
          <div className="text-gray-600 sm:text-gray-700 w-full sm:w-auto text-left text-sm sm:text-base">
            {formatDate(item.date)}
          </div>

          {/* 제목 */}
          <div className="text-gray-700 w-full sm:w-auto text-left">
            {item.title}
          </div>
          {/* 금액 */}
          <div
            className={`w-auto text-right ${
              item.type === "income" ? "text-accent-blue" : "text-accent-red"
            }`}
          >
            {item.type === "income" ? "+" : "-"}
            {item.amount.toLocaleString()}원
          </div>

          {/* 카테고리 */}
          <div className=" w-auto text-center text-gray-600 sm:text-gray-700 text-sm sm:text-base">
            {item.category}
          </div>

          {/* 감정 */}
          <div className="text-gray-700 sm:w-auto text-left sm:text-center w-full">
            <EmotionBadge emotion={item.emotion} />
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      {isPaginated && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => onPageChange?.(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1
                  ? "bg-accent-blue text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
