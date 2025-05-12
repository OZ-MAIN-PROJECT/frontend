import { useState } from 'react';
import Button from '../common/Button';
import DatePicker from './walletField/DatePicker';
import EmotionSelector from './walletField/EmotionSelector';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/category';
import { WalletFormChangeHandler, WalletFormData } from '@/types/wallet';
import CategorySelector from './walletField/CategorySelector';
import AmountInput from './walletField/AmoundInput';
import LabeledInput from './walletField/LabeledInput';
import LabeledTextArea from './walletField/LabeledTextArea';
interface AddWalletFormProps {
  type: 'expense' | 'income';
  // onClose : () => void;
}

const AddWalletForm = ({ type }: AddWalletFormProps) => {
  const [form, setForm] = useState<WalletFormData>({
    date: new Date(),
    emotion: '행복',
    category: null,
    amount: 0,
    title: '',
    description: '',
  });
  const categoryItems = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // 입력값 form과 매칭
  const handleChange: WalletFormChangeHandler = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form, type);
  };
  return (
    <form onSubmit={handleSubmit}>
      <DatePicker value={form.date} onChange={v => handleChange('date', v)} />
      <EmotionSelector value={form.emotion} onChange={v => handleChange('emotion', v)} />
      <div className="py-4 flex flex-wrap gap-4 justify-start">
        <CategorySelector value={form.category} items={categoryItems} onChange={v => handleChange('category', v)} />
        <AmountInput value={form.amount} onChange={v => handleChange('amount', v)} />
      </div>
      <div className="flex flex-col gap-6">
        <LabeledInput value={form.title} onChange={v => handleChange('title', v)} />
        <LabeledTextArea value={form.description} onChange={v => handleChange('description', v)} />
      </div>
      <div className="flex w-full justify-center mb-4">
        <Button type="submit">등록</Button>
      </div>
    </form>
  );
};

export default AddWalletForm;
