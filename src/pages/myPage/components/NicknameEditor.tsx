import { Edit } from 'lucide-react';
import { useState } from 'react';
import { useDuplicateCheck } from '@/hooks/auth/useDuplicateCheck';
import { useUpdateNickname } from '@/hooks/auth/useUpdateProfile';
import { useAuthStore } from '@/stores/useAuthStore';

interface NicknameEditorProps {
  currentNickname: string;
  onUpdated?: (newNickname: string) => void;
}

const NicknameEditor = ({ currentNickname, onUpdated }: NicknameEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(currentNickname);
  const { check, status, message, reset } = useDuplicateCheck();
  const { update, loading, error: updateError } = useUpdateNickname();
  const {  setNickname: updateStoreNickname } = useAuthStore();

  const handleSave = async () => {
    const trimmed = nickname.trim();

    // 닉네임이 바뀐 경우만 처리
    if (trimmed !== currentNickname) {
      const duplicateMessage = await check('nickname', trimmed);
      if (duplicateMessage) return;

      const success = await update(trimmed);
      if (success) {
        updateStoreNickname(trimmed);
        setIsEditing(false);
        reset();
        onUpdated?.(trimmed);
      }
    } else {
      setIsEditing(false);
      reset();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="w-[300px] h-[32px] flex gap-4 items-center">
          {isEditing ? (
            <>
              <input
                className="bg-transparent border-b-2 outline-none"
                value={nickname}
                onChange={e => {
                  setNickname(e.target.value);
                  reset();
                }}
              />
              <span className="cursor-pointer text-accent-blue text-sm" onClick={handleSave}>
                {loading ? '저장 중...' : '저장'}
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
                  setNickname(currentNickname);
                  reset();
                }}
              />
            </>
          )}
        </div>
      </div>
      {/* 에러 또는 성공 메시지 */}
      {status === 'error' && <p className="text-sm text-red-500">{message}</p>}
      {status === 'success' && <p className="text-sm text-green-500">{message}</p>}
      {updateError && <p className="text-sm text-red-500">{updateError}</p>}
    </>
  );
};

export default NicknameEditor;
