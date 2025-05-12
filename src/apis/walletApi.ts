import api from "./api";

// 가계부 리스트 조회 (페이징 + 검색)
export const getWalletEntries = (params: { keyword?: string; page?: number; size?: number;}) => {
  return api.get("/api/wallet/entries", { params });
};

// 일별 내역 조회
export const getWalletDaily = (date: string) => {
  return api.get("/api/wallet/daily", { params: { date } });
};

// 가계부 등록
export const createWalletEntry = (data: {
  title: string;
  content: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  emotion: number;
  date: string;
}) => {
  return api.post("/api/wallet", data);
};

// 가계부 상세 조회
export const getWalletDetail = (id: string) => {
  return api.get(`/api/wallet/${id}`);
};

// 가계부 수정
export const updateWalletEntry = (id: string, data: {
  title: string;
  content: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  emotion: number;
  date: string;
}) => {
  return api.patch(`/api/wallet/${id}`, data);
};

// 가계부 삭제
export const deleteWalletEntry = (id: string) => {
  return api.delete(`/api/wallet/${id}`);
};
