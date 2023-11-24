'use client';
import React, { useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';

import { LanguageItem } from './LanguageItem';
import { Backdrop } from './Backdrop';
import { languages } from '@/types';

interface LangSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  closeModal: () => void;
  currentLocale: string;
}

export const LocaleSwitcher: React.FC<LangSelectionProps> = ({ isOpen, onClose, closeModal, currentLocale }) => {
  const t = useTranslations('app');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  function onLanguageSelect(langCode: string) {
    startTransition(() => {
      router.replace(pathname, { locale: langCode });
      onClose();
    });
  }

  return (
    <div
      className={`fixed z-50 inset-0 flex items-center justify-center transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <Backdrop onClick={closeModal} />
      <article
        className={`fixed z-10 grid transform gap-2 rounded border bg-white px-8 py-8 opacity-100 shadow-lg transition-transform duration-1000 ease-in-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        role='dialog'
        id='language-select'
        title='Language Select'
      >
        <h2>{t('localeSwitcher.title')}</h2>
        <p className=''>{t('localeSwitcher.subTitle')}</p>
        <ul className='flex flex-col gap-3 list-none'>
          {languages.map((language) => (
            <LanguageItem
              key={language.code}
              country={language.country}
              isSelected={language.code === currentLocale}
              name={language.name}
              onClick={() => onLanguageSelect(language.code)}
            />
          ))}
        </ul>
      </article>
    </div>
  );
};
