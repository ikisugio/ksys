export default function SimpleTable({ data }) {
  const rows = [
    [{ title: "事業所コード", data: data.businessCode }, { title: "支部独自コード", data: data.branchCode }],
    [{ title: "法人名", data: data.corporationName }],
    [{ title: "事業所名", data: data.businessName }],
    [{ title: "サービス種別", data: data.serviceType }, { title: "職員数", data: data.staffNumber }],
    [{ title: "利用定員", data: data.capacity }, { title: "開業日", data: data.openingDate }],
    [{ title: "離職率", data: data.turnoverRate }, { title: "郵便番号", data: data.postalCode }],
    [{ title: "住所", data: data.address }],
    [{ title: "電話番号", data: data.phoneNumber }, { title: "FAX番号", data: data.faxNumber }],
    [{ title: "URL", data: data.url }, { title: "開業日", data: data.openingDate }],
    [{ title: "代表者名", data: data.representativeName }, { title: "代表者役職", data: data.representativePosition }],
    [{ title: "賛助会員番号", data: data.sponsorMemberNumber }, { title: "雇用管理責任者状況", data: data.employmentManagerStatus }],
  ];

  return (
    <div className="w-screen p-8">
      {rows.map((row, index) => (
        <div className={`flex w-full ${index > 0 ? "border-t-0" : ""}`}>
          {row.map((item, itemIndex) => (
            <div className={`flex ${row.length > 1 ? "w-1/2" : "w-full"} border-2 border-gray-400 mt-1 ${row.length > 1 && itemIndex > 0 ? "border-l-0" : ""} ${index > 0 ? "border-t-2" : ""}`}>
              <div className={`${row.length > 1 ? "w-2/6" : "w-1/6"} bg-slate-700 text-white px-1`}>{item.title}</div>
              <div className={`${row.length > 1 ? "w-4/6" : "w-5/6"} px-2`}>{item.data}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}