export default function CustomTransactionTable({ data }) {
  console.log("data :", data);
  const rows = [
    [
      { title: "事業所コード", data: data.jigyosyo_code },
      { title: "支部独自コード", data: data.custom_code },
    ],
    [{ title: "法人名", data: data.company?.name }],
    [{ title: "事業所名", data: data.name }],
    [
      { title: "サービス種別", data: data.service_type },
      { title: "職員数", data: data.number_of_member },
    ],
    [
      { title: "利用定員", data: data.number_of_capacity },
      { title: "開業日", data: data.established_date },
    ],
    [
      { title: "離職率", data: data.turnover_rate },
      { title: "郵便番号", data: data.postal_code },
    ],
    [{ title: "住所", data: data.address }],
    [
      { title: "電話番号", data: data.tel_number },
      { title: "FAX番号", data: data.fax_number },
    ],
    [{ title: "URL", data: data.url }],
    [
      { title: "代表者名", data: data.repr_name },
      { title: "代表者役職", data: data.repr_position },
    ],
  ];

  return (
    <div className="w-full p-8">
      {rows.map((row, index) => (
        <div className={`flex w-full ${index > 0 ? "border-t-0" : ""}`}>
          {row.map((item, itemIndex) => (
            <div
              className={`flex rounded  ${
                row.length > 1 ? "w-1/2" : "w-full"
              } border-2 border-gray-400 mt-1 ${
                row.length > 1 && itemIndex > 0 ? "border-l-0" : ""
              } ${index > 0 ? "border-t-2" : ""}`}
            >
              <div
                className={`${
                  row.length > 1 ? "w-2/6" : "w-1/6"
                } bg-slate-700 text-white px-1`}
              >
                {item.title}
              </div>
              <div className={`${row.length > 1 ? "w-4/6" : "w-5/6"} px-2`}>
                {item.data}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
