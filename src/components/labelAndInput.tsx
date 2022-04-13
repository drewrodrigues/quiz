export function LabelAndInput({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string | undefined;
}) {
  return (
    <label className="flex flex-col">
      <span className="text-[14px]">{label}</span>
      <input
        onChange={(e: any) => {
          onChange(e.target.value);
        }}
        value={value}
        className="rounded-half p-[10px] border mb-[10px]"
      />
    </label>
  );
}
