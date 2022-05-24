import { Route, RouteDataFunc, Routes } from "solid-app-router";
import { Component, createEffect, createMemo } from "solid-js";
import EditNote from "./components/EditNote";
import Note from "./components/Note";
import SideBar from "./components/SideBar";
import { notes } from "./store/notes";

const NoteData: RouteDataFunc = ({ data, location, navigate, params }) => {
  const note = createMemo(() => notes().find((note) => note.id === params.id));
  createEffect(() => {
    if (!note()) navigate("/");
  });
  return note;
};

const App: Component = () => {
  return (
    <div class="flex h-screen max-h-screen bg-neutral-200">
      <SideBar />
      <Routes>
        <Route
          path="/"
          element={
            <div class="flex-grow h-screen flex justify-center items-center font-medium text-lg">
              Click a note on the left to view something! 🥺
            </div>
          }
        />
        <Route path="/add" element={<EditNote />} />
        <Route path="/:id" element={<Note />} data={NoteData} />
        <Route path="/:id/edit" element={<EditNote />} data={NoteData} />
      </Routes>
    </div>
  );
};

export default App;
