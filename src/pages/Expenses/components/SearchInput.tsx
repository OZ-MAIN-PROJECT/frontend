// src/pages/Expenses/components/SearchInput.tsx
import React, { useState } from 'react';

// 부모(Expenses.tsx)로부터 받을 props 타입 정의
interface SearchInputProps {
    // onSearch 함수는 변경된 검색어 문자열을 받아서 처리할 거야
    onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    // 📌 검색어 입력 필드의 로컬 상태
    const [searchTerm, setSearchTerm] = useState('');

    // 입력 필드 값이 변경될 때 호출될 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value); // 로컬 검색어 상태 업데이트

        // 🌟 입력할 때마다 부모에게 검색어를 전달해서 바로 필터링 결과가 보이도록!
        onSearch(value);
    };

    // '검색' 버튼 클릭 시 호출될 핸들러 (필요하다면)
    const handleSearchButtonClick = () => {
         // handleInputChange에서 이미 onSearch를 호출하고 있으므로
         // 버튼 클릭 시 별도의 검색 로직이 필요 없다면 이 함수는 비워두거나 삭제해도 됨.
         // 만약 '입력 후 엔터/버튼 클릭 시에만 검색' 로직을 원한다면
         // handleInputChange에서 onSearch 호출을 빼고 여기서 onSearch(searchTerm) 호출
         console.log(`검색 버튼 클릭됨: ${searchTerm}`);
          onSearch(searchTerm); // 버튼 클릭 시 검색 실행
    };

     // 검색 입력 필드에서 Enter 키를 눌렀을 때 handleSearchButtonClick 호출 (선택 사항)
     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter') {
             handleSearchButtonClick(); // Enter 누르면 검색 버튼 클릭과 동일하게
         }
     };

    return (
        // 🌟 검색 입력 필드와 버튼을 flex로 감싸서 한 줄에 배치!
        <div className="flex items-center mb-4">
            {/* 검색어 입력 필드 */}
            <input
                type="text"
                placeholder="검색어를 입력하세요..."
                className="border rounded-md p-2 mr-2 flex-1" // flex-1: 검색창이 남은 공간을 채우게
                value={searchTerm} // 로컬 상태와 연결
                onChange={handleInputChange} // 입력 변경 핸들러 연결
                onKeyPress={handleKeyPress} // Enter 키 핸들러 연결
            />
            {/* '검색' 버튼 */}
            <button onClick={handleSearchButtonClick} className="bg-blue-500 text-white rounded-md p-2">검색</button>
        </div>
    );
};

export default SearchInput;
