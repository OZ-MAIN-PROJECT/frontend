const WalletListSkeleton = () => {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse flex border rounded shadow-sm items-center bg-gray-100 sm:grid sm:grid-cols-[1.1fr_1.5fr_1.1fr_0.8fr_1fr] sm:gap-4 px-4 py-3"
          >
            <div className="h-4 bg-gray-300 rounded w-20 sm:w-auto" />
            <div className="h-4 bg-gray-300 rounded w-32 sm:w-auto" />
            <div className="h-4 bg-gray-300 rounded w-16 sm:w-auto" />
            <div className="h-4 bg-gray-300 rounded w-16 sm:w-auto" />
            <div className="h-4 bg-gray-300 rounded w-24 sm:w-auto" />
          </div>
        ))}
      </div>
    );
  };

export default WalletListSkeleton;