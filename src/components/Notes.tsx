import classNames from "classnames";
import dayjs from "dayjs";
import { Link, useLocation } from "solid-app-router";
import { Accessor, createMemo, For } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { INote } from "~/type";

export default function Notes({ notes }: { notes: Accessor<INote[]> }) {
  const location = useLocation();
  const id = createMemo(() => {
    return location.pathname.split("/")[1];
  });
  return (
    <ul class="px-4 my-4 flex flex-col gap-4">
      <TransitionGroup
        onBeforeEnter={(el) => {
          el.classList.add("scale-0");
        }}
        onEnter={(el, done) => {
          el.classList.remove("scale-0");
          el.classList.add("scale-100");
          setTimeout(done, 300);
        }}
        onExit={(el, done) => {
          el.classList.remove("scale-100");
          el.classList.add("scale-0");
          setTimeout(done, 300);
        }}
      >
        <For each={notes()}>
          {(note) => {
            const day = dayjs(note.lastUpdated);
            let date = "";
            if (day.isSame(dayjs(), "day")) {
              date = day.format("hh:mm A");
            } else {
              date = day.format("DD/MM/YYYY");
            }
            return (
              <li
                class={classNames(
                  "p-4 rounded-md relative duration-300",
                  note.id === id() ? "bg-neutral-200" : "bg-neutral-100"
                )}
              >
                <h3 class="font-medium text-xl">{note.title}</h3>
                <p class="text-xs text-neutral-600">{date}</p>
                <Link
                  href={`/${note.id}`}
                  class="absolute inset-0 rounded-md"
                ></Link>
              </li>
            );
          }}
        </For>
      </TransitionGroup>
    </ul>
  );
}
