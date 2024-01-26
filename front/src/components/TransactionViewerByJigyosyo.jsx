import React, { useState, useEffect } from "react";
import axiosInstance from "@/services/axios";

const TransactionViewerByJigyosyo = ({ selectedRowData: jigyosyoData }) => {
  const [transactionData, setTransactionData] = useState(null);

  const testData = [
    {
      label1: "ラベル1",
      value1: "データ1",
      label2: "ラベル2",
      value2: "データ2",
    },
    {
      label1: "ラベル1",
      value1: "データ3",
      label2: "ラベル2",
      value2: "データ4",
    },
  ];

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { jigyosyoCode } = jigyosyoData;
        const response = await axiosInstance.get(
          `search/jigyosyo-transaction/?_jigyosyo_code=${jigyosyoCode}`
        );
        setTransactionData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransaction();
  }, [jigyosyoData]);

  const tableStyle = {
    borderCollapse: "collapse",
    width: "90%",
    margin: "0 auto",
    textAlign: "left",
  };

  const headerCellStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "8px",
  };

  const bodyCellStyle = {
    padding: "8px",
    border: "1px solid #aaa",
  };

  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          {testData.map((row, index) => (
            <tr key={index}>
              <td style={bodyCellStyle}>{row.label1}</td>
              <td style={bodyCellStyle}>{row.value1}</td>
              <td style={bodyCellStyle}>{row.label2}</td>
              <td style={bodyCellStyle}>{row.value2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionViewerByJigyosyo;
