import { useState } from "react";
import Frame from "../../components/common/Frame";
import { CalendarDays, ListTodo } from "lucide-react";
import CalendarView from "./components/CalendarView";
import ListView from "./components/ListView";

const HomePage = () => {
    const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

    return(
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 min-h-screen">
            <Frame>
                <div className="flex gap-2 items-center">
                    <button
                    className={`p-0 bg-white ${
                        viewMode === "calendar" ? "text-primary-800" : "text-gray-500"
                    }`}
                    onClick={() => setViewMode("calendar")}
                    >
                    <CalendarDays size={20} />
                    </button>
                    <span className="border-gray-500 border rounded-full h-5"></span>
                    <button
                    className={`p-0 bg-white ${
                        viewMode === "list" ? "text-primary-800" : "text-gray-500"
                    }`}
                    onClick={() => setViewMode("list")}
                    >
                    <ListTodo />
                    </button>
                </div>
                {viewMode === "calendar" ? (
                    <CalendarView />
                    ) : (
                    <ListView />
                    )}
            </Frame>

            <aside className="flex flex-col gap-4">
                <Frame>
                    <h2 className="text-sm font-semibold text-gray-600">총 수입</h2>
                    <p className="text-blue-600 font-bold text-xl">000,000,000원</p>
                    <h2 className="text-sm font-semibold mt-4 text-gray-600">총 지출</h2>
                    <p className="text-red-500 font-bold text-xl">000,000,000원</p>
                </Frame>
                <Frame>
                    <h3>2025년 04월 10일</h3>
                    
                </Frame>
            </aside>
        </div>
    );
};

export default HomePage;