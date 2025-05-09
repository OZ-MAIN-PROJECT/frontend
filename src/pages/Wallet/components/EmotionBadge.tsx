import { Emotion } from "@/types/wallet";
import {
  Smile,
  Frown,
  Angry,
  Meh,
  Heart,
  Zap,
  Sun,
  CloudRain,
} from "lucide-react";
import { getEmotionBgClass } from "@/utils/emotionColor";
import { ComponentType } from "react";


const iconMap: Record<Emotion, ComponentType<{ size?: number }>> = {
  슬픔: Frown,
  분노: Angry,
  불안: CloudRain,
  행복: Smile,
  위로: Heart,
  만족: Meh,
  지침: Zap,
  기대: Sun,
};

type Props = {
  emotion: Emotion;
  size?: "sm" | "md";
};

export default function EmotionBadge({ emotion, size = "sm" }: Props) {
  const bgClass = getEmotionBgClass(emotion);
  const baseSize = size === "md" ? "text-base px-3 py-1" : "text-sm px-2 py-0.5";

  const Icon = iconMap[emotion];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium text-white ${baseSize} ${bgClass}`}
    >
      <Icon size={14} />
      {emotion}
    </span>
  );
}
