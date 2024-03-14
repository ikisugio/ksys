export default function JigyosyoTransactionCard({ data, onEdit }) {
  const {
    visit_date,
    support_means,
    receptionist,
    visit_staff,
    file,
    visit_memo,
  } = data;

  const rows = [
    [
      { title: "年月日", data: visit_date },
      { title: "支援方法", data: support_means },
    ],
    [
      { title: "相談者", data: receptionist },
      { title: "支援者", data: visit_staff },
    ],
    [{ title: "添付ファイル", data: file }],
    [{ title: "支援内容", data: visit_memo }],
  ];

  return (
    <div className="px-8 py-2 no-break">
      <div className="w-full border-2 border-gray-400 rounded-lg p-1">
        {rows.map((row, index) => (
          <div className="flex p-1 gap-4">
            {row.map((item) => (
              <div
                className={`flex w-full gap-3 ${
                  index === rows.length - 1 ? "" : "border-b-2"
                }`}
              >
                <div className="flex-shrink-0 bg-slate-700/70 rounded text-white p-1 w-24">
                  {item.title}
                </div>
                <div className="p-1 flex-grow">{item.data}</div>
              </div>
            ))}
          </div>
        ))}
        <button onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
}
