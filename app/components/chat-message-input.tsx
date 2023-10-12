import { useState } from "react";
import TextInput from "./form-text-input";
import Submit from "./form-submit";

export default function ChatMessageInput({
  sendMessage,
  disabled,
}: {
  sendMessage: (name: string) => void;
  disabled: boolean;
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
      className="flex justify-start items-center gap-2 font-mono text-base"
    >
      <TextInput
        placeholder="Enter a message..."
        value={messageInput}
        onChange={setMessageInput}
        disabled={disabled}
      />
      <Submit disabled={disabled}>Send</Submit>
    </form>
  );
}
