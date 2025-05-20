import WalletList from "./components/WalletList";
import { useState } from "react";
import { useWalletEntries } from "@/hooks/useWallet";
import Pagination from "./components/Pagenation";
import SearchInput from "./components/SearchInput";
import WalletListSkeleton from "./components/WalletListSkeleton";

const WalletPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data, isLoading, isError } = useWalletEntries(searchKeyword, page, 10);

  const handleSearch = () => {
    console.log("검색 실행:", keyword);
    setSearchKeyword(keyword);
    setPage(1); // 페이지 초기화
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-800 dark:text-white">수입/지출 내역</h2>

      <div className="flex justify-between items-center">
        <p className="text-lg dark:text-dark-500">
          총 <span className="text-accent-blue">{data?.totalItems}</span>건
        </p>
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSubmit={handleSearch}
        />
      </div>

      {isLoading ? (
        <WalletListSkeleton />
      ) : isError || !data ? (
        <p className="text-center text-red-500 py-10">데이터를 불러오지 못했습니다.</p>
      ) : (
        <>
          <WalletList data={data.result} />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  );
};

export default WalletPage;
