import { Category, walletSelectProps } from '@/types/wallet';
import DropdownInput from '../../common/DropdownInput';

const CategorySelector = ({value, items, onChange} : walletSelectProps<Category>) => {
  return (
    <div>
      <DropdownInput
        selected={value}
        onSelect={(value: Category) => onChange(value)}
        style="underline"
        items={items}
        className="min-w-[280px]"
        placeholder='카테고리 선택'
      />
    </div>
  );
};

export default CategorySelector;
