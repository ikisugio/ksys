import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles/RichTextEditor.css";

function RichTextEditor({ text, setText }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      theme="snow"
      value={text}
      onChange={setText}
      modules={modules}
      style={{ height: "50vh", marginBottom: "7vh" }}
    />
  );
}

export default RichTextEditor;
