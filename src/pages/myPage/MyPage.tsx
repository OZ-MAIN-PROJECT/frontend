import MainLayout from '@/layouts/MainLayout';
import InformationCard from './components/InformationCard';
import PostCard from './components/PostsCard';
import UserMenu from './components/UserMenu';
import { useEffect, useState } from 'react';
import { getMyInfo, getMyPosts } from '@/apis/authApi';
import { User } from '@/types/auth';
import { BookHeart, UserPen } from 'lucide-react';

const MyPage = () => {
  const [myProfile, setMyProfile] = useState<User | null>(null);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const myInfo = await getMyInfo();
      const myPosts = await getMyPosts();
      console.log(myInfo, myPosts)
      if (myInfo) {
        setMyProfile(myInfo);
      }
      if (myPosts) {
        setMyPosts(myPosts)
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen items-center">
          <div className='w-[320px] sm:w-[500px]'>
            <h2 className="text-2xl font-bold mb-6">내정보</h2>
            {!myProfile ? (
              <div className="flex justify-center items-center">
                <p className='my-4 text-gray-500'>로딩 중...</p>
              </div>
            ) : (
              <InformationCard nickname={myProfile.nickname} email={myProfile.email} role={myProfile.role} />
            )}
            <div className="flex flex-wrap gap-4 my-4">
              <PostCard title="내가 작성한 글" icon={<UserPen />} count={myPosts.length} link="/" />
              <PostCard title="좋아요 표시한 글" icon={<BookHeart />} count={myPosts.length} link="/" />
            </div>
            <UserMenu />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default MyPage;
