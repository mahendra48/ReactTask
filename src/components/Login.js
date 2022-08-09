import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const paperStyle = {
    padding: 20,
    width: 400,
    margin: "70px auto",
  };

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
  console.log(error);

  return (
    <>
      <div style={{ padding: 30 }}>
        <Paper elevation={10} style={paperStyle}>
          <h1>Login</h1>
          <form onSubmit={formSubmit}>
            <Grid
              container
              spacing={3}
              direction={"column"}
              justify={"center"}
              alignItems={"center"}
            >
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type={"password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                ></TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  {" "}
                  Login{" "}
                </Button>
              </Grid>
            </Grid>
            {error && <p>{error}</p>}
          </form>
        </Paper>
      </div>
    </>
  );
}
