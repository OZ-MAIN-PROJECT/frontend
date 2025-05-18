import { WalletCategory, walletSelectProps } from '@/types/wallet';
import DropdownInput from '../../common/DropdownInput';

const CategorySelector = ({ value, items, onChange, disabled }: walletSelectProps<WalletCategory>) => {
  const handleSelect = (selected: WalletCategory) => {
    if (disabled) return; 
    onChange?.(selected);
  };

  return (
    <div className='w-full sm:w-auto'>
      <DropdownInput
        selected={value}
        onSelect={handleSelect}
        style="underline"
        items={items}
        className="w-full sm:w-[280px]"
        placeholder="카테고리 선택"
        disabled={disabled}
      />
    </div>
  );
};

export default CategorySelector;
