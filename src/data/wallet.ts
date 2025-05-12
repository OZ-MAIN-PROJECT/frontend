import { categoryStatistics, EmotionStatistics, Statistic, YearlyStatistics } from "@/types/statistic";
import { MonthlyWalletList, Wallet } from "@/types/wallet";

// 예시 데이터
export const sampleData: MonthlyWalletList = {
    list: [
      {
        date: new Date("2025-05-01"),
        totalAmount: 4000000,
        entries: [{ id: "b6dd7945-bf31-4d20-b07a-63a59f42995e", type: "income", amount: 4000000, category: "급여", title: "급여", emotion: "기대", date: new Date("2025-04-01") }],
      },
      {
        date: new Date("2025-05-11"),
        totalAmount: -300000,
        entries: [{ id: "b6dd7945-bf31-4d20-b07a-63a59f42195e", type: "expense", amount: -300000, category: "쇼핑", title: "쇼핑", emotion: "기대", date: new Date("2025-04-11") }],
      },
      {
        date: new Date("2025-05-19"),
        totalAmount: -12000,
        entries: [{ id: "b6dd7945-bf31-4d20-b07a-63a54f42995e", type: "expense", amount: -12000, category: "생활", title: "커피", emotion: "위로", date: new Date("2025-04-19") }],
      },
      {
        date: new Date("2025-05-24"),
        totalAmount: -250000,
        entries: [{ id: "b6dd7945-bf31-4d20-b07a-45a59f42995e", type: "expense", amount: -250000, category: "식비", title: "식비", emotion: "만족", date: new Date("2025-04-24") }],
      },
    ],
  };



// 단일 월 통계
export const sampleStatistic: Statistic = {
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
    monthlyStatistics: [
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

export const sampleListData: Wallet[] = [
  {
    id: "b6dd7945-bf31-4d20-b07a-63a59f42995e",
    type: "expense",
    amount: 4800,
    title: "스타벅스 아메리카노",
    category: "식비",
    emotion: "슬픔",
    date: new Date("2025-04-23"),
  },
  {
    id: "b6dd7945-bf31-4d20-b07a-63a59f42915e",
    type: "income",
    amount: 100000,
    title: "급여 입금",
    category: "급여",
    emotion: "행복",
    date: new Date("2025-04-23"),
  },
];