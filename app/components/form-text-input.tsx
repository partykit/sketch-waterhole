export default function TextInput(props: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      disabled={props.disabled}
      className="p-1 border-2 border-t-stone-600 border-l-stone-600 border-b-stone-300 border-r-stone-300 disabled:bg-stone-300 disabled:border-stone-200 disabled:text-stone-400"
    />
  );
}
