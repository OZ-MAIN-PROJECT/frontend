import InformationCard from './components/InformationCard';
import PostCard from './components/PostsCard';
import UserMenu from './components/UserMenu';
import { useEffect, useState } from 'react';
import { getMyInfo } from '@/apis/authApi';
import { User } from '@/types/auth';
import { BookHeart, UserPen } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';

const MyPage = () => {
  const [myProfile, setMyProfile] = useState<User | null>(null);
  const role = useAuthStore().user?.role ?? 'user';

  useEffect(() => {
    const fetchData = async () => {
      const myInfo = await getMyInfo();
      // const myPosts = await getMyPosts();
      console.log(myInfo)
      if (myInfo) {
        setMyProfile(myInfo);
      }
    };
    fetchData();
  }, []);

  const writtenCount = myProfile?.written_count ?? 0;
  const likedCount = myProfile?.liked_count ?? 0;

  return (
    <>
        <div className="flex flex-col min-h-screen items-center">
          <div className='w-[320px] sm:w-[500px]'>
            <h2 className="text-2xl font-bold mb-6 dark:text-white">내정보</h2>
            {!myProfile ? (
              <div className="flex justify-center items-center">
                <p className='my-4 text-gray-500'>로딩 중...</p>
              </div>
            ) : (
              <InformationCard nickname={myProfile.nickname} email={myProfile.email} role={role} />
            )}
            <div className="flex gap-4">
              <PostCard title="내가 작성한 글" icon={<UserPen />} count={writtenCount} type="written" />
              <PostCard title="좋아요 표시한 글" icon={<BookHeart />} count={likedCount} type="liked" />
            </div>
            <UserMenu />
          </div>
        </div>
    </>
  );
};

export default MyPage;
