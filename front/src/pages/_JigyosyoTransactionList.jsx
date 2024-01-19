import MyTimeline from "@/components/MyTimeline";
import { dummyTransactionData } from "@/constants/dummy";

const JigyosyoTransactionList = (events) => {
  return <MyTimeline events={dummyTransactionData}></MyTimeline>;
};

export default JigyosyoTransactionList;
