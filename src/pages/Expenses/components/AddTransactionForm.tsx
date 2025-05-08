// src/pages/Expenses/components/AddTransactionForm.tsx
import React, { useState } from 'react';
// Input 컴포넌트를 사용하고 있다면 불러와줘
// import Input from "../../../components/common/Input";

// 부모(Expenses.tsx)로부터 받을 props 타입 정의
interface AddTransactionFormProps {
    // onAdd 함수는 새로운 내역 데이터를 받아서 처리할 거야
    onAdd: (newEntryData: { title: string; amount: number; walletCategory: string; emotion: string }) => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAdd }) => {
    // 폼 입력 필드의 상태 관리
    const [newEntry, setNewEntry] = useState({ title: '', amount: 0, walletCategory: '', emotion: '' });
    // const [error, setError] = useState(''); // 필요하다면 폼 자체에서 에러 상태 관리

    // 입력 필드 값이 변경될 때 호출될 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // 금액 입력 시 문자열을 숫자로 변환해줘
        setNewEntry({ ...newEntry, [name]: name === 'amount' ? Number(value) : value });
        // 입력 시 에러 메시지 초기화 (선택 사항)
        // if (error) setError('');
    };

    // '추가' 버튼 클릭 또는 Enter 키 눌렀을 때 호출될 핸들러
    const handleSubmit = () => {
        // 폼 자체에서 기본적인 입력값 유효성 검사
        if (!newEntry.title.trim() || newEntry.amount === 0 || !newEntry.walletCategory) {
            // setError('제목, 금액, 카테고리는 필수 입력입니다.'); // 폼 자체에 에러 표시
            alert('제목, 금액, 카테고리는 필수 입력입니다.'); // 간단한 알림
            return;
        }
        // 유효성 검사 통과 시, 부모로부터 받은 onAdd 함수를 호출하여 데이터 전달
        onAdd(newEntry);
        // 입력 필드 상태 초기화 (다음 입력을 위해)
        setNewEntry({ title: '', amount: 0, walletCategory: '', emotion: '' });
        // setError(''); // 에러 상태 초기화 (필요하다면)
    };

     // 폼 입력 필드에서 Enter 키를 눌렀을 때 handleSubmit 호출 (선택 사항)
     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
         if (e.key === 'Enter') {
             handleSubmit(); // Enter 누르면 폼 제출!
         }
     };

    return (
        // 🌟 입력 필드들을 flex로 감싸서 한 줄에 배치!
        // items-center로 세로 정렬, space-x-2로 필드 간 간격 추가
        <div className="flex items-center mb-4 space-x-2">
            {/* 🚨 Input 컴포넌트를 사용하고 있다면 아래 <input> 태그들을 Input 컴포넌트로 바꿔줘야 해! */}
            {/* 예시: <Input name="title" value={newEntry.title} onChange={handleInputChange} placeholder="제목" className="flex-1 min-w-0" /> */}

            {/* 제목 입력 필드 */}
            <input
                type="text"
                name="title" // 상태 객체의 키와 동일하게 name 설정
                placeholder="제목"
                value={newEntry.title} // 상태 값과 연결
                onChange={handleInputChange} // 입력 변경 핸들러 연결
                onKeyPress={handleKeyPress} // Enter 키 핸들러 연결
                className="border rounded-md p-2 flex-1 min-w-0" // flex-1: 남은 공간 채우기, min-w-0: 넘침 방지
            />
            {/* 금액 입력 필드 */}
            <input
                type="number" // 숫자만 입력 가능
                name="amount"
                placeholder="금액"
                value={newEntry.amount === 0 ? '' : newEntry.amount} // 0일 때는 빈칸으로 보이게
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="border rounded-md p-2 w-20" // 금액 칸 너비 고정 (Tailwind 클래스)
            />
            {/* 카테고리 선택 필드 */}
            <select
                name="walletCategory"
                value={newEntry.walletCategory}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="border rounded-md p-2 w-24" // 카테고리 칸 너비 고정
            >
                <option value="" disabled>카테고리</option> {/* 기본 선택 안 되게 disabled */}
                <option value="식비">식비</option>
                <option value="교통비">교통비</option>
                <option value="월급">월급</option>
                <option value="기타">기타</option>
            </select>
             {/* 감정 선택 필드 */}
             <select
                name="emotion"
                value={newEntry.emotion}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="border rounded-md p-2 w-20" // 감정 칸 너비 고정
            >
                <option value="" disabled>감정</option> {/* 기본 선택 안 되게 disabled */}
                <option value="기쁨">기쁨</option>
                <option value="슬픔">슬픔</option>
                <option value="분노">분노</option>
                <option value="행복">행복</option>
            </select>
            {/* '추가' 버튼 */}
            <button onClick={handleSubmit} className="bg-green-500 text-white rounded-md p-2">추가</button>

             {/* 🚨 필요하다면 여기서 에러 메시지 표시 */}
             {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
        </div>
    );
};

export default AddTransactionForm;
