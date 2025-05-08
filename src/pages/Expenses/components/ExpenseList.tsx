// src/pages/Expenses/components/ExpenseList.tsx
import React, { useState, useMemo, useEffect, useRef } from 'react'; // useRef 추가 (indeterminate 속성용)

// Expenses.tsx에서 정의한 Entry 인터페이스와 동일
interface ExpenseEntry {
  walletUuid: string; // API 명세서에 맞게 string으로!
  amount: number;
  walletCategory: string;
  title: string;
  emotion: string; // API 명세서에는 emotionTag였지만, 여기서는 emotion으로 통일해서 사용할게!
  type: string; // 'EXPENSE' 또는 'INCOME'
}

// Expenses.tsx에서 정의한 CalendarEntry 인터페이스와 동일
interface CalendarEntry {
  date: string;
  totalAmount: number;
  entries: ExpenseEntry[];
}

// 부모(Expenses.tsx)로부터 받을 props 타입 정의
interface ExpenseListProps {
  calendar: CalendarEntry[]; // 이미 필터링된 데이터가 날짜별로 그룹화된 형태로 옴
  onDelete: (walletUuid: string) => void; // 개별 삭제 함수
}

// 📌 한 페이지에 보여줄 항목 수 설정
const ITEMS_PER_PAGE = 5; // 예시로 한 페이지에 5개씩 보여줄게!

const ExpenseList: React.FC<ExpenseListProps> = ({ calendar, onDelete }) => {

  // 📌 페이지네이션을 위한 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  // 📌 체크된 항목들의 walletUuid를 저장하는 상태
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // 📌 모든 거래 항목을 날짜 구분 없이 하나의 평탄화된 배열로 만들기
  // 페이지네이션과 체크박스 선택을 위해 이 배열을 사용해.
  // calendar 데이터가 바뀔 때만 useMemo로 다시 계산해서 효율적이야.
  const allEntries = useMemo(() => {
    // calendar 배열(날짜별 그룹)을 순회하면서 각 날짜의 entries 배열을 모두 합쳐
    // 각 entry에는 원래 속해있던 날짜 정보(day.date)도 추가해줘!
    return calendar.flatMap(day =>
        day.entries.map(entry => ({ ...entry, date: day.date }))
    );
  }, [calendar]); // calendar prop이 변경될 때 useMemo 다시 실행

  // 📌 현재 페이지에 보여줄 항목들 계산
  // allEntries 배열과 현재 페이지(currentPage)가 바뀔 때만 useMemo로 다시 계산해.
  const currentEntries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // 현재 페이지의 시작 인덱스
    const endIndex = startIndex + ITEMS_PER_PAGE; // 현재 페이지의 끝 인덱스 (slice는 endIndex 포함 안 함)
    return allEntries.slice(startIndex, endIndex); // allEntries 배열에서 현재 페이지 범위만큼 잘라내기
  }, [allEntries, currentPage]); // allEntries 또는 currentPage 상태가 바뀔 때 useMemo 실행


  // 📌 전체 페이지 수 계산
  // allEntries 배열의 총 개수를 한 페이지당 항목 수로 나누고 올림해서 전체 페이지 수를 구해.
  // 항목이 0개일 때는 최소 1페이지로 표시되도록 Math.max(1, ...) 사용
  const totalPages = Math.max(1, Math.ceil(allEntries.length / ITEMS_PER_PAGE));


  // 📌 calendar 데이터(필터링 결과)가 변경될 때마다 현재 페이지를 1페이지로 초기화
  // 예를 들어 검색어 변경으로 필터링 결과가 확 바뀌면 페이지도 처음으로 돌아가는 게 자연스럽겠지?
  useEffect(() => {
       setCurrentPage(1); // 현재 페이지를 1로 리셋
       setSelectedItems([]); // 선택된 항목들도 리셋
   }, [calendar]); // calendar prop이 변경될 때마다 useEffect 실행


  // 📌 페이지 변경 핸들러 ('이전', '다음' 버튼 클릭 시)
  const handlePageChange = (page: number) => {
    // 페이지 번호가 유효한 범위(1 ~ totalPages) 내에 있는지 확인
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // 현재 페이지 상태 업데이트
      setSelectedItems([]); // 페이지가 바뀌면 선택된 항목들을 초기화 (새로운 페이지에선 다시 선택해야 하니까)
    }
  };

   // 📌 전체 선택/해제 체크박스 핸들러 (현재 페이지의 항목만 대상)
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // 전체 선택 상태이면, 현재 페이지의 모든 항목의 walletUuid를 가져와서 selectedItems 상태에 넣어
      const allWalletUuids = currentEntries.map(entry => entry.walletUuid);
      setSelectedItems(allWalletUuids);
    } else {
      // 전체 해제 상태이면, selectedItems를 빈 배열로 만들어
      setSelectedItems([]);
    }
  };

  // 📌 개별 항목 선택/해제 체크박스 핸들러
  const handleSelectItem = (walletUuid: string) => {
    if (selectedItems.includes(walletUuid)) {
      // 이미 선택된 항목이면, selectedItems 배열에서 해당 walletUuid를 제거해
      setSelectedItems(selectedItems.filter(id => id !== walletUuid));
    } else {
      // 선택되지 않은 항목이면, selectedItems 배열에 해당 walletUuid를 추가해
      setSelectedItems([...selectedItems, walletUuid]);
    }
  };

   // 📌 선택된 항목들 삭제 버튼 핸들러
   const handleDeleteSelected = () => {
       // 선택된 항목이 하나도 없으면 알림 메시지를 띄우고 함수 종료
       if (selectedItems.length === 0) {
           alert('삭제할 항목을 선택해주세요.');
           return;
       }
       // 사용자에게 삭제 확인 메시지를 띄워. '확인' 누르면 true, '취소' 누르면 false
       if (window.confirm(`${selectedItems.length}개의 항목을 정말 삭제하시겠습니까?`)) {
           // '확인'을 눌렀으면, 선택된 모든 walletUuid에 대해 개별 삭제 함수(onDelete)를 호출해.
           // onDelete 함수는 Expenses.tsx에서 넘겨받았고, 거기서 API 호출 및 상태 업데이트가 일어나.
           selectedItems.forEach(uuid => {
               onDelete(uuid); // 각 선택된 항목에 대해 삭제 함수 호출
           });

           // 🚨 중요: 삭제 API 호출이 성공한 후에 selectedItems를 초기화해야 하지만,
           // 현재 onDelete 함수는 비동기(await fetch)로 실행되고 바로 다음 코드로 넘어와.
           // 정확하게 하려면 모든 onDelete 호출이 완료된 후에 초기화해야 하지만,
           // 간단하게 여기서는 바로 초기화할게. (개선이 필요한 부분일 수 있어!)
           setSelectedItems([]); // 삭제 요청 보낸 후 선택된 항목 초기화
       }
   };

    // 📌 전체 선택 체크박스의 indeterminate 상태를 위한 ref
    // 'ref'를 사용해서 HTMLInputElement의 속성을 직접 제어할 수 있어.
    const selectAllCheckboxRef = useRef<HTMLInputElement>(null);

    // 📌 현재 페이지 항목들이 변경될 때마다 전체 선택 체크박스 상태 업데이트
    useEffect(() => {
        if (selectAllCheckboxRef.current) {
            const allCurrentSelected = currentEntries.length > 0 &&
                                       currentEntries.every(entry => selectedItems.includes(entry.walletUuid));
            const someCurrentSelected = currentEntries.length > 0 &&
                                        currentEntries.some(entry => selectedItems.includes(entry.walletUuid));

            if (allCurrentSelected) {
                // 현재 페이지 항목이 모두 선택되었으면 checked = true, indeterminate = false
                selectAllCheckboxRef.current.checked = true;
                selectAllCheckboxRef.current.indeterminate = false;
            } else if (someCurrentSelected) {
                // 현재 페이지 항목 중 일부만 선택되었으면 checked = false, indeterminate = true (회색으로 표시됨)
                selectAllCheckboxRef.current.checked = false;
                selectAllCheckboxRef.current.indeterminate = true;
            } else {
                // 현재 페이지 항목이 하나도 선택 안 되었으면 checked = false, indeterminate = false
                selectAllCheckboxRef.current.checked = false;
                selectAllCheckboxRef.current.indeterminate = false;
            }
             // 현재 페이지에 항목이 없을 때는 체크박스 비활성화 (선택 사항)
            selectAllCheckboxRef.current.disabled = currentEntries.length === 0;
        }
    }, [currentEntries, selectedItems]); // 현재 페이지 항목 목록이나 선택된 항목 목록이 바뀔 때마다 실행


  return (
    <div className="overflow-x-auto"> {/* 내용이 넘치면 스크롤되도록 */}

       {/* 🌟 선택된 항목 삭제 버튼 */}
       {/* selectedItems 배열에 항목이 있을 때만 이 버튼을 보여줘 */}
       {selectedItems.length > 0 && (
            <button
                onClick={handleDeleteSelected} // 버튼 클릭 시 선택 항목 삭제 핸들러 호출
                className="mb-4 bg-red-500 text-white rounded-md p-2 hover:bg-red-600" // Tailwind 스타일
            >
                선택 항목 삭제 ({selectedItems.length}) {/* 선택된 항목 개수 표시 */}
            </button>
       )}

        {/* 🌟 수입/지출 목록 테이블 */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* 체크박스 컬럼 헤더 */}
            <th className="py-2 px-4 border-b w-12 text-center"> {/* 너비 조절, 가운데 정렬 */}
              {/* 🌟 전체 선택/해제 체크박스 */}
              <input
                  type="checkbox"
                  ref={selectAllCheckboxRef} // ref 연결
                  onChange={handleSelectAll} // 변경 시 핸들러 호출
              />
            </th>
            <th className="py-2 px-4 border-b text-left">날짜</th> {/* 좌측 정렬 */}
            <th className="py-2 px-4 border-b text-left">제목</th>
            <th className="py-2 px-4 border-b text-right">금액</th> {/* 우측 정렬 */}
            <th className="py-2 px-4 border-b text-left">카테고리</th>
            <th className="py-2 px-4 border-b text-left">감정</th>
            <th className="py-2 px-4 border-b w-20 text-center">작업</th> {/* '작업' 컬럼 헤더, 너비 고정 */}
          </tr>
        </thead>
        <tbody>
          {/* 🌟 현재 페이지 항목들만 map 함수로 순회하며 각 행 생성 */}
          {currentEntries.map((entry) => (
            // key는 리스트 렌더링 시 성능과 안정성을 위해 고유한 값(walletUuid)으로 설정!
            <tr key={entry.walletUuid} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">
                 {/* 🌟 개별 항목 선택 체크박스 */}
                <input
                    type="checkbox"
                    checked={selectedItems.includes(entry.walletUuid)} // selectedItems 배열에 있으면 체크 상태
                    onChange={() => handleSelectItem(entry.walletUuid)} // 클릭 시 선택/해제 핸들러 호출
                />
              </td>
              <td className="py-2 px-4 border-b">{entry.date}</td> {/* 날짜 정보 */}
              <td className="py-2 px-4 border-b">{entry.title}</td> {/* 제목 */}
               {/* 🌟 금액 표시: 수입(GREEN) / 지출(RED) 색상 구분 */}
              <td className={`py-2 px-4 border-b text-right ${entry.type === 'EXPENSE' ? 'text-red-500' : 'text-green-500'}`}>
                {entry.amount.toLocaleString()} 원 {/* 금액 포맷팅 (예: 10,000원) */}
              </td>
              <td className="py-2 px-4 border-b">{entry.walletCategory}</td> {/* 카테고리 */}
              <td className="py-2 px-4 border-b">{entry.emotion}</td> {/* 감정 */}
              <td className="py-2 px-4 border-b text-center">
                 {/* 🌟 개별 삭제 버튼 */}
                <button
                     // 버튼 클릭 시 onDelete 함수 호출하며 해당 항목의 walletUuid 전달
                    onClick={() => onDelete(entry.walletUuid)}
                    className="text-red-500 text-sm hover:text-red-700" // Tailwind 스타일
                >
                    삭제
                </button>
              </td>
            </tr>
          ))}
           {/* 🌟 표시할 항목이 없을 때 보여줄 메시지 */}
            {currentEntries.length === 0 && (
                <tr>
                    {/* colSpan={7} 로 7개 컬럼에 걸쳐서 중앙에 메시지 표시 */}
                    <td colSpan={7} className="py-4 text-center text-gray-500">
                        {/* allEntries의 총 개수로 '내역 없음'과 '검색 결과 없음' 구분 */}
                        {allEntries.length === 0 ? '수입/지출 내역이 없습니다.' : '검색 결과가 없습니다.'}
                    </td>
                </tr>
            )}
        </tbody>
      </table>

      {/* 🌟 페이지네이션 컨트롤 */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        {/* '이전' 버튼 */}
        <button
            onClick={() => handlePageChange(currentPage - 1)} // 클릭 시 이전 페이지로 이동
            disabled={currentPage === 1} // 현재 페이지가 1이면 버튼 비활성화
            // 비활성화 상태일 때 스타일 적용 (Tailwind)
            className={`bg-gray-200 p-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
            이전
        </button>

        {/* 페이지 번호 표시 (예: 1 / 5) */}
        {/* 전체 페이지가 1개 이하일 때는 페이지 번호 숨기기 */}
        {totalPages > 1 && (
             <span className="px-4 py-2 border rounded-md text-gray-700">
                {currentPage} / {totalPages}
            </span>
        )}

        {/* '다음' 버튼 */}
        <button
            onClick={() => handlePageChange(currentPage + 1)} // 클릭 시 다음 페이지로 이동
            disabled={currentPage === totalPages || totalPages <= 1} // 현재 페이지가 마지막이거나 전체 페이지가 1개 이하면 비활성화
             // 비활성화 상태일 때 스타일 적용 (Tailwind)
             className={`bg-gray-200 p-2 rounded ${currentPage === totalPages || totalPages <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
            다음
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
