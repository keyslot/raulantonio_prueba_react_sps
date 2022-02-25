/**
 * Problems with this file:
 * I couldn't show the user information in the right side.
 */

// Using the hook concept...
import {useState,useEffect} from 'react';
import './App.css';

/**
 * Show more about the user...
 * I don't know how pass the reference of this new div
 *	to another
 */
const showInfo = user => {
	return (
	 <div className="infoUser">
	    <p>She/He is the user {user.id}</p>
	    <p>Contact: {user.email}</p>
	 </div>
     )
}

// I used the example from the oficial doc. page:
// https://reactjs.org/docs/faq-ajax.html
function UserList() {
  const fromThis = "https://reqres.in/api/users";
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [showInfo,setInfo] = useState({});
  useEffect(() => {
    fetch(fromThis)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
	  // I need the data...
          setItems(result.data);
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  // Conexion Error
  if (error) {
    return <div>API Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading users, wait...</div>;
  } else {
    // Printing user info 
    let users = items;
    return (
      <ul> 
      {users.map(user => (
          <li key={user.id} onClick={() => setInfo(showInfo => 
	                            ({showInfo,[user.id]:1}))}> 
	    <img src={user.avatar} alt=" . . . " />
            <p> {[user.first_name," ",user.last_name]}</p>
	    {showInfo[user.id] ? showUser(user) : null}
          </li>
        ))} 
      </ul>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="users">
          {UserList()}
        </div>
	{/* here's the correct point to call showUser by ref */}
      </header>
    </div>
  );
}

export default App;
