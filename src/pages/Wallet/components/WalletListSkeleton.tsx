const WalletListSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="hidden sm:h-14 items-center sm:grid sm:grid-cols-[1.1fr_1.5fr_1.1fr_0.8fr_1fr] text-base bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white font-medium py-2 px-4">
        <div className="text-left">날짜</div>
        <div className="text-left">제목</div>
        <div className="text-center">금액</div>
        <div className="text-center">카테고리</div>
        <div className="text-center">감정</div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex border rounded shadow-sm border-none items-center bg-gray-100 dark:bg-gray-700 sm:grid sm:grid-cols-[1.1fr_1.5fr_1.1fr_0.8fr_1fr] sm:gap-4 px-4 py-3"
        >
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 sm:w-auto" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 sm:w-auto" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 sm:w-auto" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 sm:w-auto" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 sm:w-auto" />
        </div>
      ))}
    </div>
  );
};

export default WalletListSkeleton;
