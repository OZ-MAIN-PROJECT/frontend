const MyPostsCard = () => {
    return (
      <div className="flex gap-4">
        <div className="flex-1 bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">내가 작성한 글</p>
          <p className="text-xl font-bold">24</p>
        </div>
        <div className="flex-1 bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">좋아요 표시한 글</p>
          <p className="text-xl font-bold">24</p>
        </div>
      </div>
    );
  };
  
  export default MyPostsCard;
  