import { createEffect, createSignal } from "solid-js";
import { INote } from "~/type";

export const [notes, setNotes] = createSignal<Array<INote>>(
  JSON.parse(localStorage.getItem("notes") || "[]")
);

createEffect(() => localStorage.setItem("notes", JSON.stringify(notes())));
