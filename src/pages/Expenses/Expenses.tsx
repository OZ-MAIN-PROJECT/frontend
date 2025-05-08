// src/pages/Expenses/Expenses.tsx
import React, { useState, useMemo, useEffect, useCallback } from 'react'; // useCallback 추가
// 필요한 하위 컴포넌트들을 불러와
import ExpenseList from './components/ExpenseList';
import AddTransactionForm from './components/AddTransactionForm';
import SearchInput from './components/SearchInput';

// ExpenseList가 기대하는 Entry 인터페이스 정의 (API 응답 형태와 유사하게)
interface ExpenseEntry {
  walletUuid: string; // API 명세서에 맞게 string으로!
  amount: number;
  walletCategory: string;
  title: string;
  emotion: string; // API 명세서에는 emotionTag였지만, 여기서는 emotion으로 통일해서 사용할게!
  type: string; // 'EXPENSE' 또는 'INCOME'
}

// ExpenseList가 기대하는 CalendarEntry 인터페이스 정의 (날짜별 그룹 형태)
interface CalendarEntry {
  date: string;
  totalAmount: number;
  entries: ExpenseEntry[];
}

const Expenses: React.FC = () => {
  // 📌 핵심 데이터 상태: 수입/지출 내역 전체 데이터 (실제로는 API에서 초기 데이터를 불러와야 함!)
  const [calendar, setCalendar] = useState<CalendarEntry[]>([]); // 초기에는 빈 배열로 시작

  // 📌 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');

  // ⭐️ 초기 데이터 로딩 효과 (API 호출 대체)
  // 실제 앱에서는 useEffect 안에서 API 호출로 데이터를 가져와서 setCalendar에 넣어줘야 해!
  // useCallback으로 감싸서 handleDeleteTransaction 함수가 재생성될 때 불필요하게 Effect가 실행되지 않도록 함 (선택 사항)
  const fetchInitialData = useCallback(async () => {
       console.log("초기 데이터 로딩...");
       // 🚨 TODO: 여기서 실제 API 호출로 초기 calendar 데이터를 받아와야 합니다!
       // fetch('/api/wallet/list', { ... }).then(response => response.json()).then(data => setCalendar(data));

       // 예시 더미 데이터 설정 (API 호출 성공했다고 가정)
       const initialData: CalendarEntry[] = [
          {
           date: "2025-04-01",
           totalAmount: -25000,
           entries: [
             { walletUuid: "7ba756e2-8a9f-4881-b8e0-e54f66749215", amount: -10000, walletCategory: "식비", title: "점심 식사", emotion: "슬픔", type: "EXPENSE" },
             { walletUuid: "another-uuid-1", amount: -15000, walletCategory: "교통", title: "버스 충전", emotion: "기쁨", type: "EXPENSE" },
              { walletUuid: "another-uuid-2", amount: 50000, walletCategory: "월급", title: "첫 월급!", emotion: "기쁨", type: "INCOME" }
           ]
         },
         { date: "2025-04-02", totalAmount: 0, entries: [] },
         {
           date: "2025-04-03",
           totalAmount: -5000,
           entries: [
              { walletUuid: "another-uuid-3", amount: -5000, walletCategory: "커피", title: "카페 라떼", emotion: "행복", type: "EXPENSE" }
           ]
         }
       ];
       // 데이터 로딩 지연 효과 (API 호출 느낌 내기)
       await new Promise(resolve => setTimeout(resolve, 500));
       setCalendar(initialData);
       console.log("초기 데이터 로딩 완료!");
   }, []); // 함수 자체는 변하지 않으므로 빈 배열

   useEffect(() => {
       fetchInitialData(); // 컴포넌트 마운트될 때 초기 데이터 가져오기
   }, [fetchInitialData]); // fetchInitialData 함수가 변경될 때마다 실행 (useCallback 때문에 거의 변경 안 됨)


  // 📌 새로운 거래 추가 함수 (AddTransactionForm에서 호출될 함수)
  // 이 함수 안에서 새로운 내역 추가 API를 호출하고, 성공하면 calendar 상태를 업데이트해야 해!
  const handleAddTransaction = (newEntryData: { title: string; amount: number; walletCategory: string; emotion: string }) => {
       console.log('새 내역 추가 요청:', newEntryData);
       // 🚨 TODO: 여기에 새로운 내역 추가 POST 또는 PUT API 호출 코드 넣기!

       // 🚨 API 호출 성공했다고 가정하고 로컬 상태 업데이트 로직만 작성
       const transactionToAdd: ExpenseEntry = {
           walletUuid: Date.now().toString(), // 임시 UUID 생성 (실제는 API 응답에서 받아와야 함)
           amount: newEntryData.amount,
           walletCategory: newEntryData.walletCategory,
           title: newEntryData.title,
           emotion: newEntryData.emotion || '기쁨', // 감정 없으면 기본값
           type: newEntryData.amount >= 0 ? 'INCOME' : 'EXPENSE', // 금액으로 수입/지출 구분
       };

       const today = new Date().toISOString().split('T')[0];
       setCalendar(prevCalendar => {
           const existingDayIndex = prevCalendar.findIndex(day => day.date === today);

           if (existingDayIndex > -1) {
               // 오늘 날짜에 이미 항목이 있으면 entries에 추가
               const updatedDay = { ...prevCalendar[existingDayIndex] };
               updatedDay.entries = [...updatedDay.entries, transactionToAdd];
               updatedDay.totalAmount = updatedDay.entries.reduce((sum, entry) => sum + entry.amount, 0);
               const newCalendar = [...prevCalendar];
               newCalendar[existingDayIndex] = updatedDay;
               return newCalendar;
           } else {
               // 오늘 날짜 항목이 없으면 새로 생성하여 추가
               const newDay = {
                   date: today,
                   totalAmount: transactionToAdd.amount,
                   entries: [transactionToAdd]
               };
               // 날짜 순서대로 정렬하려면 정렬 로직 추가
               return [...prevCalendar, newDay].sort((a, b) => a.date.localeCompare(b.date));
           }
       });

        alert('내역 추가 요청 완료 (API 연동 필요)!'); // 실제 API 성공 후 알림 띄우는 게 좋음
   };


  // 📌 트랜잭션 삭제 함수 (ExpenseList에서 호출될 함수)
  // 🌟 에러 처리 로직이 개선된 버전!
  const handleDeleteTransaction = useCallback(async (walletUuid: string) => { // useCallback 추가
    console.log(`Attempting to delete transaction with walletUuid: ${walletUuid}`);
    // const authToken = 'YOUR_AUTH_TOKEN'; // 🚨 TODO: 여기에 실제 사용자 토큰 가져오는 로직 필요!
    try {
      // 🚨 TODO: 실제 API 엔드포인트 및 인증 토큰으로 교체해야 합니다!
      const response = await fetch(`/api/wallet/${walletUuid}`, {
        method: 'DELETE',
        headers: {
          // 'Authorization': `Bearer ${authToken}`, // 여기에 실제 사용자 토큰!
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) { // 응답 코드가 2xx 범위이면 성공
         console.log(`${walletUuid} 내역 삭제 API 호출 성공!`);

        // ⭐️ API 호출 성공 시 로컬 상태 업데이트
        // filter를 사용해서 삭제된 항목을 calendar에서 제거
        setCalendar(prevCalendar => {
            const updatedCalendar = prevCalendar.map(day => {
              // 해당 날짜의 entries에서 walletUuid가 일치하는 항목 제외
              const updatedEntries = day.entries.filter(entry => entry.walletUuid !== walletUuid);
              // totalAmount 재계산 (지출은 음수, 수입은 양수로 잘 계산되어야 함)
              const newTotalAmount = updatedEntries.reduce((sum, entry) => sum + entry.amount, 0);

              return {
                ...day,
                entries: updatedEntries,
                totalAmount: newTotalAmount
              };
            }).filter(day => day.entries.length > 0); // 항목이 하나도 없는 날짜는 제거 (선택 사항)

            return updatedCalendar; // 새로운 캘린더 상태 반환
        });

        console.log(`${walletUuid} 내역 로컬 삭제 완료!`);
        alert('삭제 완료!'); // 사용자에게 성공 알림

      } else { // 🚨 Status code가 2xx가 아닐 때 (에러 상황)
        console.error(`삭제 API 호출 실패: 상태 코드 ${response.status}`);

        let errorMessage = `삭제 실패: 상태 코드 ${response.status}`;
        let errorDetail = '';

        try {
          // 🚨 응답 본문을 JSON으로 파싱 시도
          const errorData = await response.json();
          // 명세서에 따른 에러 메시지가 있다면 사용
          errorDetail = errorData.message || errorData.writing || '오류 내용 확인 불가';
          errorMessage = `삭제 실패 (${response.status}): ${errorDetail}`;
          console.error('에러 응답 본문 (JSON):', errorData);

        } catch (jsonError: any) {
          // 🚨 JSON 파싱에 실패했다면 (Unexpected end of JSON input 에러가 여기서 발생)
          console.error('JSON 파싱 실패, 일반 텍스트로 응답 본문 읽기 시도:', jsonError);
          try {
            const errorText = await response.text();
             // 응답 본문 텍스트가 있다면 에러 메시지에 추가
            errorDetail = errorText.substring(0, 200); // 너무 길면 자르기
            errorMessage = `삭제 실패 (${response.status}). 서버 응답: ${errorDetail}...`;
             console.error('에러 응답 본문 (Text):', errorText);
          } catch (textError: any) {
             // 텍스트로도 읽기 실패했다면 (본문이 비어있거나 다른 문제)
             console.error('텍스트 파싱 실패:', textError);
             errorDetail = '응답 본문 없음 또는 읽기 오류';
             errorMessage = `삭제 실패 (${response.status}). ${errorDetail}.`;
          }
        }

        alert(errorMessage); // 사용자에게 상세 에러 알림
      }
    } catch (networkError: any) { // fetch 자체 실패 (네트워크 끊김 등)
      console.error(`삭제 중 네트워크 오류 발생:`, networkError);
       alert(`삭제 중 네트워크 오류가 발생했습니다: ${networkError.message || '연결 상태 확인 필요'}`); // 사용자에게 네트워크 오류 알림
    }
  }, [setCalendar]); // setCalendar 함수는 변하지 않으므로 useCallback의 의존성 배열에 포함 (선택 사항)


  // 📌 calendar 데이터를 검색어에 따라 필터링하는 로직
  // calendar 데이터나 searchTerm이 바뀔 때만 다시 계산하도록 useMemo로 최적화!
  const filteredCalendar = useMemo(() => {
    console.log("필터링 실행:", searchTerm);
    if (!searchTerm) {
      // 검색어 없으면 전체 데이터 반환
      return calendar;
    }

    // 검색어 필터링 로직 (제목, 카테고리에서 검색)
    return calendar.map(day => ({
      ...day, // 날짜 정보는 유지
      // 해당 날짜의 entries 중에서 제목이나 카테고리에 검색어가 포함된 항목만 필터링
      entries: day.entries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || // 제목 검색 (대소문자 구분 없이)
        entry.walletCategory.toLowerCase().includes(searchTerm.toLowerCase()) // 카테고리 검색 (대소문자 구분 없이)
      )
    })).filter(day => day.entries.length > 0); // 검색 결과 항목이 하나라도 있는 날짜만 남김
  }, [calendar, searchTerm]); // calendar 또는 searchTerm 상태가 바뀔 때 useMemo 실행


  return (
    <div className="p-4">
      {/* 🌟 페이지 제목 */}
      <h1 className="text-2xl font-bold mb-4">수입/지출 내역</h1>

      {/* 🌟 새로운 거래 추가 폼 컴포넌트 */}
      {/* onAdd prop으로 handleAddTransaction 함수를 전달 */}
      <AddTransactionForm onAdd={handleAddTransaction} />

      {/* 🌟 검색 입력 컴포넌트 */}
      {/* onSearch prop으로 검색어 상태 업데이트 함수(setSearchTerm)를 전달 */}
      <SearchInput onSearch={setSearchTerm} /> {/* setSerchTerm 함수는 React에서 제공하는 상태 업데이트 함수이므로 useCallback으로 감쌀 필요는 없음 */}

      {/* 🌟 수입/지출 리스트 컴포넌트 */}
      {/* calendar prop으로 필터링된 데이터를 전달 */}
      {/* onDelete prop으로 개별 삭제 함수(handleDeleteTransaction)를 전달 */}
      {/* ExpenseList 내부에서 페이지네이션, 체크박스, 선택 삭제 처리 */}
      <ExpenseList calendar={filteredCalendar} onDelete={handleDeleteTransaction} />
    </div>
  );
};

export default Expenses;
