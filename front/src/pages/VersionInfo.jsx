import { useEffect } from "react";

const testURL = "/src/data/test/user.json";
const prodURL = "https://65420d08f0b8287df1ff6761.mockapi.io/users"

export default function App({ mode = "test" }) {
  const url = mode === "test" ? testURL : prodURL;
  useEffect(() => {
    (async function (url) {
      try {
        return await fetch(url).then((res) => res.json());
      } catch (e) {
        console.log("error desu", e);
      }
    })(url).then((data) => console.log("data desu", data))
  }, []);

  return (
    <div>
      <div className="bg-green-200">test desu</div>
    </div>
  );
}
