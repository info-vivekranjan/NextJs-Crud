import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/Todos.module.css";
import SingleTodo from "../../components/todo/SingleTodo";

export default function Todos({ task }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [todos, setTodos] = useState(task);
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };
  const payload = {
    title: query,
    status: false,
  };

  async function fetchTodos() {
    const req = await fetch(
      filter !== ""
        ? `https://json-server-mocker-sm2-196.herokuapp.com/tasks?title=${filter}`
        : `https://json-server-mocker-sm2-196.herokuapp.com/tasks`
    );
    const data = await req.json();
    refreshData();
    setTodos(data);
  }

  const handelAdd = () => {
    return axios
      .post(`https://json-server-mocker-sm2-196.herokuapp.com/tasks`, payload)
      .then((response) => {
        refreshData();
        fetchTodos();
      })
      .catch((error) => {});
  };

  const handelToggle = (id, status) => {
    return axios
      .patch(`https://json-server-mocker-sm2-196.herokuapp.com/tasks/${id}`, {
        status: !status,
      })
      .then((response) => {
        refreshData();
        fetchTodos();
      })
      .catch((error) => {});
  };

  const handelDelete = (id) => {
    return axios
      .delete(`https://json-server-mocker-sm2-196.herokuapp.com/tasks/${id}`)
      .then((response) => {
        refreshData();
        fetchTodos();
      })
      .catch((error) => {});
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ec3266",
      },
      secondary: {
        main: "#11cb5f",
      },
    },
  });
  return (
    <Box className={styles.globalCont}>
      <Head>
        <title>todos</title>
        <meta name="description" content="todos list" />
      </Head>
      <Box component="h1" style={{ textAlign: "center" }}>
        To Do List
      </Box>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ display: "flex", alignItems: "flex-end", marginBottom: "50px" }}
        >
          <TextField
            id="input-with-sx"
            label="Search Todo"
            variant="standard"
            onChange={handleFilter}
            value={filter}
          />
          <SearchIcon
            sx={{ mr: 1, my: 0.5, cursor: "pointer" }}
            onClick={fetchTodos}
          />
        </Box>
      </ThemeProvider>
      <Grid container>
        <Grid item xs={10}>
          <ThemeProvider theme={theme}>
            <TextField
              placeholder="Enter task"
              variant="standard"
              value={query}
              className={styles.inputBox}
              onChange={(e) => setQuery(e.target.value)}
            />
          </ThemeProvider>
        </Grid>
        <Grid item xs={2}>
          <ThemeProvider theme={theme}>
            <Fab size="large" color="primary" onClick={handelAdd}>
              <AddIcon fonSize="inherit" />
            </Fab>
          </ThemeProvider>
        </Grid>
      </Grid>
      <>
        {todos.map((item) => {
          return (
            <SingleTodo
              key={item?.id}
              item={item}
              theme={theme}
              handelToggle={handelToggle}
              handelDelete={handelDelete}
              setTodos={setTodos}
              fetchTodos={fetchTodos}
            />
          );
        })}
      </>
    </Box>
  );
}

export async function getServerSideProps() {
  const req = await fetch(
    `https://json-server-mocker-sm2-196.herokuapp.com/tasks`
  );
  const data = await req.json();

  return {
    props: { task: data },
  };
}
