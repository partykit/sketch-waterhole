import { useState } from "react";

export default function ChatNameForm({
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
      className="flex justify-start items-center gap-4"
    >
      <input
        type="text"
        placeholder="Enter a name to chat..."
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        className="border-1 border-stone-300 p-2"
      />
      <button
        type="submit"
        className="border-1 border-stone-300 bg-white hover:bg-stone-200 p-2 whitespace-nowrap"
      >
        That’s me
      </button>
    </form>
  );
}
