interface BackdropProps {
  onClick: () => void;
}

export function Backdrop({ onClick }: BackdropProps) {
  return <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClick} />;
}
