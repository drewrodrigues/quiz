import React from "react";

export function LabelAndInput({
  label,
  onChange,
  value,
  onRenderInput,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string | undefined;
  onRenderInput?: (
    element: (props: { className?: string }) => React.ReactElement
  ) => React.ReactElement;
}) {
  const Input = ({ className = "" }): React.ReactElement => (
    <input
      onChange={(e: any) => {
        onChange(e.target.value);
      }}
      value={value}
      className={`rounded-half p-[10px] border ${className}`}
    />
  );

  return (
    <label className="flex flex-col w-full mb-[10px]">
      <span className="text-[14px]">{label}</span>
      {onRenderInput ? onRenderInput(Input) : <Input />}
    </label>
  );
}
