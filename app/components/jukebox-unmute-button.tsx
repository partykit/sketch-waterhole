export default function UnmuteButton(props: { unmute: () => void }) {
  return (
    <div className="absolute z-10 top-2 left-2 flex justify-start items-stretch text-sm font-mono">
      <div className="hidden sm:block p-3 bg-red-400 text-white/80">Muted!</div>
      <button
        className="bg-red-400 hover:bg-red-500 font-4xl z-10 px-1 py-2 cursor-pointer border-4 border-l-red-300 border-t-red-300 border-r-red-600 border-b-red-600 hover:border-l-red-600 hover:border-t-red-600 hover:border-r-red-400 hover:border-b-red-400"
        onClick={() => props.unmute()}
      >
        <span className="px-1 text-white">Tap to enable sound</span>
      </button>
    </div>
  );
}
