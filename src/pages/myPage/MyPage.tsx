import InformationCard from './components/profile/InformationCard';
import UserMenu from './components/profile/UserMenu';
import { useEffect, useState } from 'react';
import { getMyInfo } from '@/apis/authApi';
import { User } from '@/types/auth';
import { BookHeart, UserPen } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import MyPostCard from './components/myPost/MyPostsCard';
import { ProfileSkeleton } from '@/components/common/SkeletonModels';

const MyPage = () => {
  const [myProfile, setMyProfile] = useState<User | null>(null);
  const role = useAuthStore().user?.role ?? 'user';

  useEffect(() => {
    const fetchData = async () => {
      const myInfo = await getMyInfo();
      // const myPosts = await getMyPosts();
      console.log(myInfo);
      if (myInfo) {
        setMyProfile(myInfo);
      }
    };
    fetchData();
  }, []);

  const writtenCount = myProfile?.writtenCount ?? 0;
  const likedCount = myProfile?.likedCount ?? 0;

  return (
    <>
      <div className="flex flex-col min-h-screen items-center">
        <div className="w-[320px] sm:w-[500px]">
          <h2 className="text-2xl font-bold mb-6">내정보</h2>
          {!myProfile ? (
            <ProfileSkeleton />
          ) : (
            <>
              <InformationCard nickname={myProfile.nickname} email={myProfile.email} role={role} />
              <div className="flex gap-4">
                <MyPostCard title="내가 작성한 글" icon={<UserPen />} count={writtenCount} type="written" />
                <MyPostCard title="좋아요 표시한 글" icon={<BookHeart />} count={likedCount} type="liked" />
              </div>
            </>
          )}
          <UserMenu />
        </div>
      </div>
    </>
  );
};

export default MyPage;
