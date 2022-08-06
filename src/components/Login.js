import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formSubmit = async (e) => {
    console.log("here2");
    e.preventDefault();
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });
      const responseData = response.data;
      const token = responseData.token;
      console.log("token is", token);
      if (token) {
        window.location.href = "/users";
      }
    } catch (error) {
      setError("Invalid username or password");
    }
    console.log("here");
  };

  return (
    <div className="App">
      <form
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={formSubmit}
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        {error && <p>{error}</p>}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
