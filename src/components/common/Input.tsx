import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; 
  label?: string;
  error?: string; 
  helperText?: string; 
  required?: boolean; 
}

const Input: React.FC<InputProps> = ({
  className,
  value,
  placeholder,
  onChange,
  type = "text",
  label,
  error,
  helperText,
  required,
  ...props
}) => {
  const inputId = `input-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div className={`${containerBaseStyles} w-full`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`${inputBaseStyles} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

const inputBaseStyles = "border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue disabled:opacity-50 disabled:cursor-not-allowed w-full";
const containerBaseStyles = "mb-4";

export default Input;