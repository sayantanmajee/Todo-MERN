import React, { useState, useEffect } from "react";
import "./TodoInput.scss";
import { BsPlusCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

function TodoInput() {
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [clicked, setClicked] = useState(false);

  const API_BASE = "http://localhost:8000";

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

  // useEffect(() => {
  //   addTodo();

  // }, [addTodo]);

  return (
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
            {newTodo.length === 0 && clicked === true &&  (
              <div className="absolute right-1/3 capitalize  text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 p-2 mt-3 rounded-xl select-none"
              >! Please add todos...</div>
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
                setClicked(true)
              }}
            >
              <p className="uppercase select-none text-indigo-600 font-bold ">add task</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoInput;
