import { Category, Emotion } from "./wallet";

export type Statistic = {
    year: number;
    month: number;
    totalIncomeAmount: number;
    totalExpenseAmount: number;
    totalConsumptionAmount: number;
    mainEmotion: Emotion;
    mainEmotionRate: number;
    mainCategory: Category;
    mainCategoryRate: number;
}

export type YearlyStatistics = {
    year: number;
    monthlyData: MonthlyStatistics[];
}

export type MonthlyStatistics = {
    month: number;
    incomeAmount: number;
    expenseAmount: number;
}

export type EmotionStatistics = {
    emotion: Emotion;
    rate: number;
    amount: number;
}

export type categoryStatistics = {
    category: Category;
    rate: number;
    amount: number;
}


// 단일 월 통계
export const sampleStatistic: Statistic = {
    year: 2025,
    month: 4,
    totalIncomeAmount: 5000000,
    totalExpenseAmount: 2300000,
    totalConsumptionAmount: 2700000, // 나머지는 저축 등으로 추정
    mainEmotion: "만족",
    mainEmotionRate: 45.5,
    mainCategory: "식비",
    mainCategoryRate: 30.2
  };
  
  // 연간 월별 통계
  export const sampleYearlyStatistics: YearlyStatistics = {
    year: 2025,
    monthlyData: [
      { month: 1, incomeAmount: 4800000, expenseAmount: 2200000 },
      { month: 2, incomeAmount: 5000000, expenseAmount: 2100000 },
      { month: 3, incomeAmount: 5100000, expenseAmount: 2500000 },
      { month: 4, incomeAmount: 5000000, expenseAmount: 2300000 },
      { month: 5, incomeAmount: 5200000, expenseAmount: 2700000 },
      { month: 6, incomeAmount: 5000000, expenseAmount: 2600000 },
      { month: 7, incomeAmount: 4900000, expenseAmount: 2800000 },
      { month: 8, incomeAmount: 5000000, expenseAmount: 2400000 },
      { month: 9, incomeAmount: 5100000, expenseAmount: 2200000 },
      { month: 10, incomeAmount: 5000000, expenseAmount: 2100000 },
      { month: 11, incomeAmount: 5000000, expenseAmount: 2300000 },
      { month: 12, incomeAmount: 5000000, expenseAmount: 2500000 },
    ]
  };

  // 감정 통계 (PieChart 등용)
  export const sampleEmotionStatistics: EmotionStatistics[] = [
    { emotion: "행복", rate: 45.5, amount: 1230000 },
    { emotion: "슬픔", rate: 25.0, amount: 670000 },
    { emotion: "불안", rate: 15.5, amount: 420000 },
    { emotion: "분노", rate: 10.0, amount: 280000 },
    { emotion: "위로", rate: 4.0, amount: 100000 }
  ];
  
  // 카테고리 통계 (막대차트/Pie 등용)
  export const sampleCategoryStatistics: categoryStatistics[] = [
    { category: "식비", rate: 30.2, amount: 690000 },
    { category: "생활", rate: 25.0, amount: 570000 },
    { category: "교통/차량", rate: 20.1, amount: 460000 },
    { category: "여가/문화", rate: 15.3, amount: 350000 },
    { category: "금융", rate: 9.4, amount: 215000 }
  ];