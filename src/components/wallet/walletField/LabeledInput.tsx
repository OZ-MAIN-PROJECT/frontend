import { walletFormProps } from "@/types/wallet"

const LabeledInput = ({value, onChange} : walletFormProps<string>) => {
  return (
    <input 
        className="outline-none text-xl" 
        placeholder="타이틀을 입력하세요." 
        value={value}
        onChange={e => onChange(e.target.value)}
    />
  )
}

export default LabeledInput;