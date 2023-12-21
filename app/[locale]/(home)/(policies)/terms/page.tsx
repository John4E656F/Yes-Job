import React from 'react';
import { getTranslations } from 'next-intl/server';

export default async function TermsOfServicesPage() {
  const t = await getTranslations('policies');
  return (
    <>
      <section className='w-full flex flex-col items-center px-10 justify-center py-10 bg-brand-lightbg'>
        <div className=' w-full flex flex-col justify-center text-center items-center '>
          <p className='text-sm'>{t('TOS.date')} 17/12/2023</p>
          <h1>{t('TOS.title')}</h1>
          <p>{t('TOS.subTitle')}</p>
        </div>
      </section>
      <section className='w-full flex flex-col items-center justify-center py-4 bg-white'>
        <div className='w-1/2 flex flex-col justify-center gap-5 mt-10 '>
          <div className='flex flex-col gap-2'>
            <h2 className='text-left'>{t('TOS.introTitle')}</h2>
            <p>{t('TOS.introTitle')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-left'>{t('TOS.detailsTitle')}</h3>
            <p>
              1. <b> {t('TOS.detailsBold')} </b>
              {t('TOS.detailsText')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details1Title')}</h3>
            <p>
              2. <b>{t('TOS.details1Bold')} </b> {t('TOS.details1Text')}
            </p>
            <ul>
              <li>{t('TOS.details1Li')}</li>
              <li>{t('TOS.details1Li1')}</li>
              <li>{t('TOS.details1Li2')}</li>
              <li>{t('TOS.details1Li3')}</li>
              <li>{t('TOS.details1Li4')}</li>
            </ul>
            <p>
              3. <b> {t('TOS.details1Title1')} </b> {t('TOS.details1Text1')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details2Title')}</h3>
            <p>
              4. <b>{t('TOS.details2Bold')} </b> {t('TOS.details2Text')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details3Title')}</h3>
            <p>
              5. <b> {t('TOS.details3Bold')} </b> {t('TOS.details3Text')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details4Title')}</h3>
            <p>
              6. <b> {t('TOS.details4Bold')} </b> {t('TOS.details4Text')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details5Title')}</h3>
            <p>
              7. <b> {t('TOS.details5Bold')} </b> {t('TOS.details5Text')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details6Title')}</h3>
            <p>
              8. <b> {t('TOS.details6Bold')} </b> {t('TOS.details6Text')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details7Title')}</h3>
            <p>
              9. <b> {t('TOS.details7Bold')} </b> {t('TOS.details7Text')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details8Text')}</h3>
            <p>
              10. <b> {t('TOS.details8Bold')} </b> {t('TOS.details8Text')}
            </p>
            <p>
              11. <b> {t('TOS.details8Bold1')} </b> {t('TOS.details8Text1')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details9Title')}</h3>
            <p>
              12. <b> {t('TOS.details9Bold')} </b> {t('TOS.details9Text')}
            </p>
            <p>
              13.<b> {t('TOS.details9Bold1')} </b> {t('TOS.details9Text1')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details10Title')}</h3>
            <p>
              14.<b> {t('TOS.details10Bold')} </b> {t('TOS.details10Text')}
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('TOS.details11Title')}</h3>
            <p>
              15. <b> S{t('TOS.details11Bold')} </b> {t('TOS.details11Text')}
            </p>
            <p>
              16. <b> {t('TOS.details11Bold1')} </b> {t('TOS.details11Text1')}
            </p>
            <p>
              17. <b> {t('TOS.details11Bold2')} </b> {t('TOS.details11Text2')}
            </p>
            <p>
              18. <b> {t('TOS.details11Bold3')} </b> {t('TOS.details11Text3')}
            </p>
            <p>
              19. <b> {t('TOS.details11Bold4')} </b> {t('TOS.details11Text4')}
            </p>
            <p>
              20. <b> {t('TOS.details11Bold5')} </b> {t('TOS.details11Text5')}
            </p>
            <p>
              21. <b> {t('TOS.details11Bold6')} </b> {t('TOS.details11Text6')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
