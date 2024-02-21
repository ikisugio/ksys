import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

export function useYearMonth() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const years = Array.from({ length: currentYear - 1999 }, (_, k) => k + 2000);
  const months = Array.from({ length: 12 }, (_, k) => k + 1);
  return { year, setYear, month, setMonth, years, months };
}

export default function YearMonthPicker() {
  const { year, setYear, month, setMonth, years, months } = useYearMonth();

  useEffect(() => {
    console.log(`year : ${typeof year}, ${year}`);
    console.log(`month : ${typeof month}, ${month}`);
  }, [year, month])

  return (
    <div className="flex flex-col p-4 justify-center gap-4 items-center h-20">
      <div className="flex gap-2 h-full">
        <Select
          value={String(year)}
          onValueChange={(value) => {
            setYear(Number(value));
          }}
        >
          <SelectTrigger className="w-28 h-14 border-slate-300">
            <SelectValue value={String(year)} placeholder="年" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem value={String(year)} key={year}>
                {year}年
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={String(month)}
          onValueChange={(value) => {
            setMonth(Number(value));
          }}
        >
          <SelectTrigger className="w-24 h-14 border-slate-300">
            <SelectValue placeholder="月" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem value={String(month)} key={month}>
                {month}月
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
