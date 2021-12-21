import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Todos.module.css";

export default function Todos({ task }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };
  const payload = {
    title: query,
    status: false,
  };

  const handelAdd = () => {
    return axios
      .post(`https://json-server-mocker-sm2-196.herokuapp.com/tasks`, payload)
      .then((response) => {
        refreshData();
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
      })
      .catch((error) => {});
  };

  const handelDelete = (id) => {
    return axios
      .delete(`https://json-server-mocker-sm2-196.herokuapp.com/tasks/${id}`)
      .then((response) => {
        refreshData();
      })
      .catch((error) => {});
  };

  return (
    <Box className={styles.globalCont}>
      <Head>
        <title>todos</title>
        <meta name="description" content="todos list" />
      </Head>
      <Box component="h1" style={{ textAlign: "center" }}>
        To Do List
      </Box>
      <Grid container>
        <Grid item xs={10}>
          <TextField
            placeholder="Enter task"
            variant="standard"
            value={query}
            className={styles.inputBox}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Fab size="large" color="primary" onClick={handelAdd}>
            <AddIcon fonSize="inherit" />
          </Fab>
        </Grid>
      </Grid>
      <>
        {task.map((item) => {
          return (
            <Box
              key={item.id}
              className={styles.task}
              style={{ borderColor: item.status == true ? "green" : "orange" }}
            >
              <Grid container direction="row" alignItems="center">
                <Grid item xs={6}>
                  <Link href={`todo/${item.id}`}>
                    <a>
                      <h4>{item.title}</h4>
                    </a>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                  <h4
                    style={{
                      color: item.status == true ? "green" : "orange",
                    }}
                  >
                    {item.status ? "Completed" : "Not Completed"}
                  </h4>
                </Grid>
                <Grid item xs={1.5}>
                  <Fab
                    size="small"
                    color="primary"
                    onClick={() => handelDelete(item.id)}
                  >
                    <DeleteIcon fonSize="inherit" />
                  </Fab>
                </Grid>
                <Grid item xs={1.5}>
                  <Fab
                    size="small"
                    color="primary"
                    onClick={() => handelToggle(item.id, item.status)}
                  >
                    <EditIcon fonSize="inherit" />
                  </Fab>
                </Grid>
              </Grid>
            </Box>
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
