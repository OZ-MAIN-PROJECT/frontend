import { Category, Emotion } from "./wallet";

export type Statistic = {
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
    monthlyStatistics: MonthlyStatistics[];
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

