import React, { useEffect, useState } from "react";
import "./TodoItems.scss";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsPlusCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

let port = process.env.PORT;
if (port == null || port === "") {
    port = 8000;
}

// const API_BASE = `http://localhost:${port}`;
const API_BASE = "https://todo-list-client-heroku.herokuapp.com";

function TodoItems() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [clicked, setClicked] = useState(false);

  const getTodos = async () => {
    await fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todos/complete/" + id).then((res) =>
      res.json()
    );
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const addTodo = async (e) => {
    newTodo.length !== 0 &&
      (await fetch(API_BASE + "/todos/new", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
      }).then((res) => res.json()));

    setNewTodo("");
    setClicked(false);
  };

  const deletTodo = async (id) => {
    const data = await fetch(API_BASE + "/todos/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));

    console.log(data);
  };

  useEffect(() => {
    getTodos();
    console.log(todos);
  }, [clicked]);

  return (
    <div className=" flex flex-col justify-center items-center p-4">
      {todos.length === 0 ? (
        <div className="bg-gray-500 flex rounded-xl py-2 w-full sm:w-6/12 items-center justify-center uppercase ">
          <p className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-yellow-400 to-green-600 rounded-xl select-none tracking-wider">
            add some todos
          </p>
        </div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="px-1 py-1 m-1 todo flex  relative justify-between items-center space-x-3 bg-gray-500 rounded-xl min-w-full sm:min-w-fit sm:flex-auto sm:w-1/2  sm:space-x-6 select-none"
          >
            <div
              onClick={() => completeTodo(todo._id)}
              className="flex flex-row items-center justify-around cursor-pointer"
            >
              <div className="checkbox pl-5 pr-3">
                {todo.complete ? (
                  <div className="flex flex-row items-center justify-center">
                    <MdCheckBox size={30} className="text-green-400" />
                  </div>
                ) : (
                  <MdCheckBoxOutlineBlank size={30} className="text-blue-400" />
                )}
              </div>
              <div
                className={`text text-center font-bold  ${
                  todo.complete ? "line-through text-gray-300" : ""
                }`}
              >
                {todo.text}
              </div>

              <div></div>
            </div>
            <div
              className="flex flex-row justify-center items-center delete-todo pr-5"
              onClick={() => deletTodo(todo._id)}
            >
              {todo.complete && (
                <p className="pr-6 uppercase text-green-500 font-extrabold tracking-wider">
                  Done
                </p>
              )}
              <div className=" cursor-pointer transition delay-75 ease-in-out hover:scale-110">
              <RiDeleteBinFill size={30} className="text-red-400" />
              </div>
              
            </div>
          </div>
        ))
      )}

      <div className="relative flex flex-row justify-center items-center">
        <div
          className="fixed bottom-14 right-14 text-5xl transition ease-out duration-75 hover:scale-125 active:scale-90 active:text-cyan-400 cursor-pointer hover:text-cyan-200 sm:right-1/2 "
          onClick={() =>
            popupActive === true ? setPopupActive(false) : setPopupActive(true)
          }
        >
          <BsPlusCircleFill />
        </div>

        {popupActive && (
          <div className="flex flex-col fixed bottom-10 p-2 pb-4 rounded-md transition-all ease-out delay-100 justify-center item center bg-gray-200 w-full sm:w-1/2 sm:left-auto">
            <div className="flex justify-end items-center pb-7 text-blue-500 ">
              {newTodo.length === 0 && clicked === true && (
                <div className="absolute right-1/3 capitalize  text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-2 mt-3 rounded-xl select-none">
                  ! Please add todos...
                </div>
              )}

              <TiDelete
                className="cursor-pointer transition ease-out hover:scale-110 active:scale-75"
                size={40}
                onClick={() => setPopupActive(false)}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                className="w-10/12 rounded-md shadow-xl text-black h-11 p-3 capitalize appearance-none border-none outline-none transition ease-out delay-150 focus:bg-gray-300 mb-7"
                onChange={(e) => setNewTodo(e.target.value)}
                autoFocus={true}
                value={newTodo}
                placeholder="Your Task..."
              />

              <div
                className="flex flex-center items-center justify-center bg-gradient-to-r from-amber-300 to-lime-400 p-2 px-5 rounded-md shadow-lg cursor-pointer transform duration-100 ease-out active:scale-90"
                onClick={() => {
                  addTodo();
                  setClicked(true);
                }}
              >
                <p className="uppercase select-none text-indigo-600 font-bold ">
                  add task
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoItems;
