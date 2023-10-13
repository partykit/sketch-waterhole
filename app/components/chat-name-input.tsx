import { useState } from "react";
import TextInput from "./form-text-input";
import Submit from "./form-submit";

export default function ChatNameInput({
  setName,
}: {
  setName: (name: string) => void;
}) {
  const [nameInput, setNameInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameInput) return;
    setName(nameInput);
    console.log(nameInput);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute w-full bottom-0 left-0 p-2 z-10 flex justify-stretch items-center gap-2 font-mono text-base"
    >
      <TextInput
        placeholder="Enter name to see chat"
        value={nameInput}
        onChange={setNameInput}
        disabled={false}
      />
      <Submit disabled={false}>That’s me</Submit>
    </form>
  );
}
