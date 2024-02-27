import JigyosyoTransactionTable from "@/components/JigyosyoTransactionTable";
import JigyosyoTransactionCard from "@/components/JigyosyoTransactionCard";
import AxiosInstance from "@/services/axios";
import { useState, useEffect } from "react";

// const initialTableData = {
//   businessCode: "123456",
//   branchCode: "DEF-789",
//   corporationName: "株式会社サンプル",
//   businessName: "サンプル事業所",
//   serviceType: "介護サービス",
//   staffNumber: "20",
//   capacity: "30",
//   openingDate: "2020年4月1日",
//   turnoverRate: "5%",
//   postalCode: "123-4567",
//   address: "東京都サンプル区サンプル町1-2-3",
//   phoneNumber: "03-1234-5678",
//   faxNumber: "03-8765-4321",
//   url: "https://www.example.com",
//   representativeName: "山田太郎",
//   representativePosition: "代表取締役",
//   sponsorMemberNumber: "S123456789",
//   employmentManagerStatus: "配置済",
// };

const cardDataList = [
  {
    date: "2024-01-01",
    supportMethod: "オンライン会議",
    consultant: "田中一郎",
    supporter: "鈴木次郎",
    attachment: "会議記録.pdf",
    supportContent: "介護サービス改善に関する相談",
  },
  {
    date: "2024-01-15",
    supportMethod: "対面会議",
    consultant: "佐藤三郎",
    supporter: "高橋四郎",
    attachment: "プロジェクト計画書.docx",
    supportContent: "新規プロジェクト立ち上げに関する相談",
  },
  {
    date: "2024-02-01",
    supportMethod: "電話サポート",
    consultant: "伊藤五郎",
    supporter: "山本六郎",
    attachment: "サポートログ.txt",
    supportContent: "システム使用方法に関するサポート",
  },
];

export default function Page({ selectedRowData: jigyosyoData }) {
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    AxiosInstance.get(`/jigyosyo/${jigyosyoData.id}`).then((res) => {
      console.log("testTableData: ", res.data);
      setTableData(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <div className="py-4"></div>
      <JigyosyoTransactionTable data={tableData} />
      {cardDataList.map((cardData) => (
        <JigyosyoTransactionCard data={cardData} />
      ))}
      <div className="my-6"></div>
    </div>
  );
}
