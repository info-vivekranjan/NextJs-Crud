import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Todos({ task }) {
  const [query, setQuery] = useState("");

  const payload = {
    title: query,
    status: false,
  };

  const handelAdd = () => {
    return axios
      .post(`https://json-server-mocker-sm2-196.herokuapp.com/tasks`, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelToggle = (id, status) => {
    return axios
      .patch(`https://json-server-mocker-sm2-196.herokuapp.com/tasks/${id}`, {
        status: !status,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handelDelete = (id) => {
    return axios
      .delete(`https://json-server-mocker-sm2-196.herokuapp.com/tasks/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="globalCont">
      <style jsx global>{`
        .globalCont {
          width: 20%;
          margin: auto;
        }
        .task {
          border: 1px solid rgba(0, 118, 255, 0.9);
          color: rgba(0, 118, 255, 0.9);
          padding: 2px;
          margin:10px 0px;
        }
        .inputTodo {
          padding:20px;
          font-size:17px;

        }
      `}</style>
      <input
        placeholder="Enter task"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="inputTodo"
      />
      <button onClick={handelAdd}>Add</button>
      <>
        {task.map((item) => {
          return (
            <div key={item.id} className="task">
              <Link href={`todo/${item.id}`}>
                <a>
                  <h1>{item.title}</h1>
                </a>
              </Link>
              <h3>{item.status ? "Completed" : "Not Completed"}</h3>
              <button onClick={() => handelDelete(item.id)}>Delete</button>
              <button onClick={() => handelToggle(item.id, item.status)}>
                Toggle
              </button>
            </div>
          );
        })}
      </>
    </div>
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
