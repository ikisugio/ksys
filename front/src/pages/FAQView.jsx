import React from "react";
import ReactDOM from "react-dom";

// 印刷用コンポーネント
const PrintContent = () => (
  <div style={{ textAlign: "center", padding: 20 }}>
    <h1>印刷用の特別なコンテンツ</h1>
    <p>これは印刷用に特別にデザインされたコンテンツです。</p>
  </div>
);

const App = () => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "width=600,height=400");

    // 新しいウィンドウにコンポーネントをレンダリング
    ReactDOM.render(<PrintContent />, printWindow.document.body, () => {
      printWindow.focus(); // 新しいウィンドウにフォーカスを移動
      setTimeout(() => {
        printWindow.print(); // 印刷ダイアログを開く
        printWindow.close(); // 印刷後、ウィンドウを閉じる
      }, 500); // 小さな遅延を設定してブラウザがダイアログを処理する時間を確保
    });
  };

  return (
    <div>
      <h1>アプリケーションのメインコンテンツ</h1>
      <p>この部分は通常のウェブページのコンテンツです。</p>
      <button onClick={handlePrint}>印刷用コンテンツを印刷</button>
    </div>
  );
};

export default App;
