export default function AboutButton(props: {
  showAbout: boolean;
  setShowAbout: (show: boolean) => void;
}) {
  const handleClick = () => {
    props.setShowAbout(true);
  };

  return (
    <button
      className="font-mono border-4 border-t-stone-300 border-l-stone-300 border-b-stone-600 border-r-stone-600 hover:border-t-stone-600 hover:border-l-stone-600 hover:border-b-stone-300 hover:border-r-stone-300 bg-stone-400 hover:bg-stone-500 disabled:bg-stone-400 disabled:border-stone-400 disabled:text-stone-600 px-2 py-1 whitespace-nowrap"
      onClick={handleClick}
      disabled={props.showAbout}
    >
      What is this?
    </button>
  );
}
