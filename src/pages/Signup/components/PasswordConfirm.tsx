import Input from '@/components/common/Input';

interface PasswordConfirmProps {
  password: string;
  passwordConfirm: string;
  onChange: (field: 'password' | 'passwordConfirm', value: string) => void;
  error?: string;
}
const PasswordConfirm = ({ password, passwordConfirm, onChange, error }: PasswordConfirmProps) => {
  return (
    <div className='w-[500px]'>
      <Input
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={e => onChange('password', e.target.value)}
        className="h-[60px] w-full"
      />
      {error && <p className="text-sm text-accent-red mt-1 mb-4">{error}</p>}
      <Input
        placeholder="비밀번호 확인"
        type="password"
        value={passwordConfirm}
        onChange={e => onChange('passwordConfirm', e.target.value)}
        className="h-[60px] w-full"
      />
    </div>
  );
};

export default PasswordConfirm;
