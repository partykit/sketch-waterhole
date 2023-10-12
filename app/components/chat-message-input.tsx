import { useState } from "react";

export default function ChatForm({
  sendMessage,
}: {
  sendMessage: (name: string) => void;
}) {
  const [messageInput, setMessageInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageInput) return;
    sendMessage(messageInput);
    setMessageInput("");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-start items-center gap-4"
    >
      <input
        type="text"
        placeholder="Enter a message..."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        className="border-1 border-stone-300 p-2"
      />
      <button
        type="submit"
        className="border-1 border-stone-300 bg-white hover:bg-stone-200 p-2 whitespace-nowrap"
      >
        Send
      </button>
    </form>
  );
}
