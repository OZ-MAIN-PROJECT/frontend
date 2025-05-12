import api from "./api";

// 월별 수입/지출 그래프
export const getMonthlyStatistics = (year: number) => {
  return api.get("/api/wallet/statistics/monthly", {
    params: { year },
  });
};

// 감정별 소비 통계
export const getEmotionStatistics = (year: number, month: number) => {
  return api.get("/api/wallet/statistics/emotion", {
    params: { year, month },
  });
};

// 카테고리별 소비 통계
export const getCategoryStatistics = (year: number, month: number) => {
  return api.get("/api/wallet/statistics/category", {
    params: { year, month },
  });
};

// 월 소비 요약 카드
export const getSummaryStatistics = (year: number, month: number) => {
  return api.get("/api/wallet/statistics/summary", {
    params: { year, month },
  });
};
