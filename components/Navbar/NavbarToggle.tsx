'use client';
import type { MouseEventHandler, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Image, Button, Logo, Link, LocaleSwitcher, MobileMenu, ProfileMenu } from '..';
import { useToggleMenu } from '@/hooks';
import { useTranslations } from 'next-intl';

type BtnType = 'button' | 'submit';
interface NavbarToggleProps {
  text: string | ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: BtnType;
  disabled?: boolean;
}

export const NavbarMobileToggle = ({ text, className, disabled, onClick, btnType }: NavbarToggleProps) => {
  const { menuRef: mobileMenuRef, isMenuOpen: isMobileMenuOpen, toggleMenu: toggleMobileMenu } = useToggleMenu();
  const t = useTranslations('app');
  return (
    <div>
      <Button text={text} btnType='button' onClick={toggleMobileMenu} className={className} />
      <MobileMenu isMenuOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} menuRef={mobileMenuRef} t={t} />
    </div>
  );
};
