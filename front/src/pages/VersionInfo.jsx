import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const fetchData = async (url) => {
      const data = await fetch(url);
    };
  }, []);
  return (
    <div>
      <div></div>
    </div>
  );
}
