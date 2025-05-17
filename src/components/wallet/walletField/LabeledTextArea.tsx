import { walletFormProps } from "@/types/wallet"

const LabeledTextArea = ({value, onChange} : walletFormProps<string>) => {
  return (
    <textarea 
        className="outline-none h-40" 
        placeholder="내용을 입력하세요." 
        value={value}
        onChange={e => onChange(e.target.value)}
    />
  )
}

export default LabeledTextArea;