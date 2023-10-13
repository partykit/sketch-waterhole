export default function Submit(props: {
  children: React.ReactNode;
  disabled: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={props.disabled}
      className="grow-0 border-4 border-t-stone-300 border-l-stone-300 border-b-stone-600 border-r-stone-600 hover:border-t-stone-600 hover:border-l-stone-600 hover:border-b-stone-300 hover:border-r-stone-300 bg-stone-400 hover:bg-stone-500 disabled:bg-stone-400 disabled:border-stone-400 disabled:text-stone-600 px-2 py-1 whitespace-nowrap"
    >
      {props.children}
    </button>
  );
}
