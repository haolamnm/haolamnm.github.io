import { SearchIcon } from "@lib/icons";

interface SearchInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="relative max-w-md">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-zinc-500 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 glass-card bg-white/5 border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20"
      />
    </div>
  );
}
