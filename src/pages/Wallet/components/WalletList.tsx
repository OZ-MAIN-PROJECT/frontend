type WalletListProps = {
    items: EntryType[];          // 전체 데이터
    paginated?: boolean;         // true면 10개씩 페이징, false면 전체 표시
  };
  
const WalletList = ({ items, paginated = false }: WalletListProps) => {
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const pagedItems = paginated
        ? items.slice((page - 1) * pageSize, page * pageSize)
        : items;

    return (
        <div>
        {pagedItems.map((item) => (
            <div key={item.id} className="p-4 border-b">
            <div>{item.title}</div>
            <div>{item.amount.toLocaleString()}원</div>
            </div>
        ))}

        {paginated && (
            <div className="flex justify-center mt-4 gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                이전
            </button>
            <span>{page}</span>
            <button disabled={page * pageSize >= items.length} onClick={() => setPage((p) => p + 1)}>
                다음
            </button>
            </div>
        )}
        </div>
    );
};

export default WalletList;
  