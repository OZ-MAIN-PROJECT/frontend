import { walletFormProps } from '@/types/wallet';
import { formatNumber, toNumber } from '@/utils/utils';

interface AmountInputProps extends walletFormProps<number> {
  type: 'INCOME' | 'EXPENSE';
}

const AmountInput = ({ value, onChange, disabled, type }: AmountInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const number = toNumber(e.target.value);
    onChange?.(number);
  };

  const colorClass = type === 'INCOME' ? 'text-accent-blue' : 'text-accent-red';

  return (
    <div className="flex items-center gap-2 border-b-2 border-primary-800 h-[60px] w-full sm:w-[500px] text-right bg-white">
      <input
        className={`${colorClass} text-2xl w-full text-right outline-none appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
        value={formatNumber(value)}
        type="text"
        inputMode='numeric'
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="mr-2">원</span>
    </div>
  );
};

export default AmountInput;
