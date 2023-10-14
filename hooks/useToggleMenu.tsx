import { useRef, useState, useEffect } from 'react';

type ReturnType = {
  menuRef: React.RefObject<HTMLDivElement>;
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export function useToggleMenu(): ReturnType {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
      toggleMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);

  return { menuRef, isMenuOpen, toggleMenu };
}
