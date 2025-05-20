import { Swiper, SwiperSlide } from "swiper/react";
import Frame from "../../../components/common/Frame";
import "swiper/css";
import "swiper/css/pagination"; 
import { getEmotionBgClass, getEmotionTextClass } from "@/utils/emotionColor";
import { getCategoryIcons } from "@/utils/categoryIcons";
import { Autoplay, Pagination } from "swiper/modules";
import { Statistic } from "@/types/statistic";

interface SummarySwiperProps {
  month: number;
  stat: Statistic;
}

const SummarySwiper = ({ month, stat }:SummarySwiperProps) => {
  const monthLabel = `${month + 1}`.padStart(2, "0");

  const CategoryIcon = getCategoryIcons[stat.mainCategory];
  const formatAmount = (value: number) => `${value.toLocaleString()}원`;


  return (
    
    <Swiper
        className="w-full h-[160px]"
        spaceBetween={16}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          680: { slidesPerView: 2 },
          1280: {
            slidesPerView: 3,
            autoplay: { delay: 3000, disableOnInteraction: false }, 
          },
          1536: {
            slidesPerView: 4,
            autoplay: { delay: 3000, disableOnInteraction: false },
          },
        }}
    >
      <SwiperSlide>
        <Frame className="bg-accent-blue space-y-3 text-white h-full">
          <h2 className="text-lg font-medium text-white">{monthLabel}월 소비 금액</h2>
          <p className="text-2xl font-semibold text-white">총 {formatAmount(stat.totalExpenseAmount)}</p>
          <p className="opacity-50 text-sm text-white">지난달 보다 {stat.increaseRate.toFixed(0)}% {stat.increaseAmount >= 0 ? " 증가" : " 감소"}했어요!</p>
        </Frame>
      </SwiperSlide>
      <SwiperSlide>
        <Frame className="bg-white dark:bg-white/10 space-y-6 h-full text-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-normal dark:text-white">{monthLabel}월 총 수입</h2>
              <p className="text-accent-blue font-semibold text-xl">{formatAmount(stat.totalIncomeAmount)}</p>
          </div>
          <div className="border-b"></div>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-normal dark:text-white">{monthLabel}월 총 지출</h2>
            <p className="text-accent-red font-semibold text-xl">{formatAmount(stat.totalExpenseAmount)}</p>
          </div>
        </Frame>
      </SwiperSlide>
      <SwiperSlide>
        <Frame className="bg-white dark:bg-white/10 space-y-3 text-gray-800 h-full">
          <h2 className="text-lg font-medium dark:text-white">{monthLabel}월 주요 감정 소비</h2>
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-1 text-2xl font-semibold dark:text-white"><span className={`inline-block w-6 h-6 rounded-full ${getEmotionBgClass(stat.mainEmotion)}`}></span>{stat.mainEmotion} {stat.mainEmotionRate}%</p>
            <span className="text-xs text-gray-600">총 {formatAmount(stat.mainEmotionAmount)}</span>
          </div>
          <p className="text-gray-600 text-sm">소비의 <span className={`${getEmotionTextClass(stat.mainEmotion)}`}>{stat.mainEmotionRate}%</span>를 <span className={`${getEmotionTextClass(stat.mainEmotion)}`}>{stat.mainEmotion}</span>했을 때 사용했어요!</p>
        </Frame>
      </SwiperSlide>
      <SwiperSlide>
        <Frame className="bg-white dark:bg-white/10 space-y-3 text-gray-800 h-full">
        <h2 className="text-lg font-medium dark:text-white">{monthLabel}월 주요 카테고리 소비</h2>
          <div className="flex justify-between items-center">
            <p className="flex items-center text-2xl font-semibold text-accent-blue">{CategoryIcon && <CategoryIcon size={24} className="mr-1" />} {stat.mainCategory} {stat.mainCategoryRate}%</p>
            <span className="text-xs text-gray-600">총 {formatAmount(stat.mainCategoryAmount)}</span>
        </div>
          <p className="text-gray-600 text-sm dark:text-dark-500">소비의 <span className="text-primary-900 dark:text-accent-blue font-semibold">{stat.mainCategoryRate}%</span>를 <span className="text-primary-900 dark:text-accent-blue font-semibold">{stat.mainCategory}</span>에 사용했어요!</p>
        </Frame>
      </SwiperSlide>
    </Swiper>
  );
};

export default SummarySwiper;