import { Category, Emotion } from "./wallet";

export type Statistic = {
    year: number;
    month: number;
    totalIncomeAmount: number;
    totalExpenseAmount: number;
    totalConsumptionAmount: number;
    mainEmotion: Emotion;
    mainEmotionRate: number;
    mainEmotionAmount: number;
    mainCategory: Category;
    mainCategoryRate: number;
    mainCategoryAmount: number;
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
    mainEmotionAmount: 200000,
    mainCategory: "식비",
    mainCategoryRate: 30.2,
    mainCategoryAmount: 180000,
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
    { emotion: "행복", rate: 20.0, amount: 800000 },
    { emotion: "슬픔", rate: 15.0, amount: 600000 },
    { emotion: "분노", rate: 10.0, amount: 400000 },
    { emotion: "불안", rate: 10.0, amount: 400000 },
    { emotion: "위로", rate: 10.0, amount: 400000 },
    { emotion: "만족", rate: 10.0, amount: 400000 },
    { emotion: "지침", rate: 15.0, amount: 600000 },
    { emotion: "기대", rate: 10.0, amount: 400000 },
];

// 카테고리 통계 (막대차트/Pie 등용)
export const sampleCategoryStatistics: categoryStatistics[] = [
    { category: "식비", rate: 30.0, amount: 690000 },
    { category: "생활", rate: 20.0, amount: 500000 },
    { category: "교통/차량", rate: 15.0, amount: 400000 },
    { category: "건강", rate: 10.0, amount: 300000 },
    { category: "교육", rate: 8.0, amount: 200000 },
    { category: "쇼핑", rate: 7.0, amount: 180000 },
    { category: "여가/문화", rate: 6.0, amount: 150000 },
    { category: "금융", rate: 4.0, amount: 100000 },
];
