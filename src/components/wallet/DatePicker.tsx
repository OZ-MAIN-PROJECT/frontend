import { formatDate } from '@/utils/utils';
import { Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import DatePickerModal from './DatePickerModal';

export default function DatePicker() {
  const currentDate = new Date();
  const [date, setDate] = useState<Date>(currentDate);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center mb-1 gap-2 text-primary-500">
        <Calendar />
        <span>{formatDate(date)}</span>
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
          selected={date}
          onChange={(newDate) => {
            setDate(newDate as Date);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}
