import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";

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

  return (
    <div className="flex flex-col w-screen p-4 h-screen justify-center gap-4 items-center">
      <h1 className="flex">
        <h1 className="text"></h1>
        <p className="flex gap-1">
          <span className="w-10 text-end">{year}</span>
          <span>年</span>
        </p>
        <p className="flex gap-1">
          <span className="w-6 text-end">{month}</span>
          <span className="pr-0">月</span>
        </p>
      </h1>
      <div className="flex gap-2">
        <Select
          value={year}
          onValueChange={(value) => {
            setYear(value);
          }}
        >
          <SelectTrigger className="w-28">
            <SelectValue placeholder="年" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem value={year} key={year}>
                {year}年
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={month}
          onValueChange={(value) => {
            setMonth(value);
          }}
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="月" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem value={month} key={month}>
                {month}月
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
