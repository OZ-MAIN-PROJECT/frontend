import { Link } from "react-router-dom";

interface PostCardProps {
  title : string;
  icon : React.ReactNode;
  count : number;
  type : "written" | "liked";
}

const PostCard = ({title, icon, count, type} : PostCardProps) => {

  return (
  <div className="bg-white dark:bg-dark-800 rounded-md w-full sm:w-60 p-4">
    <h3 className="dark:text-white">{title}</h3>
    <div className="flex justify-between items-center my-2">
      <span className="text-accent-blue text-2xl font-semibold">{count}</span>
      <Link to={`/mypage/${type}`}><span className="dark:text-white">{icon}</span></Link>
    </div>
  </div>

);
};

export default PostCard;
