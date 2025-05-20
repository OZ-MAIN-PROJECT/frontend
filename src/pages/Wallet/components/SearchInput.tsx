import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, onSubmit, placeholder = "검색어를 입력하세요." }: SearchInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="flex items-center w-full max-w-sm bg-white dark:bg-white/10 rounded-md px-4 py-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
      />
      <button onClick={onSubmit} type="button" className="text-primary-800 dark:text-accent-blue">
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchInput;
