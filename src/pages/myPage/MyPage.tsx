import MainLayout from '@/layouts/MainLayout';
import InformationCard from './components/InformationCard';
import PostCard from './components/PostsCard';
import UserMenu from './components/UserMenu';
import { useEffect, useState } from 'react';
import { getMyInfo } from '@/apis/authApi';
import { User } from '@/types/auth';
import { BookHeart, UserPen } from 'lucide-react';

const MyPage = () => {
  const [myProfile, setMyProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMyInfo();
      if (data) {
        setMyProfile(data);
      }
    };
    fetchData();
  }, []);
  if (!myProfile) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <p>로딩 중...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen items-center">
          <div>
            <h2 className="text-2xl font-bold mb-6">내정보</h2>
            <InformationCard nickname={myProfile.nickname} email={myProfile.email} role={myProfile.role}/>
            <div className="flex gap-4">
            <PostCard title='내가 작성한 글' icon={<UserPen />} count={1} link='/'/>
            <PostCard title='좋아요 표시한 글' icon={<BookHeart />} count={1} link='/'/>
            </ div>
            <UserMenu />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default MyPage;
