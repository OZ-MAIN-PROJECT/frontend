import { WalletCategory } from "@/types/wallet";

export const INCOME_CATEGORIES : WalletCategory[] = ['급여', '상여/보너스', '용돈', '부수입', '투자수익', '환급'] as const;
export const EXPENSE_CATEGORIES : WalletCategory[]= ['식비', '생활', '교통/차량', '건강', '교육', '쇼핑', '여가/문화', '금융'] as const;