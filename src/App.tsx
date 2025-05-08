// src/App.tsx
import React from 'react';
// Expense 페이지 컴포넌트를 불러와
import Expenses from './pages/Expenses/Expenses'; // 경로에 맞게 수정

function App() {
  return (
    // Tailwind CSS 사용 시 font-pretendard 클래스가 있다면 유지!
    <div className="font-pretendard">
      {/* Expense 페이지 전체를 렌더링해줘 */}
      <Expenses />
    </div>
  );
}

export default App;
