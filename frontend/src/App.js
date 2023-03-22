import { createContext, useState } from "react";

import Messages from "./components/MessagesList/Messages";
import UsersList from "./components/UsersList/UsersList";

import "./App.css";

export const myContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState("");

  return (
    <div className="App">
      <myContext.Provider value={{ currentUser, setCurrentUser }}>
        <UsersList />
        <Messages userId={"6419b8591c7df2f378dea40b"} />
      </myContext.Provider>
    </div>
  );
}

export default App;
