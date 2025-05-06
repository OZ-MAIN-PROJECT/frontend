import Input from "@/components/common/Input";
import DropdownInput from "./DropdownInput";

interface SecurityQuestionProps {
  question: string;
  answer: string;
  questions: string[];
  onChange: (field: 'question' | 'answer', value: string) => void;
}

const SecurityQuestion = ({questions, question, answer, onChange} : SecurityQuestionProps) => {
  return (
    <div className="mt-6">
      <p className="font-semibold text-primary-900 mb-2">본인확인용 질문</p>
      <DropdownInput
        items={questions}
        selected={question}
        onSelect={value => onChange('question', value)}
      />
      <Input
        placeholder="답변을 작성하세요."
        value={answer}
        onChange={e => onChange('answer', e.target.value)}
        className="h-[60px] w-full"
      />
    </div>
  );
};

export default SecurityQuestion;
