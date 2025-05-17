import { walletFormProps } from "@/types/wallet";

const LabeledTextArea = ({ value, onChange, disabled }: walletFormProps<string>) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    onChange?.(e.target.value);
  };

  return (
    <textarea
      className="outline-none h-40 w-full resize-none disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
      placeholder="내용을 입력하세요."
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default LabeledTextArea;
