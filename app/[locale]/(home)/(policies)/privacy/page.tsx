import React from 'react';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations('policies.privacy');

  return (
    <>
      <section className='w-full flex flex-col items-center px-10 justify-center py-10 bg-brand-lightbg'>
        <div className='w-full flex flex-col justify-center text-center items-center'>
          <p className='text-sm'>{t('currentDate')}</p>
          <h1>{t('title')}</h1>
          <p>{t('introText')}</p>
        </div>
      </section>
      <section className='w-full flex flex-col items-center justify-center py-4 bg-white'>
        <div className='w-1/2 flex flex-col justify-center gap-5 mt-10'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-left'>{t('intro.title')}</h2>
            <p>{t('intro.paragraph1')}</p>
            <p>{t('intro.paragraph2')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>1. {t('how.title')}</h3>
            <p>{t('how.paragraph1')}</p>
            <ul>
              <li>{t('how.list1Item1')}</li>
              <li>{t('how.list1Item2')}</li>
              <li>{t('how.list1Item3')}</li>
              <li>{t('how.list1Item4')}</li>
              <li>{t('how.list1Item5')}</li>
              <li>{t('how.list1Item6')}</li>
            </ul>
            <p>{t('how.paragraph2')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>2. {t('type.title')}</h3>
            <p>{t('type.paragraph1')}</p>
            <p>{t('type.forCompanies')}</p>
            <ul>
              <li>
                <b>{t('type.companyList1Bold')}</b> {t('type.companyList1')}
              </li>
              <li>
                <b>{t('type.companyList2Bold')}</b> {t('type.companyList2')}
              </li>
              <li>
                <b>{t('type.companyList3Bold')}</b> {t('type.companyList3')}
              </li>
              <li>
                <b>{t('type.companyList4Bold')}</b> {t('type.companyList4')}
              </li>
            </ul>
            <p>{t('type.forCandidates')}</p>
            <ul>
              <li>
                <b>{t('type.candidateList1Bold')}</b> {t('type.candidateList1')}
              </li>
              <li>
                <b>{t('type.candidateList2Bold')}</b> {t('type.candidateList2')}
              </li>
              <li>
                <b>{t('type.candidateList3Bold')}</b> {t('type.candidateList3')}
              </li>
              <li>
                <b>{t('type.candidateList4Bold')}</b> {t('type.candidateList4')}
              </li>
            </ul>
            <p>{t('type.profileAdvice')}</p>
            <p>{t('type.interactionData')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>3. {t('purpose.title')}</h3>
            <p>{t('purpose.paragraph1')}</p>
            <ul>
              <li>{t('purpose.list2Item1')}</li>
              <li>{t('purpose.list2Item2')}</li>
              <li>{t('purpose.list2Item3')}</li>
              <li>{t('purpose.list2Item4')}</li>
              <li>{t('purpose.list2Item5')}</li>
              <li>{t('purpose.list2Item6')}</li>
              <li>{t('purpose.list2Item7')}</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>4. {t('disclosure.title')}</h3>
            <p>{t('disclosure.paragraph1')}</p>
            <ul>
              <li>{t('disclosure.list3Item1')}</li>
              <li>{t('disclosure.list3Item2')}</li>
              <li>{t('disclosure.list3Item3')}</li>
              <li>{t('disclosure.list3Item4')}</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>5. {t('protection.title')}</h3>
            <p>{t('protection.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>6. {t('marketing.title')}</h3>
            <p>{t('marketing.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>7. {t('cookies.title')}</h3>
            <p>{t('cookies.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>8. {t('links.title')}</h3>
            <p>{t('links.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>9. {t('access.title')}</h3>
            <p>{t('access.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>10. {t('overseas.title')}</h3>
            <p>{t('overseas.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>11. {t('resolve.title')}</h3>
            <p>{t('resolve.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>12. {t('changes.title')}</h3>
            <p>{t('changes.paragraph1')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
