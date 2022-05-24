import cuid from "cuid";
import { marked } from "marked";
import { useNavigate, useRouteData } from "solid-app-router";
import { Accessor, createSignal, onMount, Show } from "solid-js";
import { setNotes } from "~/store/notes";
import { INote } from "~/type";
import ContentLayout from "./ContentLayout";

function EditNote({ isAdd = false }: { isAdd?: boolean }) {
  const note = useRouteData<Accessor<INote | undefined>>();
  const [title, setTitle] = createSignal(
    !isAdd ? note()?.title || "Untitled" : "Untitled"
  );
  const [body, setBody] = createSignal(!isAdd ? note()?.body || "" : "");
  const navigate = useNavigate();
  let ref: HTMLInputElement | undefined = undefined;

  onMount(() => {
    if (!note) ref?.select();
  });
  return (
    <ContentLayout class="flex gap-8">
      <div class="flex flex-col w-96 max-w-[50%] gap-4 flex-shrink-0">
        <input
          class="w-full border border-neutral-300 focus:outline-none p-3 rounded focus:ring-1 focus:ring-sky-400"
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
          autofocus
          ref={ref}
        />
        <textarea
          class="w-full flex-grow border border-neutral-300 focus:outline-none p-3 rounded focus:ring-1 focus:ring-sky-400 resize-none"
          value={body()}
          onInput={(e) => setBody(e.currentTarget.value)}
        />
      </div>
      <div class="flex-grow overflow-y-auto">
        <div class="flex justify-between items-center">
          <div class="bg-sky-100 px-3 py-1 rounded-full text-sky-500 font-bold text-sm">
            PREVIEW
          </div>
          <div class="flex gap-4">
            <button
              class="flex text-white font-bold bg-sky-600 hover:bg-sky-500 px-3 py-1 text-sm rounded-full items-center gap-1 duration-200"
              onClick={() => {
                const newNote = {
                  id: !isAdd ? note()?.id || "" : cuid(),
                  body: body(),
                  title: title(),
                  lastUpdated: new Date(),
                };
                setNotes((notes) => [
                  newNote,
                  ...(note ? notes.filter((n) => n.id !== note()?.id) : notes),
                ]);
                navigate(`/${newNote.id}`);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              DONE
            </button>
            <Show when={note}>
              <button
                class="flex font-bold bg-white text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-3 py-1 text-sm rounded-full items-center gap-1 duration-200"
                onClick={() => {
                  setNotes((notes) => notes.filter((n) => n.id !== note()?.id));
                  navigate("/");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                DELETE
              </button>
            </Show>
          </div>
        </div>
        <h1 class="font-bold text-3xl my-4">{title()}</h1>
        <div
          innerHTML={marked(body())}
          class="prose my-12 prose-headings:font-medium"
        ></div>
      </div>
    </ContentLayout>
  );
}

export default EditNote;
