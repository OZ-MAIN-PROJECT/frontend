import { Edit } from 'lucide-react';
import { useState } from 'react';
import { users } from '@/data/users';

interface NicknameEditorProps {
  currentNickname: string;
  onUpdated?: (newNickname: string) => void;
}

const NicknameEditor = ({ currentNickname, onUpdated }: NicknameEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(currentNickname);
  const [error, setError] = useState('');

  const handleSave = () => {
    const trimmed = nickname.trim();

    // 입력값이 없으면 기존 닉네임으로 되돌림
    if (!trimmed) {
      setNickname(currentNickname);
      setIsEditing(false);
      setError('');
      return;
    }

    // 중복 확인 (더미 데이터 기준)
    const isDuplicate = users.some(user => user.nickname === trimmed && user.nickname !== currentNickname);

    if (isDuplicate) {
      setError('이미 사용 중인 닉네임입니다.');
      return;
    }

    // 저장 성공 처리
    setNickname(trimmed);
    setIsEditing(false);
    setError('');
    onUpdated?.(trimmed);
  };

  return (
    <div className="flex flex-col">
      <div className="w-[300px] h-[32px] flex gap-4 items-center">
        {isEditing ? (
          <>
            <input
              className="bg-transparent border-b-2 outline-none"
              value={nickname}
              onChange={e => {
                setNickname(e.target.value);
                setError('');
              }}
            />
            <span className="cursor-pointer text-accent-blue text-sm" onClick={handleSave}>
              저장
            </span>
          </>
        ) : (
          <>
            <p className="font-semibold text-lg">{nickname}</p>
            <Edit
              color="#c3c3c3"
              size={16}
              className="cursor-pointer"
              onClick={() => {
                setIsEditing(true);
                setNickname('');
              }}
            />
          </>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default NicknameEditor;
