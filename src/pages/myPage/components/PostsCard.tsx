import { Link } from "react-router-dom";

interface PostCardProps {
  title : string;
  icon : React.ReactNode;
  count : number;
  type : "written" | "liked";
}

const PostCard = ({title, icon, count, type} : PostCardProps) => {

  return (
  <div className="bg-white rounded-md w-60 p-4 my-4">
    <h3>{title}</h3>
    <div className="flex justify-between items-center my-2">
      <span className="text-accent-blue text-2xl font-semibold">{count}</span>
      <Link to={`/mypage/${type}`}><span>{icon}</span></Link>
    </div>
  </div>

);
};

export default PostCard;
