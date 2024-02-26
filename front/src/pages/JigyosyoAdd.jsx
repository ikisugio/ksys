import axiosInstance from "@/services/axios";
import { useEffect } from "react";

const JigyosyoAdd = () => {
  const url = "user/";
  let data;
  (async () => {
    const json = await axiosInstance.get("http://127.0.0.1:8000/api/user/");
    data = json.data;
  })();

  useEffect(() => {
    console.log("data : ", data);
  }, [data]);
  return <div>JigyosyoAddaaa</div>;
};

export default JigyosyoAdd;
