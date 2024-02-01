import ManagementDisplayTable from "@/components/ManagementDisplayTable";

const FAQView = () => {
  const data = [
    { label: "名前", value: "山田太郎" },
    { label: "年齢", value: "30歳" },
    { label: "住所", value: "東京都" },
  ];
  return <ManagementDisplayTable data={data}></ManagementDisplayTable>;
};

export default FAQView;
