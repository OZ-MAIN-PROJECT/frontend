import { getCategoryStatistics, getEmotionStatistics, getMonthlyStatistics } from '@/apis/statisticsApi';
import { createWalletEntry, deleteWalletEntry, getWalletDetail, getWalletEntries, getWalletMonthly, getWalletTotal, updateWalletEntry } from '@/apis/walletApi';
import { MonthlyWalletList, WalletList } from '@/types/wallet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 가계부 리스트/캘린더 조회 (월별)
export const useWalletMonthly = (year: number, month: number) => {
  return useQuery<MonthlyWalletList>({
    queryKey: ['walletMonthly', year, month],
    queryFn: () => getWalletMonthly(year, month),
    enabled: !!year && !!month,
  });
};

// 가계부 전체내역 조회
export const useWalletEntries = (keyword: string, page: number, size: number) => {
  return useQuery<WalletList>({
    queryKey: ["walletEntries", keyword, page, size],
    queryFn: () => getWalletEntries(keyword, page, size),
  });
};


// 가계부 상세 조회
export const useWalletDetail = (walletUuid: string) => {
  return useQuery({
      queryKey: ['walletDetail', walletUuid],
      queryFn: () => getWalletDetail(walletUuid),
      enabled: !!walletUuid,
  });
};

// 가계부 등록
export const useCreateWalletEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWalletEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['walletEntries'] });
    },
  });
};

// 가계부 수정
export const useUpdateWalletEntry = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ walletUuid, data }: { walletUuid: string; data: {
        title: string;
        content: string;
        amount: number;
        type: "INCOME" | "EXPENSE";
        walletCategory: string;
        emotion: string;
        date: string;
      } }) =>
        updateWalletEntry(walletUuid, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['walletEntries'] });
        queryClient.invalidateQueries({ queryKey: ['walletDetail'] });
      },
    });
};

// 가계부 삭제
export const useDeleteWalletEntry = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteWalletEntry,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['walletEntries'] });
      },
    });
};

// 월별 총 수입/지출 조회
export const useWalletTotal = (year: number, month: number) => {
    return useQuery({
      queryKey: ['walletTotal', year, month],
      queryFn: () => getWalletTotal(year, month),
      enabled: !!year && !!month,
    });
};

// 월별 수입/지출 통계 (연간)
export const useMonthlyStatistics = (year: number) => {
  return useQuery({
    queryKey: ["walletMonthlyStatistics", year],
    queryFn: () => getMonthlyStatistics(year),
    enabled: !!year,
  });
};

// 감정별 통계 (월간)
export const useEmotionStatistics = (year: number, month: number) => {
  return useQuery({
    queryKey: ["walletEmotionStatistics", year, month],
    queryFn: () => getEmotionStatistics(year, month),
    enabled: !!year && !!month,
  });
};

// 카테고리별 통계 (월간)
export const useCategoryStatistics = (year: number, month: number) => {
  return useQuery({
    queryKey: ["walletCategoryStatistics", year, month],
    queryFn: () => getCategoryStatistics(year, month),
    enabled: !!year && !!month,
  });
};
