import React, { useState, useEffect, useContext } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import axiosConfig from "../../util/AxiosConfig";
import { myContext } from "../../App";

import "./Messages.css";

export default function Messages() {
  const context = useContext(myContext);
  const { currentUser, newMessage, setNewMessage } = context;
 
  const [messages, setMessages] = useState([]);

  async function getUsers() {
    if (currentUser) {
      try {
        const apiData = await axiosConfig.get(`/users/${currentUser}`);
        const mesList = await apiData.data;

        // replace userId on appropriate user name and surname
        mesList.messages.map(
          (message) => (message.author = `${mesList.name} ${mesList.surname}`)
        );

        // add messages of current user
        const newMessageArr = [...mesList.messages];

        if (mesList.subscriptions) {
          mesList.subscriptions.map((subscription) => {
            // add messages from subscriptions
            subscription.messages.map(
              (message) =>
                (message.author = `${subscription.name} ${subscription.surname}`)
            );
            newMessageArr.push(...subscription.messages);
            return subscription;
          });
        }

        setMessages(newMessageArr);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getUsers();
    setNewMessage(false);
  }, [currentUser, newMessage]);

  return (
    <section className="messages-section">
      <Typography align="center" variant="h5">
        Messages
      </Typography>

      {messages.map((message) => {
        return (
          <Card sx={{ width: "80%", margin: "1rem auto" }} key={message._id}>
            <CardContent>
              <Typography
                gutterBottom
                component="div"
                align="left"
                variant="subtitle"
              >
                {message.author}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="justify"
              >
                {message.text}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
