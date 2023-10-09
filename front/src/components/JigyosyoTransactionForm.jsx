import React from "react";
import { Button, TextField, Grid, Paper, Typography } from "@mui/material";

function JigyosyoTransactionForm({ onSubmit, initialData }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={3} padding={2}>
          <Typography variant="h6">Jigyosyo Information</Typography>
          {/* Jigyosyoの情報のフィールド */}
          <TextField
            fullWidth
            margin="normal"
            label="Jigyosyo Code"
            defaultValue={initialData?.jigyosyo?.jigyosyo_code}
            // onChange, ... 他のプロパティも設定することができます
          />
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            defaultValue={initialData?.jigyosyo?.name}
            // onChange, ...
          />
          {/* ...他のフィールド */}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} padding={2}>
          <Typography variant="h6">Transaction Information</Typography>
          {/* それ以外の情報のフィールド */}
          <TextField
            fullWidth
            margin="normal"
            label="Visit Datetime"
            defaultValue={initialData?.visit_datetime}
            // onChange, ...
          />
          <TextField
            fullWidth
            margin="normal"
            label="Content"
            defaultValue={initialData?.content}
            multiline
            rows={4}
            // onChange, ...
          />
          {/* ...他のフィールド */}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {initialData ? "Update" : "Create"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default JigyosyoTransactionForm;
