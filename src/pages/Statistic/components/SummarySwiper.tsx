import { Swiper, SwiperSlide } from "swiper/react";
import Frame from "../../../components/common/Frame";
import "swiper/css";

const SummarySwiper = () => {
  return (
    
    <Swiper
        className="w-full h-[160px]"
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{ 
            640: { slidesPerView: 2 }, 
            1280: { slidesPerView: 4 } 
        }}
    >
      <SwiperSlide>
        <Frame className="bg-accent-blue space-y-3 text-white h-full">
          <h2 className="text-lg font-medium">00월 소비 금액</h2>
          <p className="text-2xl font-semibold">총 000,000,000원</p>
          <p className="opacity-50 text-sm">저번달보다 0% 늘었어요!</p>
        </Frame>
      </SwiperSlide>
      <SwiperSlide>
        <Frame className="bg-white space-y-3 h-full text-gray-800">
            <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-base font-normal">00월 총 수입</h2>
          <p className="text-accent-blue font-bold text-xl">000,000,000원</p>
          </div>
          <div className="flex items-center justify-between pt-4">
          <h2 className="text-base font-normal">00월 총 지출</h2>
          <p className="text-accent-red text-xl">000,000,000원</p>
          </div>
        </Frame>
      </SwiperSlide>
      <SwiperSlide>
        <Frame className="bg-white space-y-3 text-gray-800 h-full">
          <h2 className="text-lg font-medium">00월 주요 감정 소비</h2>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold"><span className="w-5 h-5 rounded-full"></span>행복 20%</p>
            <span className="text-sm text-gray-600">총 000,000,000원</span>
        </div>
          <p className="opacity-50 text-sm">소비의 <span>20%</span>를 <span>행복</span>했을 때 사용했어요!</p>
        </Frame>
      </SwiperSlide>
      <SwiperSlide>
        <Frame className="bg-white space-y-3 text-gray-800 h-full">
        <h2 className="text-lg font-medium">00월 주요 카테고리 소비</h2>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-accent-blue">식비 20%</p>
            <span className="text-sm text-gray-600">총 000,000,000원</span>
        </div>
          <p className="opacity-50 text-sm">소비의 <span className="text-primary-900 font-semibold">20%</span>를 <span className="text-primary-900 font-semibold">식비</span>했을 때 사용했어요!</p>
        </Frame>
      </SwiperSlide>
    </Swiper>
  );
};

export default SummarySwiper;