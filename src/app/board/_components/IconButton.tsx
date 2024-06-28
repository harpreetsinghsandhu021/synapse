type Props = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
};

export default function IconButton({
  onClick,
  children,
  isActive,
  disabled,
}: Props) {
  return (
    <button
      className={`button ${isActive ? "button_active" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
