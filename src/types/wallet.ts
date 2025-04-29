// Emotion 타입
type Emotion = 
  | '행복'
  | '슬픔'
  | '분노'
  | '불안'
  | '위로'
  | '만족'
  | '지침'
  | '기대';

// ExpenseCategory 타입
type ExpenseCategory = 
  | '식비'
  | '생활'
  | '교통/차량'
  | '건강'
  | '교육'
  | '쇼핑'
  | '여가/문화'
  | '금융';

// IncomeCategory 타입
type IncomeCategory = 
  | '급여'
  | '상여/보너스'
  | '용돈'
  | '부수입'
  | '투자 수익'
  | '환급';

// Expense 타입 정의
export type Wallet = {
  type: 'expense' | 'income';
  amount: number; // 금액
  balance: number; // 잔액
  title: string; // 제목
  content: string; // 내용
  category: 'expense' extends 'expense' ? ExpenseCategory : IncomeCategory;
  emotion: Emotion; // 고정된 8개의 이모션 중 하나
  createdAt: Date; // 생성일
  updatedAt: Date; // 수정일
};
