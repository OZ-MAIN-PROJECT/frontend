import { Menu, UserRound } from "lucide-react";
import logo from '../../assets/logo.svg';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    return(
        <header className="flex justify-between items-center bg-white h-16 px-5 lg:px-10">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="lg:hidden bg-white p-1 hover:bg-gray-200">
                    <Menu size={28} className="text-primary-800" />
                </button>
            </div>
            <div className="lg:hidden">
                <a href="/" className="flex justify-center"><img src={logo} alt="로고" className="w-24 h-auto" /></a>
            </div>
            <div className="flex items-center cursor-pointer">
                <div className="flex justify-center items-center w-8 h-8 bg-primary-800 rounded-full mr-1.5">
                    <UserRound size={20} className="text-white" />
                </div>
                <p className="text-primary-500"><span className="text-primary-800 font-medium mr-0.5">User</span>님</p>
            </div>
        </header>
    );
};

export default Header;