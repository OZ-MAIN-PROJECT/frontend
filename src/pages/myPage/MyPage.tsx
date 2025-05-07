import MainLayout from '@/layouts/MainLayout';
import InformationCard from './components/InformationCard';
import MyPostCard from './components/MyPostsCard';
import UserMenu from './components/UserMenu';

const MyPage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col min-h-screen items-center">
          <div>
            <h2 className="text-2xl font-bold mb-6">내정보</h2>
            <InformationCard />
            <MyPostCard />
            <UserMenu />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default MyPage;
