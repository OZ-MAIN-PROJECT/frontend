import { getCategoryStatistics, getEmotionStatistics, getMonthlyStatistics, getSummaryStatistics } from '@/apis/statisticsApi';
import { createWalletEntry, deleteWalletEntry, getWalletDetail, getWalletEntries, getWalletTotal, updateWalletEntry } from '@/apis/walletApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 가계부 리스트/캘린더 조회 (월별)
export const useWalletEntries = (year: number, month: number) => {
  return useQuery({
    queryKey: ['walletEntries', year, month],
    queryFn: () => getWalletEntries(year, month),
  });
};


// 가계부 상세 조회
export const useWalletDetail = (walletUuid: string) => {
    return useQuery({
        queryKey: ['walletDetail', walletUuid],
        queryFn: () => getWalletDetail(walletUuid),
        enabled: !!walletUuid, // uuid가 있을 때만 실행
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
        category: number;
        emotion: number;
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

// 월별 수입/지출 그래프
export const useMonthlyStatistics = (year: number) => {
    return useQuery({
      queryKey: ['walletMonthlyStatistics', year],
      queryFn: () => getMonthlyStatistics(year),
      enabled: !!year,
    });
};

// 감정별 소비 통계
export const useEmotionStatistics = (year: number, month: number) => {
    return useQuery({
      queryKey: ['walletEmotionStatistics', year, month],
      queryFn: () => getEmotionStatistics(year, month),
      enabled: !!year && !!month,
    });
};

// 카테고리별 소비 통계
export const useCategoryStatistics = (year: number, month: number) => {
    return useQuery({
      queryKey: ['walletCategoryStatistics', year, month],
      queryFn: () => getCategoryStatistics(year, month),
      enabled: !!year && !!month,
    });
};

// 소비 요약 카드
export const useSummaryStatistics = (year: number, month: number) => {
    return useQuery({
      queryKey: ['walletSummaryStatistics', year, month],
      queryFn: () => getSummaryStatistics(year, month),
      enabled: !!year && !!month,
    });
};

