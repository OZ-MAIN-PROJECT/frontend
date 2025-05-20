import { walletFormProps } from "@/types/wallet";

const LabeledTextArea = ({ value, onChange, disabled }: walletFormProps<string>) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    onChange?.(e.target.value);
  };

  return (
    <textarea
      className="outline-none h-20 sm:h-40 w-full text-sm lg:text-base resize-none disabled:bg-transparent dark:bg-white/0 dark:text-white disabled:text-gray-600 disabled:cursor-not-allowed"
      placeholder="내용을 입력하세요."
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default LabeledTextArea;
