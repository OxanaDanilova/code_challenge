import React, { useContext, useState } from "react";

import { myContext } from "../../App";
import axiosConfig from "../../util/AxiosConfig";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CreateMessagePanel() {
  const context = useContext(myContext);
  const { currentUser, setNewMessage } = context;

  const [textMessage, setTextMessage] = useState("");

  const createMessage = async () => {
    if (textMessage) {
      try {
        await axiosConfig.post(`/messages`, {
          text: textMessage,
          author: currentUser,
        });
        setTextMessage("");
        setNewMessage(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: "60%",
        mx: "auto",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-multiline-static"
        placeholder="Select current user and type message"
        multiline
        maxRows={2}
        sx={{
          width: "80%",
          mx: "auto",
          backgroundColor: "InfoBackground",
          borderRadius: "0.5rem",
          border: "none",
        }}
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{
          width: "15%",
          mx: "auto",
        }}
        onClick={createMessage}
        disabled={currentUser ? false : true}
      >
        Add
      </Button>
    </Box>
  );
}
