import { UserRound } from "lucide-react";

const Header = () => {
    return(
        <header className="flex justify-end items-center bg-white h-16 px-10">
            <div className="flex items-center">
                <div className="flex justify-center items-center w-8 h-8 bg-primary-800 rounded-full mr-1.5">
                    <UserRound size={20} className="text-white" />
                </div>
                <p className="text-primary-500"><span className="text-primary-800 font-medium mr-0.5">User</span>님</p>
            </div>
            

        </header>
    );
};

export default Header;