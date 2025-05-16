import { useCategoryStatistics, useEmotionStatistics, useMonthlyStatistics, useWalletMonthly, useWalletTotal } from "@/hooks/useWallet";
import { Statistic } from "@/types/statistic";

export const useStatisticsData = (year: number, month: number) => {
  const yearly = useMonthlyStatistics(year);
  const emotion = useEmotionStatistics(year, month);
  const category = useCategoryStatistics(year, month);
  const monthly = useWalletTotal(year, month);
  const list = useWalletMonthly(year, month);
  const prevMonthly = useWalletTotal(
    month === 0 ? year - 1 : year,
    month === 0 ? 11 : month - 1
  );

  const isLoading = yearly.isLoading || monthly.isLoading || emotion.isLoading || category.isLoading || list.isLoading || prevMonthly.isLoading;
  const isError = yearly.isLoading || monthly.isError || emotion.isError || category.isError || list.isError || prevMonthly.isLoading;

  const statistic: Statistic | null = (() => {
    if (!monthly.data || !prevMonthly.data || !emotion.data || !category.data) return null;

    const thisExpense = monthly.data.expense ?? 0;
    const prevExpense = prevMonthly.data.expense ?? 0;

    const increaseAmount = thisExpense - prevExpense;
    const increaseRate = prevExpense === 0 ? 100 : (increaseAmount / prevExpense) * 100;

    const mainEmotionData = emotion.data?.reduce((prev, curr) => {
        return curr.rate > prev.rate ? curr : prev;
    });

    const mainCategoryData = category.data.reduce((prev, curr) => {
        return curr.rate > prev.rate ? curr : prev;
    });
      

    return {
        totalIncomeAmount: monthly.data.income ?? 0,
        totalExpenseAmount: monthly.data.expense ?? 0,

        mainEmotion: mainEmotionData?.emotion ?? "",
        mainEmotionRate: mainEmotionData?.rate ?? 0,
        mainEmotionAmount: mainEmotionData?.amount ?? 0,

        mainCategory: mainCategoryData?.category ?? "",
        mainCategoryRate: mainCategoryData?.rate ?? 0,
        mainCategoryAmount: mainCategoryData?.amount ?? 0,

        increaseAmount: increaseAmount,
        increaseRate: increaseRate,
    };
  })();

  return {
    isLoading,
    isError,
    statistic,
    yearly,
    monthly,
    emotion,
    category,
    list,
  };
};
