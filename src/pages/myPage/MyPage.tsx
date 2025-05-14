import MainLayout from '@/layouts/MainLayout';
import InformationCard from './components/InformationCard';
import PostCard from './components/PostsCard';
import UserMenu from './components/UserMenu';
import { getMyInfo } from '@/apis/authApi';

const MyPage = () => {
  const myProfile = getMyInfo();
  console.log(myProfile)
  
  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 ">내정보</h2>
            <InformationCard />
            <PostCard />
            <UserMenu />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default MyPage;
