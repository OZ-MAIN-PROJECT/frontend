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
import { createWalletEntry } from '@/apis/walletApi';
import { formatDate } from '@/utils/utils';
interface AddWalletFormProps {
  type: 'INCOME' | 'EXPENSE';
  // onClose : () => void;
}

const AddWalletForm = ({ type }: AddWalletFormProps) => {
  const [form, setForm] = useState<WalletFormData>({
    date: new Date(),
    emotion: '행복',
    walletCategory: null,
    amount: 0,
    title: '',
    description: '',
  });
  const categoryItems = type === 'INCOME' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // 입력값 form과 매칭
  const handleChange: WalletFormChangeHandler = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form, type);
    if (!form.walletCategory) {
      return;
    }
    try {
      await createWalletEntry({
        title: form.title,
        content: form.description,
        amount: form.amount,
        type: type,
        walletCategory: form.walletCategory,
        emotion: form.emotion,
        date: formatDate(form.date),
      })
    } catch (err) {
      console.error('가계부 등록 실패', err);
    }
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <DatePicker value={form.date} onChange={v => handleChange('date', v)} />
      <EmotionSelector value={form.emotion} onChange={v => handleChange('emotion', v)} />
      <div className="py-4 flex flex-wrap gap-4 justify-start">
        <CategorySelector value={form.walletCategory} items={categoryItems} onChange={v => handleChange('walletCategory', v)} />
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
