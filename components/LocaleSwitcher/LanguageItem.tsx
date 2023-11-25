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
        isSelected ? `shadow-brand-shadow-selected border-brand-primary bg-blue-300` : `shadow-brand-shadow border-current`
      }flex cursor-pointer rounded border p-3 visited:bg-brand-bg hover:bg-brand-bg focus:bg-brand-bg`}
      onClick={onClick}
    >
      <p>
        {country} - {name}
      </p>
    </li>
  );
}
