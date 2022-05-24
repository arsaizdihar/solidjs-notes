import classNames from "classnames";
import { Component, JSX } from "solid-js";

const ContentLayout: Component<{ children: JSX.Element; class?: string }> = ({
  children,
  ...p
}) => {
  return (
    <div class="flex-grow h-screen p-4">
      <main
        class={classNames(
          "bg-white w-full h-full rounded-lg shadow-lg p-4",
          p.class
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default ContentLayout;
