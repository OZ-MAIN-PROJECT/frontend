import { walletFormProps } from "@/types/wallet";

const LabeledInput = ({ value, onChange, disabled }: walletFormProps<string>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // disabled면 변경 무시
    onChange?.(e.target.value);
  };

  return (
    <input 
      className="outline-none text-xl w-full disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      placeholder="타이틀을 입력하세요."
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default LabeledInput;
