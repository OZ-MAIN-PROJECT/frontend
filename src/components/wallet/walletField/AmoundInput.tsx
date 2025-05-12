import { walletFormProps } from '@/types/wallet';

const AmountInput = ({ value, onChange }: walletFormProps<number>) => {
  return (
    <div className="flex items-center gap-2 border-b-2 border-primary-800 h-[60px] w-[500px] text-right">
      <input
        className="text-accent-blue text-2xl w-full text-right outline-none appearance-none  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={value}
        type="number"
        onChange={e => onChange(Number(e.target.value))}
      />
      <span className="mr-2">원</span>
    </div>
  );
};

export default AmountInput;