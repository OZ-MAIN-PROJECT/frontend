// WalletDetail.tsx
import { Wallet } from "@/types/wallet";
import DatePicker from "./walletField/DatePicker";
import CategorySelector from "./walletField/CategorySelector";
import AmountInput from "./walletField/AmountInput";
import LabeledInput from "./walletField/LabeledInput";
import LabeledTextArea from "./walletField/LabeledTextArea";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/constants/category";
import EmotionBadge from "@/pages/Wallet/components/EmotionBadge";

interface WalletDetailViewProps {
  data: Wallet;
  disabled: boolean;
}

const WalletDetailView = ({ data, disabled }: WalletDetailViewProps) => {

  const categoryItems = data.type === 'INCOME' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="space-y-2">
      <DatePicker value={data.date} disabled={disabled} />
      <EmotionBadge emotion={data.emotion} />

      <div className="py-2 flex flex-wrap gap-4 justify-start">
        <CategorySelector value={data.walletCategory} items={categoryItems} disabled={disabled} />
        <AmountInput value={data.amount} disabled={disabled} type={data.type} />
      </div>

      <div className="flex flex-col gap-6">
        <LabeledInput value={data.title} disabled={disabled} />
        <LabeledTextArea value={data.content ?? ""} disabled={disabled} />
      </div>
    </div>
  );
};

export default WalletDetailView;
