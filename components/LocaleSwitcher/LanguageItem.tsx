interface LanguageItemProps {
  country: string;
  name: string;
  onClick: () => void;
  isSelected: boolean;
}

export function LanguageItem({ country, isSelected, name, onClick }: LanguageItemProps) {
  return (
    <li
      role='listitem'
      className={`${
        isSelected ? `border-brand-primary bg-blue-300 shadow-brand-shadow-selected` : `border-current shadow-brand-shadow`
      }flex border rounded px-3 py-3 cursor-pointer visited:bg-brand-bg hover:bg-brand-bg focus:bg-brand-bg`}
      onClick={onClick}
    >
      <p>
        {country} - {name}
      </p>
    </li>
  );
}
