// components/ThemeSettingModal.tsx
import { useDarkModeStore } from "@/stores/useDarkModeStore";
import { useEffect } from "react";
import Modal from "../common/Modal/Modal";
import Button from "../common/Button";
import { Moon, Sun } from "lucide-react";


export default function ThemeSettingModal() {
  const { isDarkMode, setDarkMode } = useDarkModeStore();

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) setDarkMode(JSON.parse(saved));
  }, [setDarkMode]);

  return (
    <Modal modalKey="themeSetting">
      <div className="space-y-6 w-[400px] max-w-full">
        <h2 className="text-lg font-medium text-primary-900 dark:text-white">환경설정</h2>
        <div>
          <p className="text-sm text-gray-500 mb-2">테마설정</p>
          <div className="flex rounded-md border dark:border-dark-500 overflow-hidden p-1">
            <button
              className={`flex-1 py-3 text-sm rounded-md font-medium flex items-center justify-center gap-1 ${
                !isDarkMode
                  ? "bg-primary-800 text-white"
                  : "text-dark-200 hover:bg-primary-800"
              }`}
              onClick={() => setDarkMode(false)}
            >
                <Sun size={20} />
              라이트모드
            </button>
            <button
              className={`flex-1 py-3 text-sm rounded-md font-medium flex items-center justify-center gap-1 ${
                isDarkMode
                  ? "bg-white/10 text-dark-200"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setDarkMode(true)}
            >
                <Moon size={20} />
              다크모드
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={() => window.location.reload()}>확인</Button>
        </div>
      </div>
    </Modal>
  );
}
