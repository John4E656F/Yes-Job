import React from 'react';
import { getTranslations } from 'next-intl/server';

export default async function TermsOfServicesPage() {
  const t = await getTranslations('policies.TOS');
  return (
    <>
      <section className='w-full flex flex-col items-center px-10 justify-center py-10 bg-brand-lightbg'>
        <div className=' w-full flex flex-col justify-center text-center items-center '>
          <p className='text-sm'>{t('date')} 17/12/2023</p>
          <h1>{t('title')}</h1>
          <p>{t('subTitle')}</p>
        </div>
      </section>
      <section className='w-full flex flex-col items-center justify-center py-4 bg-white'>
        <div className='w-1/2 flex flex-col justify-center gap-5 mt-10 '>
          <div className='flex flex-col gap-2'>
            <h2 className='text-left'>{t('introTitle')}</h2>
            <p>{t('introText')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-left'>{t('terms.title')}</h3>
            <p>
              1. <b> {t('terms.paragraphBold')} </b>
              {t('terms.paragraph')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('use.title')}</h3>
            <p>
              2. <b>{t('use.paragraphBold')} </b> {t('use.listItem5')}
            </p>
            <ul>
              <li>{t('use.listItem1')}</li>
              <li>{t('use.listItem2')}</li>
              <li>{t('use.listItem3')}</li>
              <li>{t('use.listItem4')}</li>
              <li>{t('use.listItem5')}</li>
            </ul>
            <p>
              3. <b> {t('use.paragraph1Bold')} </b> {t('use.paragraph1')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('disclaimer.title')}</h3>
            <p>
              4. <b>{t('disclaimer.paragraphBold')} </b> {t('disclaimer.paragraph')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('disclaimer.title1')}</h3>
            <p>
              5. <b> {t('disclaimer.paragraph1Bold')} </b> {t('disclaimer.paragraph1')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('disclaimer.title2')}</h3>
            <p>
              6. <b> {t('disclaimer.paragraph2Bold')} </b> {t('disclaimer.paragraph2')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('links.title')}</h3>
            <p>
              7. <b> {t('links.paragraphBold')} </b> {t('links.paragraph')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('links.title1')}</h3>
            <p>
              8. <b> {t('links.paragraph1Bold')} </b> {t('links.paragraph1')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('law.title')}</h3>
            <p>
              9. <b> {t('law.paragraphBold')} </b> {t('law.paragraph')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('services.title')}</h3>
            <p>
              10. <b> {t('services.paragraphBold')} </b> {t('services.paragraph')}
            </p>
            <p>
              11. <b> {t('services.paragraph1Bold')} </b> {t('services.paragraph1')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('variations.title')}</h3>
            <p>
              12. <b> {t('variations.paragraphBold')} </b> {t('variations.paragraph')}
            </p>
            <p>
              13.<b> {t('variations.paragraph1Bold')} </b> {t('variations.paragraph1')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('ownership.title')}</h3>
            <p>
              14.<b> {t('ownership.paragraphBold')} </b> {t('ownership.paragraph')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('limit.title')}</h3>
            <p>
              15. <b> {t('limit.paragraphBold')} </b> {t('limit.paragraph')}
            </p>
            <p>
              16. <b> {t('limit.paragraph1Bold')} </b> {t('limit.paragraph1')}
            </p>
            <p>
              17. <b> {t('limit.paragraph2Bold')} </b> {t('limit.paragraph2')}
            </p>
            <p>
              18. <b> {t('limit.paragraph3Bold')} </b> {t('limit.paragraph3')}
            </p>
            <p>
              19. <b> {t('limit.paragraph4Bold')} </b> {t('limit.paragraph4')}
            </p>
            <p>
              20. <b> {t('limit.paragraph5Bold')} </b> {t('limit.paragraph5')}
            </p>
            <p>
              21. <b> {t('limit.paragraph6Bold')} </b> {t('limit.paragraph6')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
