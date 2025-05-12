import { Category } from '@/types/wallet';
import DropdownInput from '../common/DropdownInput';
import { useState } from 'react';

interface AddWalletInputProps {
  items: Category[];
}

const AddWalletInput = ({ items }: AddWalletInputProps) => {
  const [category, setCategory] = useState<Category>('식비');
  const [amount, setAmount] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <div className="py-4 flex flex-wrap gap-4 justify-start">
        <DropdownInput
          selected={category}
          onSelect={(value: Category) => setCategory(value)}
          style="underline"
          items={items}
          className="min-w-[280px]"
        />

        <div className="flex items-center gap-2 border-b-2 border-primary-800 h-[60px] min-w-[500px] text-right">
          <input
            className="text-accent-blue text-2xl w-full text-right outline-none appearance-none  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={amount}
            type="number"
            onChange={e => setAmount(Number(e.target.value))}
          />
          <span className="mr-2">원</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <input className="outline-none text-xl" placeholder="타이틀을 입력하세요." />
        <textarea className="outline-none h-40" placeholder="내용을 입력하세요." />
      </div>
    </div>
  );
};

export default AddWalletInput;
