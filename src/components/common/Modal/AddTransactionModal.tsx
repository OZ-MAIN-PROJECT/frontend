// src/components/common/Modal/AddTransactionModal.tsx
import React, { useState } from 'react';
// 🚨 TODO: 네 프로젝트의 BaseModal, Input, SelectLayer, Button 컴포넌트 경로에 맞게 수정하세요!
import BaseModal from './BaseModal'; // BaseModal 컴포넌트 import
// 네 Input 컴포넌트를 사용한다고 가정 (아까 코드를 보내줬었지!)
import Input from '../Input'; // Input 컴포넌트 import
// 네 SelectLayer 컴포넌트를 사용한다고 가정 (아까 코드를 보내줬었지!)
import SelectLayer from '../SelectLayer'; // SelectLayer 컴포넌트 import
// 네 Button 컴포넌트를 사용한다고 가정 (아까 코드를 보내줬었지!)
import Button from '../Button'; // Button 컴포넌트 import


// 🌟 이 모달 컴포넌트가 부모(Expenses)로부터 받을 props 타입 정의
interface AddTransactionModalProps {
  isOpen: boolean; // 모달 열림/닫힘 상태를 받음
  onClose: () => void; // 모달 닫기 함수를 받음
  onSave: (newEntry: { title: string; amount: number; walletCategory: string; emotion: string; type: 'INCOME' | 'EXPENSE' }) => void; // 저장 시 호출될 함수를 받음
  // 🚨 TODO: 필요하다면 수정/삭제 기능 등을 위한 props 추가
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, onSave }) => {
  // 📌 모달 안에서 입력 폼의 상태를 관리
  const [formData, setFormData] = useState({
    title: '',
    amount: 0, // 숫자로 관리
    walletCategory: '',
    emotion: '', // 초기값은 비워두거나 기본값 설정
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE', // 초기값 지출로 설정
  });

  // 📌 입력 필드 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // amount는 숫자로 변환, 나머지는 문자열 그대로
      [name]: name === 'amount' ? Number(value) : value,
    });
  };

  // 📌 수입/지출 타입 토글 핸들러 (수입/지출 버튼이 있다면)
  // 만약 타입 선택 UI가 따로 있다면 이 함수를 사용해
  const handleTypeChange = (type: 'INCOME' | 'EXPENSE') => {
      setFormData(prevData => ({ ...prevData, type }));
  }

  // 📌 '저장' 버튼 클릭 핸들러
  const handleSaveClick = () => {
    console.log('모달에서 저장 클릭:', formData);
    // 🚨 TODO: 저장 전 유효성 검사 로직 추가 (예: 제목, 금액 필수 확인)
    if (!formData.title.trim() || formData.amount === 0 || !formData.walletCategory) {
        alert('제목, 금액, 카테고리는 필수 입력입니다.');
        return;
    }

    // 부모로부터 받은 onSave 함수 호출, 현재 폼 데이터를 전달
    onSave(formData);
    // 저장 후 모달 닫기 및 폼 초기화
    onClose();
    setFormData({ title: '', amount: 0, walletCategory: '', emotion: '', type: 'EXPENSE' });
  };

  // 📌 '취소' 버튼 클릭 핸들러
  const handleCancelClick = () => {
    console.log('모달에서 취소 클릭');
    // 취소 시 모달 닫기 및 폼 초기화
    onClose();
    setFormData({ title: '', amount: 0, walletCategory: '', emotion: '', type: 'EXPENSE' });
  };

  // isOpen 상태가 false면 모달을 렌더링하지 않음
  if (!isOpen) return null;

  return (
    // 🌟 BaseModal을 사용하여 모달의 기본 틀을 만들어!
    // BaseModal에게 열림/닫힘 상태와 닫기 함수를 전달해줘.
    <BaseModal isOpen={isOpen} onClose={handleCancelClick}> {/* 취소 버튼 역할을 하는 handleCancelClick 연결 */}
      {/* 🌟 모달 내부 콘텐츠 (입력 폼 + 버튼들) */}
      <div className="flex flex-col space-y-4"> {/* flex-col, space-y-4로 세로로 간격 주면서 배치 */}

        {/* TODO: 모달 제목 추가 (예: <h2>수입/지출 추가</h2>) */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">새로운 내역 추가</h2>

        {/* 🌟 수입/지출 타입 선택 버튼 또는 라디오 버튼 (예시) */}
        {/* 이 부분 UI는 네 와이어프레임에 맞게 수정해! */}
        <div className="flex space-x-2">
            <Button
                onClick={() => handleTypeChange('EXPENSE')}
                color={formData.type === 'EXPENSE' ? 'blue' : 'gray'}
                variant="fill"
                fontSize="small"
                width="auto"
                height="h-10"
            >
                지출
            </Button>
             <Button
                onClick={() => handleTypeChange('INCOME')}
                color={formData.type === 'INCOME' ? 'blue' : 'gray'}
                variant="fill"
                fontSize="small"
                width="auto"
                height="h-10"
            >
                수입
            </Button>
        </div>


        {/* 🌟 입력 필드들 - 네 Input 컴포넌트 사용 */}
        {/* 각 Input 컴포넌트에 name, value, onChange, placeholder 등을 props로 전달해. */}
        <Input
          label="제목"
          name="title"
          placeholder="내역을 입력하세요"
          value={formData.title}
          onChange={handleInputChange}
          required={true} // 필수 입력 표시
          className="w-full" // 너비는 꽉 채우도록
        />

        {/* 금액 입력 필드 */}
         <Input
          label="금액"
          name="amount"
          placeholder="금액을 입력하세요"
          value={formData.amount === 0 ? '' : formData.amount.toString()} // 숫자를 문자열로 바꿔서 전달
          onChange={handleInputChange}
          type="number" // 숫자 키보드 나오도록
          required={true}
          className="w-full"
        />

         {/* 🌟 카테고리 선택 필드 - 네 SelectLayer 또는 단순 select 사용 */}
         {/* 여기서는 간단하게 <select> 태그로 예시를 들게. 네 SelectLayer 사용법에 맞춰 수정해야 해. */}
         <div className="mb-4"> {/* Input 컴포넌트의 mb-4 간격을 맞추기 위해 div로 감쌈 */}
             <label htmlFor="category" className="block text-sm font-medium mb-1">
                 카테고리 <span className="text-red-500">*</span>
             </label>
             {/* 🚨 TODO: 이 <select> 태그를 네 SelectLayer 컴포넌트 사용 코드로 바꿔주세요! */}
             {/* SelectLayer 사용 예시: <SelectLayer options={[{label: '식비', onClick:()=>handleInputChange({target: {name: 'walletCategory', value: '식비'}} as any)}...]} onSelect={(option) => setFormData({...formData, walletCategory: option.label})} /> */}
             <select
                id="category"
                name="walletCategory"
                value={formData.walletCategory}
                onChange={handleInputChange}
                className="border rounded-md p-2 text-sm w-full" // 스타일
             >
                 <option value="" disabled>카테고리를 선택하세요</option>
                 {/* TODO: 실제 카테고리 목록으로 옵션 채우기 */}
                 <option value="식비">식비</option>
                 <option value="교통비">교통비</option>
                 <option value="월급">월급</option>
                 <option value="기타">기타</option>
             </select>
         </div>


         {/* 🌟 감정 선택 필드 - 네 SelectLayer 또는 단순 select 사용 */}
          <div className="mb-4"> {/* Input 컴포넌트의 mb-4 간격을 맞추기 위해 div로 감쌈 */}
              <label htmlFor="emotion" className="block text-sm font-medium mb-1">
                  감정
              </label>
               {/* 🚨 TODO: 이 <select> 태그를 네 SelectLayer 컴포넌트 사용 코드로 바꿔주세요! */}
              {/* SelectLayer 사용 예시: <SelectLayer options={[{label: '기쁨', onClick:()=>handleInputChange({target: {name: 'emotion', value: '기쁨'}} as any)}...]} onSelect={(option) => setFormData({...formData, emotion: option.label})} /> */}
             <select
                id="emotion"
                name="emotion"
                value={formData.emotion}
                onChange={handleInputChange}
                className="border rounded-md p-2 text-sm w-full" // 스타일
             >
                 <option value="">감정을 선택하세요 (선택)</option>
                 {/* TODO: 실제 감정 목록으로 옵션 채우기 */}
                 <option value="기쁨">기쁨 😊</option>
                 <option value="슬픔">슬픔 😥</option>
                 <option value="분노">분노 😠</option>
                 <option value="행복">행복 😄</option>
                 <option value="불안">불안 😟</option>
             </select>
         </div>


        {/* 🌟 저장 및 취소 버튼 - 네 Button 컴포넌트 사용 */}
        <div className="flex justify-end space-x-2 mt-6"> {/* 버튼들을 오른쪽으로 정렬하고 위쪽에 간격 줌 */}
          <Button onClick={handleCancelClick} variant="outline" color="gray" width="auto" height="h-10" className=""> {/* 취소 버튼 */}
            취소
          </Button>
          <Button onClick={handleSaveClick} variant="fill" color="blue" width="auto" height="h-10" className=""> {/* 저장 버튼 */}
            저장
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default AddTransactionModal;
