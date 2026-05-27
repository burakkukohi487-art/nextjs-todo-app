"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const initialTodos: Todo[] = [
  { id: 1, text: "牛乳を買う", done: false },
  { id: 2, text: "Reactを勉強する", done: false },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [inputText, setInputText] = useState("");

  // タスクを追加する関数
  const addTodo = () => {
    // trim：スぺース、改行を取り除くメソッド
    if (inputText.trim() === "") return      // 空文字は追加しない
    const newTodo: Todo = {
      id: Date.now(),        // 現在時刻をIDとして使う
      text: inputText.trim(),
      done: false,
    };
    setTodos([...todos, newTodo]);
    setInputText("");        // 入力欄をリセット
  }

  // タスクを削除する関数
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // タスクの完了・未完了を切り替える関数
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ToDoリスト</h1>

        {/* 入力フォーム */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="タスクを入力..."
            className="flex-1 border border-gary-300 rounded-lg px-4 py-2 text-sm
             outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white
             text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            追加
          </button>
        </div>

        {/* タスク一覧 */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 accent-blue-500" />
              <span className={`flex-1 text-sm ${todo.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                {todo.text}
              </span>
              <button
                // アロー関数で包まないと、画面が描画された瞬間に実行されるので注意
                onClick={() => deleteTodo(todo.id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors">
                削除
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};