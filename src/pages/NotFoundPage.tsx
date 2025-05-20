import { Link } from 'react-router-dom';
import notFound from '/public/notFound.png'

const NotFoundPage = () => {
  return (
    <div className="flex flex-row min-h-screen w-full items-center justify-center gap-20">
      <div className="md:block hidden text-primary-800">
        <img src={notFound}/>
      </div>
      <div className="flex flex-col items-center md:items-start justify-center p-6 gap-4 text-center md:text-left">
      <h1 className="text-2xl md:text-3xl font-bold text-red-500 mb-2">페이지를 찾을 수 없습니다.</h1>
        <p className="text-gray-600 mb-4">
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. <br />
          올바른 URL을 입력했는지 확인해주세요.
        </p>
        <Link to="/" className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
