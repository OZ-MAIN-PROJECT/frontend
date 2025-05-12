import EmotionBadge from '@/pages/Wallet/components/EmotionBadge';
import { Emotion } from '@/types/wallet';
import { useState } from 'react';
import clsx from 'clsx';

const EmotionSelector = () => {
  const EMOTIONS : Emotion[] = ['행복', '슬픔', '분노', '불안', '위로', '만족', '지침', '기대'];
  const [selected, setSelected] = useState('행복');

  const handleSelect = (emotion : Emotion) => {
    setSelected(emotion);
  }

  return (
    <div className='flex gap-2 items-center py-4'>
      {EMOTIONS.map(e => {
        return (
          <div key={e}
            className={clsx('flex items-center cursor-pointer rounded-full bg-white', selected === e && 'ring-2 ring-accent-blue border-2')}
            onClick={() => handleSelect(e)}
          >
            <EmotionBadge emotion={e} />
          </div>
        );
      })}
    </div>
  );
};

export default EmotionSelector;
