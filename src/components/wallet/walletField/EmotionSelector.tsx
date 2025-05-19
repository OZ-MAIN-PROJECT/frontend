import EmotionBadge from '@/pages/Wallet/components/EmotionBadge';
import { Emotion, walletFormProps } from '@/types/wallet';
import clsx from 'clsx';

const EmotionSelector = ({ value, onChange, disabled }: walletFormProps<Emotion>) => {
  const EMOTIONS: Emotion[] = ['행복', '슬픔', '분노', '불안', '위로', '만족', '지침', '기대'];

  const handleClick = (e: Emotion) => {
    if (disabled) return;
    onChange?.(e);
  };

  return (
    <div className="flex gap-2 items-center py-4 flex-wrap px-1">
      {EMOTIONS.map((emotion) => {
        const isSelected = value === emotion;

        return (
          <div
            key={emotion}
            className={clsx(
              'flex items-center rounded-full bg-white',
              isSelected ? 'ring-2 ring-accent-blue border-2 opacity-100' : 'opacity-50',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
            onClick={() => handleClick(emotion)}
          >
            <EmotionBadge emotion={emotion} />
          </div>
        );
      })}
    </div>
  );
};

export default EmotionSelector;
