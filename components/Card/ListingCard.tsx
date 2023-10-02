import React from 'react';
import { Card, Image, Label } from '..';

export const ListingCard = () => {
  return (
    <Card className='flex flex-col items-center px-1 md:flex-row md:p-2'>
      <Image src='/images/svg/hero.svg' alt='Yes Job' className='w-20 m-5 h-20 md:w-24 md:h-24 object-fill bg-blue-200 rounded-2xl' />
      <div>
        <div className='text-center md:text-left'>
          <h6 className='text-base font-semibold md:text-lg'>Etudiant Serveur en salle - The Huggy’s Bar</h6>
          <p className='text-base md:text-lg'>The Huggy’s Bar</p>
        </div>
        <div className='flex flex-wrap gap-2.5 py-4 md:py-1 justify-center'>
          <Label text='1000 Bruxelles' type='location' />
          <Label text='1 800 € par mois' type='salary' />
          <Label text='Temps plein' type='WorkDuration' />
          <Label text='CDD' type='ContractDuration' />
          <Label text="Pas d'expérience requise" type='noExp' className='block md:hidden lg:block' />
        </div>
      </div>
    </Card>
  );
};
