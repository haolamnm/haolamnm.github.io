import { SearchIcon } from "@lib/icons";

interface SearchInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative max-w-md">
      <div className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-zinc-500">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="glass-card w-full rounded-xl border-white/10 bg-white/5 py-3 pr-4 pl-12 text-white placeholder:text-zinc-500 focus:border-white/20 focus:outline-none"
      />
    </div>
  );
}
