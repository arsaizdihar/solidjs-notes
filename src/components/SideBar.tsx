import { debounce } from "@solid-primitives/scheduled";
import { Link } from "solid-app-router";
import { createMemo, createSignal } from "solid-js";
import SolidImage from "~/assets/solid.png";
import { notes } from "~/store/notes";
import Notes from "./Notes";

function SideBar() {
  const [search, setSearch] = createSignal("");
  const filteredNotes = createMemo(() =>
    notes().filter((note) =>
      note.title.toLowerCase().includes(search().toLowerCase())
    )
  );
  const trigger = debounce((text: string) => setSearch(text), 300);
  return (
    <div class="h-full border-r w-[30%] min-w-[250px] max-w-[350px] overflow-y-auto flex-shrink-0 bg-white">
      <Link href="/asd" class="flex p-4 items-center gap-4">
        <img src={SolidImage} height={30} width={30} />
        <h1 class="font-medium text-xl">Solid.js Notes</h1>
      </Link>
      <div class="flex px-4 gap-2 items-center">
        <input
          type="text"
          class="rounded-full border px-3 py-2 focus:outline-none text-sm focus:ring-1 focus:ring-sky-500"
          placeholder="Search"
          onInput={(e) => {
            trigger(e.currentTarget.value);
          }}
        />
        <Link
          href="/add"
          class="rounded-full bg-sky-500 hover:bg-sky-400 px-3 py-1 text-white font-medium flex-grow block text-center"
        >
          Add
        </Link>
      </div>
      <Notes notes={filteredNotes} />
    </div>
  );
}

export default SideBar;
