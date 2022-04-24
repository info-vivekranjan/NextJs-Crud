import { Box, Grid, Tooltip } from "@mui/material";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";

import styles from "../../styles/Todos.module.css";

const SingleTodo = (props) => {
  const { item, theme, handelToggle, handelDelete, fetchTodos } = props;
  const [editTodo, setEditTodo] = useState(false);
  const [editQuery, setEditQuery] = useState(item?.title);
  const handelEditQuery = (e) => {
    setEditQuery(e.target.value);
  };
  const handleEditTodo = () => {
    setEditTodo(true);
  };
  const onClickEdit = (e, id) => {
    if (e.key === "Enter") {
      return axios
        .patch(`https://json-server-mocker-sm2-196.herokuapp.com/tasks/${id}`, {
          title: editQuery,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {});
    }
  };
  return (
    <Box
      key={item?.id}
      className={styles.task}
      style={{ borderColor: item.status == true ? "green" : "orange" }}
    >
      <Grid container direction="row" alignItems="center">
        <Grid item xs={6}>
          {editTodo && item?.status == false ? (
            <ThemeProvider theme={theme}>
              <TextField
                id="single-standard-basic"
                variant="standard"
                sx={{ width: "280px" }}
                value={editQuery}
                onChange={handelEditQuery}
                onKeyDown={(e) => onClickEdit(e, item?.id)}
              />
            </ThemeProvider>
          ) : (
            <Link href={`todo/${item.id}`}>
              <a>
                <h4 style={{ color: "primary" }}>{item.title}</h4>
              </a>
            </Link>
          )}
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
        <Grid item xs={1}>
          <ThemeProvider theme={theme}>
            <Tooltip title="delete" placement="top">
              <Fab
                size="small"
                color="primary"
                onClick={() => handelDelete(item.id)}
              >
                <DeleteIcon fonSize="inherit" />
              </Fab>
            </Tooltip>
          </ThemeProvider>
        </Grid>
        <Grid item xs={1}>
          <ThemeProvider theme={theme}>
            <Tooltip title="toggle-status" placement="top">
              <Fab
                size="small"
                color="primary"
                onClick={() => handelToggle(item.id, item.status)}
              >
                <CheckIcon fonSize="inherit" />
              </Fab>
            </Tooltip>
          </ThemeProvider>
        </Grid>
        <Grid item xs={1}>
          <ThemeProvider theme={theme}>
            <Tooltip title="edit" placement="top">
              <Fab size="small" color="primary" onClick={handleEditTodo}>
                <EditIcon fonSize="inherit" />
              </Fab>
            </Tooltip>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleTodo;
