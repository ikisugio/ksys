import axiosInstance from "@/services/axios";
import { useEffect } from "react";

const JigyosyoAdd = () => {
  const url = "https://65420d08f0b8287df1ff6761.mockapi.io/users";

  useEffect(() => {
    axiosInstance
      .delete(`${url}/23`, {
        name: "vavava",
        intro: "pppppp",
      })
      .then((res) => console.log("axios get", res.data));
  }, []);
  return <div>JigyosyoAddaaa</div>;
};

export default JigyosyoAdd;
