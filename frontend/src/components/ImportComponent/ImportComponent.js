import React from "react";

import axiosConfig from "../../util/AxiosConfig";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function ImportComponent() {

    async function uploadFile(event) {
        event.preventDefault();
        const txtFile = event.target.elements.file.files[0];        
        const formData = new FormData();
        formData.append("file", txtFile);
        try {
          await axiosConfig.post("/importFile", formData);
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        width: "40%",
        minWidth:"300px",
        mx: "auto",
      }}
      noValidate
      autoComplete="off" onSubmit={uploadFile}
    >
      <TextField
        id="standard-basic"
        type="file"        
        inputProps={{accept:".txt"}}
        label="Select txt file"
        sx={{ width: "45%" }}
        name="file"
        helperText="Select .txt file to import data"
        variant="standard"
      ></TextField>
      <Button variant="contained" color="secondary" type="submit">
        Import Data
      </Button>
    </Box>
  );
}
