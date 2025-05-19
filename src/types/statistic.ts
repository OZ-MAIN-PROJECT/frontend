import { Emotion, WalletCategory } from "./wallet";

export type Statistic = {
    totalIncomeAmount: number;
    totalExpenseAmount: number;
    mainEmotion: Emotion;
    mainEmotionRate: number;
    mainEmotionAmount: number;
    mainCategory: WalletCategory;
    mainCategoryRate: number;
    mainCategoryAmount: number;
    increaseAmount: number; // 이번달 - 저번달
    increaseRate: number; // ((이번달 - 저번달) / 저번달) * 100
}

export type MonthlyTotal = {
    income: number;
    expense: number;
}

export type YearlyStatistics = {
    monthlyStatistics: MonthlyStatistics[];
}

export type MonthlyStatistics = {
    month: number;
    incomeAmount: number;
    expenseAmount: number;
}

export type EmotionStatisticsList = {
    emotionStatistics: EmotionStatistic[]
}

export type EmotionStatistic = {
    emotion: Emotion;
    rate: number;
    amount: number;
    count: number;
}

export type CategoryStatisticsList = {
    categoryStatistics: CategoryStatistic[]
}

export type CategoryStatistic = {
    category: WalletCategory;
    rate: number;
    amount: number;
    
}

