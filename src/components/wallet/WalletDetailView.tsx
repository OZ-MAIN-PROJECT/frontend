// WalletDetail.tsx
import { Wallet } from "@/types/wallet";
import DatePicker from "./walletField/DatePicker";
import AmountInput from "./walletField/AmountInput";
import LabeledInput from "./walletField/LabeledInput";
import LabeledTextArea from "./walletField/LabeledTextArea";
import EmotionBadge from "@/pages/Wallet/components/EmotionBadge";

interface WalletDetailViewProps {
  data: Wallet;
  disabled: boolean;
}

const WalletDetailView = ({ data, disabled }: WalletDetailViewProps) => {


  return (
    <div className="space-y-2">
      <DatePicker value={data.date} disabled={disabled} />
      <EmotionBadge emotion={data.emotion} />

      <div className="py-4 grid grid-cols-1 md:grid-cols-3 md:gap-4 items-start">
        <div className="col-span-1">
          <div className="flex items-center h-[60px] px-3 py-2 text-sm cursor-pointer border-b-2 border-primary-800 rounded-none">
            <span className="flex-grow text-gray-900 dark:text-white text-lg">{data.walletCategory}</span>
          </div>
        </div>
        <div className="col-span-2">
          <AmountInput value={data.amount} disabled={disabled} type={data.type} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <LabeledInput value={data.title} disabled={disabled} />
        <LabeledTextArea value={data.content ?? ""} disabled={disabled} />
      </div>
    </div>
  );
};

export default WalletDetailView;
