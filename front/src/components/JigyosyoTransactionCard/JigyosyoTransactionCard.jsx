export default function JigyosyoTransactionCard({ data }) {
  const {
    date,
    supportMethod,
    consultant,
    supporter,
    attachment,
    supportContent,
  } = data;
  const rows = [
    [
      { title: "年月日", data: date },
      { title: "支援方法", data: supportMethod },
    ],
    [
      { title: "相談者", data: consultant },
      { title: "支援者", data: supporter },
    ],
    [{ title: "添付ファイル", data: attachment }],
    [{ title: "支援内容", data: supportContent }],
  ];

  return (
    <div className="px-8 py-2">
      <div className="w-full border-2 border-gray-400 rounded-lg p-1">
        {rows.map((row, index) => (
          <div className="flex p-1 gap-4">
            {row.map((item) => (
              <div
                className={`flex w-full gap-3 ${
                  index === rows.length - 1 ? "" : "border-b-2"
                }`}
              >
                <div className="bg-slate-700 rounded text-white p-1 w-24">
                  {item.title}
                </div>
                <div className="p-1 flex-grow">{item.data}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
