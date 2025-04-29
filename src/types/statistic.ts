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

export type emotionStatistics = {
    emotion: Emotion;
    rate: number;
    amount: number;
}

export type categoryStatistics = {
    category: Category;
    rate: number;
    amount: number;
}