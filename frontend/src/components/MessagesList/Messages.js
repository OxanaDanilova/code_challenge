import React, { useState, useEffect } from "react";

import axiosConfig from "../../util/AxiosConfig";

export default function Messages({ userId }) {
  console.log("userId", userId);
  const [messages, setMessages] = useState([]);
  async function getUsers() {
    try {
      const apiData = await axiosConfig.get(`/users/${userId}`);
      const mesList = await apiData.data;

      // replace userId on appropriate user name and surname
      mesList.messages.map(message=>message.author=`${mesList.name} ${mesList.surname}`);
     
     setMessages(mesList.messages); // add messages of current user
      if (mesList.subscriptions) {
        mesList.subscriptions.map(subscription=>{
          setMessages([...messages, subscription.messages.map(message=>message.author=`${mesList.subscriptions.name} ${mesList.subscriptions.surname}`)]);
          return   subscription.messages.map(message=>message.author=`${mesList.subscriptions.name} ${mesList.subscriptions.surname}`);
        });

            }

    
     
  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return <div>Messages</div>;
}
