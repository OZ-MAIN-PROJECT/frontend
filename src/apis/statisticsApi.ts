import { CategoryStatisticsList, EmotionStatisticsList, YearlyStatistics } from "@/types/statistic";
import api from "./api";
import { END_POINT } from "@/constants/route";

// 월별 수입/지출 그래프
export const getMonthlyStatistics = async ( year: number ): Promise<YearlyStatistics> => {
  const res = await api.get<YearlyStatistics>(END_POINT.STATISTICS_MONTHLY, {
    params: { year },
  });
  return res.data;
};


// 감정별 소비 통계
export const getEmotionStatistics = async(year: number, month: number): Promise<EmotionStatisticsList> => {
  const res = await api.get<EmotionStatisticsList>(END_POINT.STATISTICS_EMOTION, { 
    params: { year, month } 
  });
  return res.data;
};

// 카테고리별 소비 통계
export const getCategoryStatistics = async(year: number, month: number): Promise<CategoryStatisticsList> => {
  const res = await api.get<CategoryStatisticsList>(END_POINT.STATISTICS_CATEGORY, { 
    params: { year, month } 
  });
  return res.data;
};
