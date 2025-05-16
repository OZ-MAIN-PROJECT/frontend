// Emotion 타입
export type Emotion = '행복' | '슬픔' | '분노' | '불안' | '위로' | '만족' | '지침' | '기대';

// ExpenseCategory 타입
export type ExpenseCategory = '식비' | '생활' | '교통/차량' | '건강' | '교육' | '쇼핑' | '여가/문화' | '금융';

// IncomeCategory 타입
export type IncomeCategory = '급여' | '상여/보너스' | '용돈' | '부수입' | '투자수익' | '환급';

export type Category = ExpenseCategory | IncomeCategory;

// Wallet 타입 정의
export type Wallet = {
  id: string;
  type: 'expense' | 'income';
  amount: number; // 금액
  title: string; // 제목
  content?: string; // 내용
  category: ExpenseCategory | IncomeCategory;
  emotion: Emotion; // 고정된 8개의 이모션 중 하나
  date: Date;
};

// (서버) Wallet 타입 정의
export type SWallet = {
  walletUuid: string
  title: string;
  content?: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  walletCategory: ExpenseCategory | IncomeCategory;
  emotion: Emotion;
  date: string;
}

export const transformSWalletToWallet = (s: SWallet): Wallet => {
  return {
    id: s.walletUuid,
    title: s.title,
    content: s.content,
    amount: s.amount,
    category: s.walletCategory,
    emotion: s.emotion,
    date: new Date(s.date),
    type: s.type === "INCOME" ? "income" : "expense",
  };
};

// 날짜별 WalletList 타입 정의
export type DailyWalletList = {
  date: Date;
  totalAmount: number;
  entries: Wallet[];
};

// (서버) 날짜별 WalletList 타입 정의
export type SDailyWalletList = {
  date: Date;
  totalAmount: number;
  entries: SWallet[];
}

// 월별 WalletList 타입 정의
export type MonthlyWalletList = {
  list: DailyWalletList[];
}

// (서버) 월별 WalletList 타입 정의
export type SMonthlyWalletList = {
  monthly: SDailyWalletList[];
}

// 전체 리스트 조회
export type WalletList = {
  page: number,
  totalPages: number,
  totalItems: number,
  result: Wallet[]
}

// 전체 리스트 조회
export type SWalletList = {
  page: number,
  totalPages: number,
  totalItems: number,
  result: SWallet[]
}

// AddWalletModal에서 입력받는 form 데이터 타입 정의
export interface WalletFormData {
  date: Date;
  emotion: Emotion;
  category: Category | null;
  amount: number;
  title: string;
  content: string;
}

/**
 * @description
 * 'date' | 'emotion' | 'category' | 'amount' | 'title' | 'description'
 */
export type WalletFormField = keyof WalletFormData;

// Wallet에 정의된 데이터 필드 타입에 맞는 value만 넣을 수 있게 함
export type WalletFormChangeHandler = <K extends WalletFormField>(field: K, value: WalletFormData[K]) => void;

export interface walletSelectProps<T> {
  value: T | null;
  items: T[];
  onChange?: (value: T | null) => void;
  disabled?: boolean; //상세 보기시 필요
}

export interface walletFormProps<T> {
  value: T;
  onChange?: (value: T) => void;
  disabled?: boolean; //상세 보기시 필요
}
