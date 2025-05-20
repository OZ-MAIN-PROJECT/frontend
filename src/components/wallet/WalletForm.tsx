import { useState, useEffect } from 'react';
import Button from '../common/Button';
import DatePicker from './walletField/DatePicker';
import EmotionSelector from './walletField/EmotionSelector';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/category';
import { Wallet, WalletFormChangeHandler, WalletFormData } from '@/types/wallet';
import CategorySelector from './walletField/CategorySelector';
import AmountInput from './walletField/AmountInput';
import LabeledInput from './walletField/LabeledInput';
import LabeledTextArea from './walletField/LabeledTextArea';

interface WalletFormProps {
  type: 'INCOME' | 'EXPENSE';
  data?: Wallet; // 있을 경우 수정 모드
  onSubmit?: (form: WalletFormData) => void;
}

const WalletForm = ({ type, data, onSubmit }: WalletFormProps) => {
  const [form, setForm] = useState<WalletFormData>({
    date: new Date(),
    emotion: '행복',
    walletCategory: null,
    amount: 0,
    title: '',
    content: '',
  });

  const [error, setError] = useState('');

  // 초기 데이터 반영
  useEffect(() => {
    if (data) {
      const { date, emotion, walletCategory, amount, title, content } = data;
      setForm({
        date: new Date(date),
        emotion,
        walletCategory,
        amount,
        title,
        content: content ?? '',
      });
    }
  }, [data]);

  const categoryItems = type === 'INCOME' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleChange: WalletFormChangeHandler = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormInvalid = Object.values({
      walletCategory: form.walletCategory,
      amount: form.amount,
      date: form.date,
      title: form.title,
      content: form.content,
      emotion: form.emotion,
    }).some(value => !value);

    if (isFormInvalid) {
      setError('모든 영역을 입력해주세요.');
      return;
    }
    setError('');
    console.log(data ? '수정 데이터:' : '등록 데이터:', form);
    onSubmit?.(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DatePicker value={form.date} onChange={v => handleChange('date', v)} />
      <EmotionSelector value={form.emotion} onChange={v => handleChange('emotion', v)} />
      <div className="py-4 grid grid-cols-1 md:grid-cols-3 md:gap-4 items-start">
        <div className="col-span-1">
          <CategorySelector
            value={form.walletCategory}
            items={categoryItems}
            onChange={(v) => handleChange("walletCategory", v)}
          />
        </div>
        <div className="col-span-2">
          <AmountInput
            value={form.amount}
            onChange={(v) => handleChange("amount", v)}
            type={type}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <LabeledInput value={form.title} onChange={v => handleChange('title', v)} />
        <LabeledTextArea value={form.content} onChange={v => handleChange('content', v)} />
      </div>
      {error && <p className="text-sm text-accent-red text-center mt-1 mb-4">{error}</p>}
      <div className="flex w-full justify-center mb-4">
        <Button type="submit">{data ? '수정' : '등록'}</Button>
      </div>
    </form>
  );
};

export default WalletForm;
