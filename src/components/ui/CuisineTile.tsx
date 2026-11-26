export function CuisineTile({
  label,
  selected,
  emoji,
  onClick,
}: {
  label: string;
  selected: boolean;
  emoji: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className={selected ? "cuisine-tile ui-cuisine on" : "cuisine-tile ui-cuisine"}
      onClick={onClick}
      type="button"
    >
      <span aria-hidden="true" className="ui-cuisine__emoji">
        {emoji}
      </span>
      <small>{label}</small>
    </button>
  );
}

