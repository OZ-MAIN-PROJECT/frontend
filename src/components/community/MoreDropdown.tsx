import { useEffect, useRef, useState } from 'react';
import IconWrapper from './IconWrapper';
import { Ellipsis, EllipsisVertical } from 'lucide-react';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onClick: () => void;
}

interface MoreDropdownProps {
  menuItems: MenuItem[];
  hasIcon?: boolean;
  align?: 'left' | 'right';
  type?: 'comment' | 'post'; // 버튼 구분용
}

const MoreDropdown = ({ menuItems, hasIcon = true, align = 'right', type = 'post' }: MoreDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-md hover:bg-gray-100 transition"
        aria-label="더보기"
      >
        {type === 'comment' ? (
          <span className="text-gray-600 text-[18px] leading-none">⋯</span>
        ) : (
          <IconWrapper icon={EllipsisVertical} size={20} color="#9ca3af" />
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 rounded-xl bg-white shadow-md border py-2 text-sm whitespace-nowrap
            ${align === 'left' ? 'left-0' : 'right-0'}
          `}
          style={{ width: 'fit-content', minWidth: hasIcon ? '112px' : '72px' }}
        >
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.onClick}
              className={`w-full flex items-center ${
                hasIcon ? 'gap-2 px-4' : 'justify-center px-3'
              } py-[6px] hover:bg-gray-100 text-left`}
            >
              {hasIcon && item.icon}
              <span className={item.color ?? 'text-gray-600'}>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreDropdown;
