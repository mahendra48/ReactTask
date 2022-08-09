import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import {
  Paper,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000080",
    color: "#000080",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ADD8E6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [search, setsearch] = useState("");
  const [short, setshort] = useState(false);

  const paperStyle = {
    padding: 20,
    width: 400,
    margin: "70px auto",
  };

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
      <Paper elevation={10} style={paperStyle}>
        <h3>Seraching and Shorting on UserName</h3>
        <Grid
          container
          spacing={0}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid container spacing={4} columns={16}>
            <Grid item xs={8}>
              <TextField
                label="Serach..."
                variant="filled"
                color="secondary"
                size="small"
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                size="large"
                onClick={(e) => changeText()}
              >
                UserName
                {short ? "▲" : "▼"}
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableBody>
                {users
                  .filter((user) => {
                    if (search === "") {
                      return user;
                    } else if (
                      user.username.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return user;
                    } else return false;
                  })
                  .sort((a, b) => {
                    if (short) {
                      if (a.username > b.username) {
                        return 1;
                      } else return -1;
                    } else {
                      if (a.username < b.username) {
                        return 1;
                      } else return -1;
                    }
                  })
                  .map((user) => (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {user.username}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Paper>
    </>
  );
}
