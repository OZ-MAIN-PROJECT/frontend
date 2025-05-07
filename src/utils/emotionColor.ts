import { Emotion } from "../types/wallet";

export const getEmotionBgClass = (emotion: Emotion): string => {
  const emotionClassMap: Record<Emotion, string> = {
    행복: 'bg-emotion-happiness',
    슬픔: 'bg-emotion-sadness',
    분노: 'bg-emotion-anger',
    불안: 'bg-emotion-anxiety',
    위로: 'bg-emotion-comfort',
    만족: 'bg-emotion-satisfaction',
    지침: 'bg-emotion-exhaustion',
    기대: 'bg-emotion-anticipation',
  };

  return emotionClassMap[emotion];
};

export const getEmotionTextClass = (emotion: Emotion): string => {
  const emotionClassMap: Record<Emotion, string> = {
    행복: 'text-emotion-happiness',
    슬픔: 'text-emotion-sadness',
    분노: 'text-emotion-anger',
    불안: 'text-emotion-anxiety',
    위로: 'text-emotion-comfort',
    만족: 'text-emotion-satisfaction',
    지침: 'text-emotion-exhaustion',
    기대: 'text-emotion-anticipation',
  };

  return emotionClassMap[emotion];
};
