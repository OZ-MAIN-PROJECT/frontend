import { Category, walletSelectProps } from '@/types/wallet';
import DropdownInput from '../../common/DropdownInput';

const CategorySelector = ({ value, items, onChange, disabled }: walletSelectProps<Category>) => {
  const handleSelect = (selected: Category) => {
    if (disabled) return; 
    onChange?.(selected);
  };

  return (
    <div>
      <DropdownInput
        selected={value}
        onSelect={handleSelect}
        style="underline"
        items={items}
        className="min-w-[280px]"
        placeholder="카테고리 선택"
        disabled={disabled}
      />
    </div>
  );
};

export default CategorySelector;
