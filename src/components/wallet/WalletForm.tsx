import { useState, useEffect } from 'react';
import Button from '../common/Button';
import DatePicker from './walletField/DatePicker';
import EmotionSelector from './walletField/EmotionSelector';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/category';
import { Wallet, WalletFormChangeHandler, WalletFormData } from '@/types/wallet';
import CategorySelector from './walletField/CategorySelector';
import AmountInput from './walletField/AmoundInput';
import LabeledInput from './walletField/LabeledInput';
import LabeledTextArea from './walletField/LabeledTextArea';

interface WalletFormProps {
  type: 'expense' | 'income';
  data?: Wallet; // 있을 경우 수정 모드
  onSubmit?: (form: WalletFormData) => void;
}

const WalletForm = ({ type, data, onSubmit }: WalletFormProps) => {
  const [form, setForm] = useState<WalletFormData>({
    date: new Date(),
    emotion: '행복',
    category: null,
    amount: 0,
    title: '',
    content: '',
  });

  // 초기 데이터 반영
  useEffect(() => {
    if (data) {
      const { date, emotion, category, amount, title, content } = data;
      setForm({
        date: new Date(date),
        emotion,
        category,
        amount,
        title,
        content: content ?? '',
      });
    }
  }, [data]);

  const categoryItems = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleChange: WalletFormChangeHandler = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data ? '수정 데이터:' : '등록 데이터:', form);
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DatePicker value={form.date} onChange={v => handleChange('date', v)} />
      <EmotionSelector value={form.emotion} onChange={v => handleChange('emotion', v)} />
      <div className="py-4 flex flex-wrap gap-4 justify-start">
        <CategorySelector value={form.category} items={categoryItems} onChange={v => handleChange('category', v)} />
        <AmountInput value={form.amount} onChange={v => handleChange('amount', v)} type={type} />
      </div>
      <div className="flex flex-col gap-6">
        <LabeledInput value={form.title} onChange={v => handleChange('title', v)} />
        <LabeledTextArea value={form.content} onChange={v => handleChange('content', v)} />
      </div>
      <div className="flex w-full justify-center mb-4">
        <Button type="submit">{data ? '수정' : '등록'}</Button>
      </div>
    </form>
  );
};

export default WalletForm;
