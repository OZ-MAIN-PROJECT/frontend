import { Link } from "react-router-dom";

interface MyPostCardProps {
  title : string;
  icon : React.ReactNode;
  count : number;
  type : "written" | "liked";
}

const MyPostCard = ({title, icon, count, type} : MyPostCardProps) => {

  return (
  <div className="bg-white rounded-md w-full sm:w-60 p-4">
    <h3>{title}</h3>
    <div className="flex justify-between items-center my-2">
      <span className="text-accent-blue text-2xl font-semibold">{count}</span>
      <Link to={`/mypage/${type}`}><span>{icon}</span></Link>
    </div>
  </div>

);
};

export default MyPostCard;
