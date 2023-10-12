interface LanguageItemProps {
  country: string;
  name: string;
  onClick: () => void;
  isSelected: boolean;
}

export function LanguageItem({ country, isSelected, name, onClick }: LanguageItemProps) {
  return (
    <li
      role="select"
      className={`${
        isSelected
          ? `border-brand-primary shadow-brand-shadow-selected`
          : `border-current shadow-brand-shadow`
      } border-2  px-3 py-3 visited:bg-brand-bg hover:bg-brand-bg focus:bg-brand-bg`}
      onClick={onClick}
    >
      <h4>{name}</h4>
      <p>{country}</p>
    </li>
  );
}