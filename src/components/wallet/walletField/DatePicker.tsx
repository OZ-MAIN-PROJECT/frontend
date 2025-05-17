import { formatDate } from '@/utils/utils';
import { Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DatePickerModal from './DatePickerModal';
import { walletFormProps } from '@/types/wallet';

export default function DatePicker({ value, onChange }: walletFormProps<Date>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center mb-1 gap-2 text-primary-500">
        <Calendar />
        <span>{formatDate(value)}</span>
        <button
          className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-md text-gray-800"
          onClick={() => {
            setIsOpen(prev => !prev);
          }}
          type="button"
        >
          <ChevronDown />
        </button>
      </div>
      {isOpen && (
        <DatePickerModal
          selected={value}
          onChange={newDate => {
            if (newDate) {
              onChange(newDate);
              setIsOpen(false);
            }
          }}
        />
      )}
    </>
  );
}
