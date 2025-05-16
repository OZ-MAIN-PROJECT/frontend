import { formatDate } from '@/utils/utils';
import { Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DatePickerModal from './DatePickerModal';
import { walletFormProps } from '@/types/wallet';

export default function DatePicker({ value, onChange, disabled }: walletFormProps<Date>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (disabled) return; // disabled면 동작 안함
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <div className="flex items-center mb-1 gap-2 text-primary-500">
        <Calendar />
        <span>{formatDate(value)}</span>
        <button
          className="flex items-center justify-center w-6 h-6 bg-gray-300 rounded-md text-gray-800 disabled:opacity-50"
          onClick={handleToggle}
          type="button"
          disabled={disabled} // 🔒 시각적 피드백도 줄 수 있음
        >
          <ChevronDown />
        </button>
      </div>
      {isOpen && !disabled && (
        <DatePickerModal
          selected={value}
          onChange={newDate => {
            if (newDate) {
              onChange?.(newDate);
              setIsOpen(false);
            }
          }}
        />
      )}
    </>
  );
}
