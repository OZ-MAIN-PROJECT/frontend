import WalletList from "./components/WalletList";
import { useState } from "react";
import { useWalletEntries } from "@/hooks/useWallet";
import Pagination from "./components/Pagenation";
import SearchInput from "./components/SearchInput";

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

    if (isLoading) return <div>로딩 중...</div>;
    if (isError || !data) return <div>데이터를 불러오지 못했습니다.</div>;

    return(
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary-800">수입/지출 내역</h2>
            <div className="flex justify-between items-center">
                <p className="text-lg">총 <span className="text-accent-blue">{data.totalItems}</span>건</p>
                <SearchInput
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onSubmit={handleSearch}
                />
            </div>
            <WalletList
            data={data.result}
            />
            <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={(p) => setPage(p)} />
        </div>
    )
}

export default WalletPage;