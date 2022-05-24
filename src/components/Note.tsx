import dayjs from "dayjs";
import { marked } from "marked";
import { Link, useRouteData } from "solid-app-router";
import { Accessor, Show } from "solid-js";
import { INote } from "~/type";
import ContentLayout from "./ContentLayout";

function Note() {
  const note = useRouteData<Accessor<INote | undefined>>();

  const day = dayjs(note()?.lastUpdated);
  return (
    <ContentLayout class="overflow-y-auto">
      <Show when={note()}>
        <div class="flex justify-between">
          <p class="text-xs text-neutral-500">
            Last updated on {day.format("D MMM YYYY [at] hh:mm A")}
          </p>
          <Link
            href={`/${note()?.id}/edit`}
            class="flex text-white font-bold bg-sky-600 hover:bg-sky-500 px-3 py-1 text-sm rounded-full items-center gap-1"
          >
            EDIT
          </Link>
        </div>
        <h1 class="font-bold text-3xl my-12">{note()?.title}</h1>
        <div innerHTML={marked(note()?.body || "")} class="prose"></div>
      </Show>
    </ContentLayout>
  );
}

export default Note;
