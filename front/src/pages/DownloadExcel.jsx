import React from "react";
import * as XLSX from "xlsx";
import AutoComplete from "@/components/AutoComplte";
import TestPropagation from "@/components/TestPropagation";

function DownloadTemplate() {
  const downloadAndModifyExcel = async () => {
    try {
      const response = await fetch("/data/excel/template.xlsx");
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, { type: "buffer" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      worksheet["A1"] = { t: "s", v: "Hello, World!" };

      XLSX.writeFile(workbook, "ModifiedTemplate.xlsm", { bookType: "xlsm" });
    } catch (error) {
      console.error("Failed to download or modify the Excel template:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={downloadAndModifyExcel}>Download & Modify Excel</button>
      <AutoComplete></AutoComplete>
      <TestPropagation />
    </div>
  );
}

export default DownloadTemplate;
