import TextField from "@mui/material/TextField"

const CustomTextField = ({ field, formData, handleChange }) => {
  return (
    <TextField
      key={field.name}
      name={field.name}
      label={field.label}
      type={field.type}
      value={formData[field.name] || ""}
      onChange={handleChange}
      fullWidth
      margin="normal"
      variant="outlined"
      multiline={field.type === "text" && field.name === "visit_memo"}
      rows={
        field.name === "visit_memo" ? formData.visit_memo_rows || 3 : undefined
      }
    />
  );
};

export default CustomTextField;
