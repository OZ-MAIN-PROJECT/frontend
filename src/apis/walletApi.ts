import {
  DailyWalletList,
  MonthlyWalletList,
  SMonthlyWalletList,
  SWallet,
  transformSWalletToWallet,
  Wallet,
} from '@/types/wallet';
import api from './api';

// 가계부 등록
export const createWalletEntry = async (data: {
  title: string;
  content: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  walletCategory: string;
  emotion: string;
  date: string;
}) => {
  const response = await api.post('/api/wallet', data);
  return response.data;
};

// 가계부 리스트/캘린더 조회 (월별)
export const getWalletEntries = async (year: number, month: number): Promise<MonthlyWalletList> => {
  const res = await api.get<SMonthlyWalletList>('/api/wallet', {
    params: { year, month },
  });

  const result: MonthlyWalletList = {
    list: res.data.list.map(
      (day): DailyWalletList => ({
        date: new Date(day.date),
        totalAmount: day.totalAmount,
        entries: day.entries.map(transformSWalletToWallet),
      }),
    ),
  };

  return result;
};

// 가계부 상세 조회
export const getWalletDetail = async (walletUuid: string): Promise<Wallet> => {
  const res = await api.get<SWallet>(`/api/wallet/${walletUuid}`);
  return transformSWalletToWallet(res.data);
};

// 가계부 수정
export const updateWalletEntry = (
  walletUuid: string,
  data: {
    title: string;
    content: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    category: number;
    emotion: number;
    date: string;
  },
) => {
  return api.patch(`/api/wallet/${walletUuid}`, data);
};

// 가계부 삭제
export const deleteWalletEntry = (walletUuid: string) => {
  return api.delete(`/api/wallet/${walletUuid}`);
};

// 월별 총 수입/지출 조회
export const getWalletTotal = (year: number, month: number) => {
  return api.get('/api/wallet/total', { params: { year, month } });
};
