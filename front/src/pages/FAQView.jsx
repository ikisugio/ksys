import YearMonthPicker, { useYearMonth } from "@/components/YearMonthPicker";
import { useEffect } from "react";

export default function App() {
  const { year, month } = useYearMonth();
  useEffect(() => {
    console.log(`year: ${year}`);
    console.log(`month: ${month}`);
  }, [year, month]);
  return (
    <div className="flex flex-col justify-center">
      <YearMonthPicker />
    </div>
  );
}
