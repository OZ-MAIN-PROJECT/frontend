import { useState } from 'react';
import Button from '../common/Button';
import AddWalletInput from './AddWalletInput';
import DatePicker from './DatePicker';
import EmotionSelector from './EmotionSelector';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/constants/category';
interface AddWalletFormProps {
    type : 'expense' | 'income';
    // onClose : () => void;
}

const AddWalletForm = ({type} : AddWalletFormProps) => {
  const [form, setForm] = useState({
    type: {type},
    date: new Date(),
    emotion: '행복',
    category: null,
    amount: 0,
    title: '',
    description: '',
  });
  const categoryItems = (type==='income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES)

  // 입력값 form과 매칭
  const handleChange = (field: keyof typeof form, value : any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <form onSubmit={handleSubmit}>
      <DatePicker />
      <EmotionSelector />
      <AddWalletInput items={categoryItems} />
      <div className="flex w-full justify-center mb-4">
        <Button type="submit">
          등록
        </Button>
      </div>
    </form>
  );
};

export default AddWalletForm;
