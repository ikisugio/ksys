import JigyosyoTransactionTable from "@/components/JigyosyoTransactionTable";
import JigyosyoTransactionCard from "@/components/JigyosyoTransactionCard";
import AxiosInstance from "@/services/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const testCardDataList = [
  {
    visit_date: "2024-01-01",
    support_means: "オンライン会議",
    receptionist: "田中一郎",
    visit_staff: "鈴木次郎",
    file: "会議記録.pdf",
    visit_memo: "介護サービス改善に関する相談",
  },
  {
    visit_date: "2024-01-15",
    support_means: "対面会議",
    receptionist: "佐藤三郎",
    visit_staff: "高橋四郎",
    file: "プロジェクト計画書.docx",
    visit_memo: "新規プロジェクト立ち上げに関する相談",
  },
  {
    visit_date: "2024-02-01",
    support_means: "電話サポート",
    receptionist: "伊藤五郎",
    visit_staff: "山本六郎",
    file: "サポートログ.txt",
    visit_memo: "システム使用方法に関するサポート",
  },
];

export default function Page({ selectedRowData: jigyosyoData }) {
  const [tableData, setTableData] = useState({});
  const [cardDataList, setCardDataList] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/transaction/edit/${id}`);
  };

  useEffect(() => {
    AxiosInstance.get(`/jigyosyo/${jigyosyoData.id}`).then(
      (jigyosyoResponse) => {
        console.log("testTableData::: ", jigyosyoResponse.data);
        setTableData(jigyosyoResponse.data);
        const jigyosyoCode = jigyosyoResponse.data.jigyosyo_code;
        console.log("TESTCARD", testCardDataList);
        AxiosInstance.get(
          `/search/jigyosyo-transaction/?_jigyosyo_code=${jigyosyoCode}`
        ).then((transactionResponse) => {
          console.log("transaction :::", transactionResponse.data);
          setCardDataList(transactionResponse.data);
          // setCardDataList(testCardDataList);
        });
      }
    );
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-auto print-content">
      <div className="py-0"></div>
      <JigyosyoTransactionTable data={tableData} />
      {cardDataList.length > 0 ? (
        cardDataList.map((cardData, index) => (
          <JigyosyoTransactionCard
            data={cardData}
            key={index}
            onEdit={() => handleEdit(cardData.id)}
          />
        ))
      ) : (
        <div className="flex flex-col items-center">
          <div>訪問履歴なし</div>
        </div>
      )}
      {console.log(`CARDDD_DATALIST: ${cardDataList}`)}
      <div className="my-6"></div>
    </div>
  );
}
