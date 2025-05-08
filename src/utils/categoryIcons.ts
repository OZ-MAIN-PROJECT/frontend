import {
    Utensils, Home, Car, HeartPulse, GraduationCap, ShoppingBag,
    Music, Banknote, Briefcase, PiggyBank, Coins, RotateCcw
  } from "lucide-react";
  import { ExpenseCategory, IncomeCategory } from "../types/wallet";
  
  export const categoryIcons: Record<ExpenseCategory | IncomeCategory, React.ElementType> = {
    // Expense
    식비: Utensils,
    생활: Home,
    "교통/차량": Car,
    건강: HeartPulse,
    교육: GraduationCap,
    쇼핑: ShoppingBag,
    "여가/문화": Music,
    금융: Banknote,
  
    // Income
    급여: Briefcase,
    "상여/보너스": PiggyBank,
    용돈: Coins,
    부수입: ShoppingBag,
    "투자수익": Banknote,
    환급: RotateCcw,
  };
  