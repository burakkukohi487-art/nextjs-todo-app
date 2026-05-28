"use client";

import dynamic from "next/dynamic";

// ssr: falseでSSR無効化
// そうすることで、localStorageを使うTodoAppをブラウザ専用コンポーネントとして読み込む
const TodoApp = dynamic(() => import("./TodoApp"), { ssr: false });

export default function Home() {
  return <TodoApp />;
}