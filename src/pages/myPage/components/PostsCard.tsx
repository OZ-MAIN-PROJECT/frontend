import { BookHeart, UserPen } from "lucide-react";

const PostCard = () => {
  return (
  <div className="flex gap-4">
  <div className="bg-white rounded-md w-60 p-4 my-4">
    <h3>내가 작성한 글</h3>
    <div className="flex justify-between items-center my-2">
      <span className="text-accent-blue text-2xl font-semibold">24</span>
      <span><UserPen /></span>
    </div>
  </div>
  <div className="bg-white rounded-md w-60 p-4 my-4">
    <h3>좋아요 표시한 글</h3>
    <div className="flex justify-between items-center my-2">
      <span className="text-accent-blue text-2xl font-semibold">24</span>
      <span><BookHeart /></span>
    </div>
  </div>
  </ div>

);
};

export default PostCard;
