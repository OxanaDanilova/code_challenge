import { createContext, useState } from "react";

import Messages from "./components/MessagesList/Messages";
import UsersList from "./components/UsersList/UsersList";
import CreateMessagePanel from "./components/CreateMessagePanel/CreateMessagePanel";
import ImportComponent from "./components/ImportComponent/ImportComponent";
import Loader from "./components/Loader/Loader";

import "./App.css";

export const myContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading]=useState(false);

  return (
    <div className="App">
      <myContext.Provider value={{ currentUser, setCurrentUser, isUpdated, setIsUpdated, isLoading, setIsLoading }}> 
      <ImportComponent />     
        <UsersList />
        <CreateMessagePanel />
        <Messages />
        {isLoading && <Loader />}
      </myContext.Provider>
    </div>
  );
}

export default App;
