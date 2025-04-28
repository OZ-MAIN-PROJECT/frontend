import { Banknote, ChartPie, House, LogOut, MessageCircleHeart, MessageCircleMore, Settings, Volume2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.svg';


// NavLink
const NavItem = ({ to, icon: Icon, text }: { to: string, icon: React.ElementType, text: string }) => {
  return (
    <NavLink 
        to={to}
        className="flex items-center hover:text-accent-blue hover:no-underline"
        >
        {({ isActive }) => (
            <>
            <div className={`${isActive ? 'bg-accent-blue' : 'bg-transparent'} w-1.5 h-12 rounded-r-md`} />
            <div className={`flex items-center ml-6 ${isActive ? 'text-accent-blue' : 'text-primary-800'} hover:text-accent-blue`}>
                <Icon />
                <span className="ml-3 text-lg">{text}</span>
            </div>
            </>
        )}
    </NavLink>

  );
};

// Button
const ButtonItem = ({ icon: Icon, text, onClick }: { icon: React.ElementType, text: string, onClick?: () => void }) => {
  return (
    <div onClick={onClick} className="flex items-center text-primary-500 cursor-pointer">
      <Icon />
      <span className="ml-3">{text}</span>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[250px] h-screen bg-white border-r border-r-gray-400 py-5">
      <a href="/" className="flex justify-center"><img src={logo} alt="로고" className="w-32 h-auto" /></a>
      <nav className="flex-1 flex flex-col justify-between mt-5">
        <div className="flex-1">
            <ul className="flex flex-col gap-2">
            <li><NavItem to="/" icon={House} text="Home" /></li>
            <li><NavItem to="/expense" icon={Banknote} text="수입/지출 내역" /></li>
            <li><NavItem to="/statistic" icon={ChartPie} text="통계 그래프" /></li>
            </ul>

            <div className="mt-10">
            <p className="px-5 text-primary-500 font-medium">커뮤니티</p>
            <ul className="flex flex-col gap-2 mt-1">
                <li><NavItem to="/community/question" icon={MessageCircleMore} text="질문 게시판" /></li>
                <li><NavItem to="/community/emotional-consumption" icon={MessageCircleHeart} text="감정 소비 이야기" /></li>
                <li><NavItem to="/community/notice" icon={Volume2} text="공지사항" /></li>
            </ul>
            </div>
        </div>

        <div className="flex flex-col gap-6 px-[26px] pb-4">
          <ButtonItem icon={Settings} text="설정" />
          <ButtonItem icon={LogOut} text="로그아웃" />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
