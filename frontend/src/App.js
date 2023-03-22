import { createContext, useState } from "react";

import Messages from "./components/MessagesList/Messages";
import UsersList from "./components/UsersList/UsersList";
import CreateMessagePanel from "./components/CreateMessagePanel/CreateMessagePanel";

import "./App.css";


export const myContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [newMessage, setNewMessage] = useState(false);

  return (
    <div className="App">
      <myContext.Provider value={{ currentUser, setCurrentUser, newMessage, setNewMessage }}>      
        <UsersList />
        <CreateMessagePanel />
        <Messages />
      </myContext.Provider>
    </div>
  );
}

export default App;
