import React, {useContext} from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import axiosConfig from "../../util/AxiosConfig";
import { myContext } from "../../App";


export default function ImportComponent() {
  const context = useContext(myContext);
  const { setIsLoading, setIsUpdated } = context;

    async function uploadFile(event) {
      event.preventDefault();
        const txtFile = event.target.elements.file.files[0]; 
       if (txtFile) {   
        const formData = new FormData();
        formData.append("file", txtFile);      
          try {
            setIsLoading(true);
            await axiosConfig.post("/importFile", formData);
            setIsLoading(false);
         setIsUpdated(true);
          } catch (error) {
            setIsLoading(false);
            console.log(error);
          }

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
