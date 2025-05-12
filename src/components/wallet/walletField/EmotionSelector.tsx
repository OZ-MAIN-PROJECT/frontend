import EmotionBadge from '@/pages/Wallet/components/EmotionBadge';
import { Emotion, walletFormProps } from '@/types/wallet';
import clsx from 'clsx';

const EmotionSelector = ({value, onChange} : walletFormProps<Emotion>) => {
  const EMOTIONS : Emotion[] = ['행복', '슬픔', '분노', '불안', '위로', '만족', '지침', '기대'];

  return (
    <div className='flex gap-2 items-center py-4 flex-wrap'>
      {EMOTIONS.map(e => {
        return (
          <div key={e}
            className={clsx('flex items-center cursor-pointer rounded-full bg-white', value === e && 'ring-2 ring-accent-blue border-2')}
            onClick={() => onChange(e)}
          >
            <EmotionBadge emotion={e} />
          </div>
        );
      })}
    </div>
  );
};

export default EmotionSelector;
