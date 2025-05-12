import { categoryStatistics, EmotionStatistics, Statistic, YearlyStatistics } from "@/types/statistic";
import api from "./api";

// 월별 수입/지출 그래프
export const getMonthlyStatistics = async ( year: number ): Promise<YearlyStatistics> => {
  const res = await api.get<YearlyStatistics>("/api/wallet/statistics/monthly", {
    params: { year },
  });
  return res.data;
};


// 감정별 소비 통계
export const getEmotionStatistics = async(year: number, month: number): Promise<EmotionStatistics[]> => {
  const res = await api.get<EmotionStatistics[]>("/api/wallet/statistics/emotion", { 
    params: { year, month } 
  });
  return res.data;
};

// 카테고리별 소비 통계
export const getCategoryStatistics = async(year: number, month: number): Promise<categoryStatistics[]> => {
  const res = await api.get("/api/wallet/statistics/category", { 
    params: { year, month } 
  });
  return res.data;
};

// 소비 요약 카드
export const getSummaryStatistics = async(year: number, month: number): Promise<Statistic> => {
  const res =  await api.get("/api/wallet/statistics/summary", { 
    params: { year, month } 
  });
  return res.data;
};
