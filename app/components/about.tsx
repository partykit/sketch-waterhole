export default function About() {
  return (
    <div className="absolute z-10 top-2 left-2 flex justify-start items-stretch text-sm font-mono">
      <button className="bg-cyan-400 hover:bg-cyan-500 font-4xl z-10 px-1 py-2 cursor-pointer border-4 border-l-red-300 border-t-red-300 border-r-red-600 border-b-red-600 hover:border-l-red-600 hover:border-t-red-600 hover:border-r-red-400 hover:border-b-red-400">
        <span className="px-1 text-white">What is this?</span>
      </button>
    </div>
  );
}
