import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
interface DropdownProps<T extends string> {
  items: T[];
  selected: T | null;
  style: 'outline' | 'underline';
  placeholder?: string;
  onSelect: (item: T) => void;
  className?: string;
  disabled?: boolean;
}

const getWrapperClass = (style: 'outline' | 'underline') => {
  return style === 'underline'
    ? 'border-b-2 border-primary-800 rounded-none bg-transparent'
    : 'border border-gray-300 rounded-md bg-white dark:bg-white/10 dark:border-none';
};

const DropdownInput = <T extends string>({ items, selected, style, placeholder, onSelect, className, disabled }: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={clsx("relative inline-block mb-4", className || 'w-full')}>
      <div
        className={`flex items-center h-[60px] px-3 py-2 cursor-pointer ${getWrapperClass(style)}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className={`flex-grow ${selected ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{selected || placeholder}</span>
        <ChevronDown className='dark:text-white' />
      </div>

      {isOpen && !disabled && (
        <ul className="absolute left-0 w-full border rounded bg-white dark:bg-dark-900 dark:border-gray-700 shadow z-10 text-gray-600 max-h-[200px] overflow-auto">
          {items.map(item => (
            <li
              key={item}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
              className="border-b dark:border-gray-700 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 dark:text-dark-500 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownInput;
