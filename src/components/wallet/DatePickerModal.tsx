import { ko } from 'date-fns/locale';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerModalProps {
    selected : Date;
    onChange : (newDate : Date | null) => void;
}

export default function DatePickerModal({selected, onChange} : DatePickerModalProps) {
  return (
    <div className='absolute'>
      <ReactDatePicker
        locale={ko}
        selected={selected}
        onChange={onChange}
        inline
        calendarClassName="rounded-md bg-white p-2"
      />
    </div>
  );
}
