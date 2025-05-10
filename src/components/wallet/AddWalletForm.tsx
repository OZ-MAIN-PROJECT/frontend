import Button from "../common/Button";
import DatePicker from "./DatePicker";
import EmotionSelector from "./EmotionSelector";

const AddWalletForm = () => {
  return (
    <form>
        <DatePicker />
        <EmotionSelector />
        <Button>등록</Button>
    </form>
  )
}

export default AddWalletForm;