import React from "react";
import { createRoot } from "react-dom/client";

const PrintContent = () => (
  <div style={{ textAlign: "center", padding: 20 }}>
    <h1>印刷用の特別なコンテンツ</h1>
    <p>これは印刷用に特別にデザインされたコンテンツです。</p>
  </div>
);

const App = () => {
  const handlePrint = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const printWindow = window.open(
      "",
      "_blank",
      `width=${screenWidth * 0.8},height=${screenHeight * 0.7}`
    );
    printWindow.document.body.innerHTML = "<div id='print-root'></div>";

    const printContainer = printWindow.document.getElementById("print-root");
    const printRoot = createRoot(printContainer);
    printRoot.render(<PrintContent />)
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);

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
