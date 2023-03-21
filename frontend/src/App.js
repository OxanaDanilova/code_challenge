import './App.css';
import Messages from './components/MessagesList/Messages';
import UsersList from './components/UsersList/UsersList';

function App() {
  return (
    <div className="App">
      <UsersList />
      <Messages userId={'6419b8591c7df2f378dea40b'}/>
     
    </div>
  );
}

export default App;
