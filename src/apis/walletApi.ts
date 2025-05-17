
import { DailyWalletList, MonthlyWalletList, SMonthlyWalletList, SWallet, SWalletList, transformSWalletToWallet, Wallet, WalletList } from "@/types/wallet";
import api from "./api";
import { END_POINT } from "@/constants/route";
import { MonthlyTotal } from "@/types/statistic";
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

  const response = await api.post(END_POINT.WALLET, data);
  return response.data;
};

// 가계부 리스트/캘린더 조회 (월별)
export const getWalletMonthly = async (year: number, month: number): Promise<MonthlyWalletList> => {
  const res = await api.get<SMonthlyWalletList>('/api/wallet', {
    params: { year, month },
  });

  //console.log("월별 캘린더 조회:",res.data.monthly);

  const result: MonthlyWalletList = {
    list: res.data.monthly.map((day): DailyWalletList => ({
      date: new Date(day.date),
      totalAmount: day.totalAmount,
      entries: day.entries.map(transformSWalletToWallet),
    })),
  };

  return result;
};

// 가계부 리스트 조회 (전체)
export const getWalletEntries = async(keyword: string, page:number, size: number): Promise<WalletList> => {
  const res = await api.get<SWalletList>(END_POINT.WALLET_ENTRIES, {
    params: { keyword, page, size },
  });

  console.log("전체 리스트 조회:",res.data);

  const result: WalletList = {
    ...res.data,
    result: res.data.result.map(transformSWalletToWallet),
  };

  return result;
};

// 가계부 상세 조회
export const getWalletDetail = async (walletUuid: string): Promise<Wallet> => {
  console.log("가계부 상세 조회:",walletUuid);
  const res = await api.get<SWallet>(END_POINT.WALLET_DETAIL(walletUuid));
  console.log(res.data);
  return transformSWalletToWallet(res.data);
};

// 가계부 수정
export const updateWalletEntry = (
  walletUuid: string,
  data: {
    title: string;
    content: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    walletCategory: string;
    emotion: string;
    date: string;
  },
) => {
  return api.patch(END_POINT.WALLET_DETAIL(walletUuid), data);
};

// 가계부 삭제
export const deleteWalletEntry = (walletUuid: string) => {
  return api.delete(END_POINT.WALLET_DETAIL(walletUuid));
};

// 월별 총 수입/지출 조회

export const getWalletTotal = async(year: number, month: number): Promise<MonthlyTotal> => {
  console.log("월별 총 수입/지출 조회요청:", { year, month });
  const res = await api.get<MonthlyTotal>(END_POINT.WALLET_TOTAL, { params: { year, month } });

  console.log("월별 총 수입/지출 조회:", res.data);
  return (res.data)
};
