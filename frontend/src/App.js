import { createContext, useState } from "react";

import Messages from "./components/MessagesList/Messages";
import UsersList from "./components/UsersList/UsersList";
import CreateMessagePanel from "./components/CreateMessagePanel/CreateMessagePanel";

import "./App.css";
import ImportComponent from "./components/ImportComponent/ImportComponent";


export const myContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [newMessage, setNewMessage] = useState(false);

  return (
    <div className="App">
      <myContext.Provider value={{ currentUser, setCurrentUser, newMessage, setNewMessage }}> 
      <ImportComponent />     
        <UsersList />
        <CreateMessagePanel />
        <Messages />
      </myContext.Provider>
    </div>
  );
}

export default App;
