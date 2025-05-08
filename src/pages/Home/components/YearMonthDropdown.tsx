import { useMemo } from "react";
import { Triangle } from "lucide-react";

interface YearMonthDropdownProps {
  year: number;
  month: number;
  onChange: (y: number, m: number) => void;
  showYear?: boolean;
  showMonth?: boolean;
  className?: string;
}

const YearMonthDropdown = ({
  year,
  month,
  onChange,
  showYear = true,
  showMonth = true,
  className = "",
}: YearMonthDropdownProps) => {
  const yearRange = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => year - 5 + i);
  }, [year]);

  return (
    <div className={`${className} flex gap-4 w-fit font-bold text-primary-900`}>
      {/* 연도 선택 */}
      {showYear && (
        <div className="flex items-center">
          <div className="relative inline-block">
            <select
              value={year}
              onChange={(e) => onChange(parseInt(e.target.value), month)}
              className="appearance-none text-accent-blue border-b-4 border-primary-800 pl-1 pr-6 pb-1 bg-transparent focus:outline-none"
            >
              {yearRange.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <Triangle
              size={10}
              className="absolute right-1 bottom-1/2 text-primary-800 pointer-events-none rotate-180 fill-current translate-y-1/2"
            />
            </div>
          <span className="ml-1 text-primary-900">년</span>
        </div>
      )}

      {/* 월 선택 */}
      {showMonth && (
        <div className="flex items-center">
          <div className="relative inline-block">
            <select
              value={month}
              onChange={(e) => onChange(year, parseInt(e.target.value))}
              className="appearance-none text-accent-blue border-b-4 border-primary-800 pl-1 pr-6 pb-1 bg-transparent focus:outline-none"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {(i + 1).toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <Triangle
              size={10}
              className="absolute right-1 bottom-1/2 text-primary-800 pointer-events-none rotate-180 fill-current translate-y-1/2"
            />
          </div>
          <span className="ml-1 text-primary-900">월</span>
        </div>
      )}
    </div>
  );
};

export default YearMonthDropdown;
