import { useMemo } from "react";

interface YearMonthDropdownProps {
  year: number;
  month: number;
  onChange: (y: number, m: number) => void;
  showYear?: boolean;
  showMonth?: boolean;
}

const YearMonthDropdown = ({
  year,
  month,
  onChange,
  showYear = true,
  showMonth = true,
}: YearMonthDropdownProps) => {
  const yearRange = useMemo(() => {
    return Array.from({ length: 11 }, (_, i) => year - 5 + i);
  }, [year]);

  return (
    <div className="flex gap-2 bg-white border rounded p-2 shadow w-fit">
      {showYear && (
        <select
          value={year}
          onChange={(e) => onChange(parseInt(e.target.value), month)}
          className="border p-1 rounded"
        >
          {yearRange.map((y) => (
            <option key={y} value={y}>{y}년</option>
          ))}
        </select>
      )}
      {showMonth && (
        <select
          value={month}
          onChange={(e) => onChange(year, parseInt(e.target.value))}
          className="border p-1 rounded"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>{i + 1}월</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default YearMonthDropdown;
