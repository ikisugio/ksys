import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  TRANSACTION_FIELDS,
  AUXILIARY_FIELDS,
} from "@/constants/transaction-fields";

function JigyosyoTransactionForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const createInputField = (field) => {
    switch (field.type) {
      case "text":
      case "date":
      case "file":
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
          />
        );
      case "select":
        return (
          <Select
            key={field.name}
            name={field.name}
            label={field.label}
            value={formData[field.name] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {field.options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      case "checkbox":
        return (
          <FormControlLabel
            key={field.name}
            control={
              <Checkbox
                name={field.name}
                checked={!!formData[field.name]}
                onChange={handleChange}
              />
            }
            label={field.label}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {" "}
          {/* 左カラム */}
          {AUXILIARY_FIELDS.filter((field) => field.isDisplay).map(
            createInputField
          )}
        </Grid>
        <Grid item xs={6}>
          {" "}
          {/* 右カラム */}
          {TRANSACTION_FIELDS.filter((field) => field.isDisplay).map(
            createInputField
          )}
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: 20 }}
      >
        保存
      </Button>
    </form>
  );
}

export default JigyosyoTransactionForm;
