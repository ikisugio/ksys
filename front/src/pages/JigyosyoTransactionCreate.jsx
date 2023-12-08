import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function JigyosyoTransactionCreate() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // ここでフォームの送信処理を行う
    console.log("Form submitted");
  };

  return (
    <Card
      style={{
        margin: "20px",
        border: "1px solid #ddd",
        boxShadow: "none",
        maxWidth: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          style={{ marginBottom: "20px" }}
        >
          訪問履歴作成
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <ReactQuill
              theme="snow"
              value={text}
              onChange={setText}
              style={{ height: "250px", marginBottom: "20px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" component="label">
              ファイル添付
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <Button type="submit" variant="contained" color="primary">
              送信
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default JigyosyoTransactionCreate;
