// Emotion 타입
export type Emotion =  '행복' | '슬픔' | '분노' | '불안' | '위로' | '만족' | '지침' | '기대';

// ExpenseCategory 타입
export type ExpenseCategory = '식비' | '생활' | '교통/차량' | '건강' | '교육' | '쇼핑' | '여가/문화' | '금융';

// IncomeCategory 타입
export type IncomeCategory =  '급여' | '상여/보너스' | '용돈' | '부수입' | '투자 수익' | '환급';

export type Category = ExpenseCategory | IncomeCategory;

// Wallet 타입 정의
export type Wallet = {
  id: number;
  type: 'expense' | 'income';
  amount: number; // 금액
  title: string; // 제목
  content?: string; // 내용
  category: ExpenseCategory | IncomeCategory;
  emotion: Emotion; // 고정된 8개의 이모션 중 하나
  date: Date;
};

// 날짜별 WalletList 타입 정의
export type DailyWalletList = {
  date: Date;
  totalAmount: number;
  entries: Wallet[];
}

export type MonthlyWalletList = {
  year: number;
  month: number;
  totalIncome : number;
  totalExpense : number;
  entries: DailyWalletList[];
}


// 예시 데이터
export const sampleData: MonthlyWalletList = {
  year: 2025,
  month: 5,
  totalIncome: 4000000,
  totalExpense: 404000,
  entries: [
    {
      date: new Date("2025-05-01"),
      totalAmount: 4000000,
      entries: [{ id: 1, type: "income", amount: 4000000, category: "급여", title: "급여", emotion: "기대", date: new Date("2025-04-01") }],
    },
    {
      date: new Date("2025-05-11"),
      totalAmount: -300000,
      entries: [{ id: 2, type: "expense", amount: -300000, category: "쇼핑", title: "쇼핑", emotion: "기대", date: new Date("2025-04-11") }],
    },
    {
      date: new Date("2025-05-19"),
      totalAmount: -12000,
      entries: [{ id: 3, type: "expense", amount: -12000, category: "생활", title: "커피", emotion: "위로", date: new Date("2025-04-19") }],
    },
    {
      date: new Date("2025-05-24"),
      totalAmount: -250000,
      entries: [{ id: 4, type: "expense", amount: -250000, category: "식비", title: "식비", emotion: "만족", date: new Date("2025-04-24") }],
    },
  ],
};
