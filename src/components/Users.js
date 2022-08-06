import axios from "axios";
import { useEffect, useState } from "react";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [search, setsearch] = useState("");
  const [short, setshort] = useState(false);
  const getData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/users");
      const responseData = response.data;
      setUsers(responseData);
      console.log(responseData);
    } catch (error) {
      setError("Error while getting users");
    }
  };
  console.log(error);

  useEffect(() => {
    getData();
  }, []);
  const changeText = () => {
    setshort(!short);
  };

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            placeholder="Search...."
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          ></input>
        </div>
        <div className="App">
          <table>
            <thead>
              <th>
                <button onClick={(e) => changeText()}>
                  UserName
                  {short ? "▼" : "▲"}
                </button>
              </th>
            </thead>
          </table>
          {users
            .filter((user) => {
              if (search === "") {
                return user;
              } else if (
                user.username.toLowerCase().includes(search.toLowerCase())
              ) {
                return user;
              }
            })
            .sort((a, b) => short === (a.username < b.username ? 1 : -1))
            .map((user) => (
              <p>{user.username}</p>
            ))}
        </div>
      </div>
    </>
  );
}
