import React from 'react';
import * as XLSX from 'xlsx';

function DownloadTemplate() {
  const downloadAndModifyExcel = async () => {
    try {
      const response = await fetch('/data/excel/template.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      
      const workbook = XLSX.read(arrayBuffer, {type: "buffer"});
      
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      worksheet['A1'] = { t: "s", v: "Hello, World!" };
      
      XLSX.writeFile(workbook, "ModifiedTemplate.xlsm", {bookType: "xlsm"});
    } catch (error) {
      console.error("Failed to download or modify the Excel template:", error);
    }
  };

  return <button onClick={downloadAndModifyExcel}>Download & Modify Excel</button>;
}

export default DownloadTemplate;
