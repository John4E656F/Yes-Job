import React from 'react';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');

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
            <h2 className='text-left'>{t('section1.title')}</h2>
            <p>{t('section1.paragraph1')}</p>
            <p>{t('section1.paragraph2')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section2.title')}</h3>
            <p>{t('section2.paragraph1')}</p>
            <ul>
              <li>{t('section2.list1.item1')}</li>
              <li>{t('section2.list1.item2')}</li>
              <li>{t('section2.list1.item3')}</li>
              <li>{t('section2.list1.item4')}</li>
              <li>{t('section2.list1.item5')}</li>
              <li>{t('section2.list1.item6')}</li>
            </ul>
            <p>{t('section2.paragraph2')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section3.title')}</h3>
            <p>{t('section3.paragraph1')}</p>
            <p>{t('section3.forCompanies')}</p>
            <ul>
              <li>
                <b>Company Information:</b> Your company name, contact details, and relevant information about your business.
              </li>
              <li>
                <b>Job Offer Details:</b> Information related to job offers posted, including job descriptions, requirements, and contact information
                for applicants.
              </li>
              <li>
                <b>Account Information:</b> Account creation for companies requires a company name, email address, and a password.
              </li>
              <li>
                <b>Professional Qualifications:</b> Information about the qualifications or skills you are seeking in candidates.
              </li>
            </ul>
            <p>{t('section3.forCandidates')}</p>
            <ul>
              <li>
                <b>Personal Information:</b> Your name, email address, professional qualifications, work experience, photographs, and country of
                residence.
              </li>
              <li>
                <b>Job Preferences:</b> Information about the types of jobs you are interested in, preferred work locations, and other job-related
                preferences.
              </li>
              <li>
                <b>CV and Professional Details:</b> Your curriculum vitae, education, skills, and any other information relevant to job applications.
              </li>
              <li>
                <b>Account Information:</b> Account creation for candidates will require your name, email address, and a password.
              </li>
            </ul>
            <p>{t('section3.profileAdvice')}</p>
            <p>{t('section3.interactionData')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section4.title')}</h3>
            <p>{t('section4.paragraph1')}</p>
            <ul>
              <li>Offer and provide our Services.</li>
              <li>Manage and administer those Services, including account management.</li>
              <li>Communicate with you about our Services.</li>
              <li>Verify and manage your specified membership with a company.</li>
              <li>Display your public personal profile as provided in your profile forms.</li>
              <li>Comply with our legal and regulatory obligations.</li>
              <li>Manage our business effectively.</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section5.title')}</h3>
            <p>{t('section5.paragraph1')}</p>
            <ul>
              <li>Cloud service providers.</li>
              <li>Email providers.</li>
              <li>Analytics services.</li>
              <li>Payment system operators.</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section6.title')}</h3>
            <p>{t('section6.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section7.title')}</h3>
            <p>{t('section7.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section8.title')}</h3>
            <p>{t('section8.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section9.title')}</h3>
            <p>{t('section9.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section10.title')}</h3>
            <p>{t('section10.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section11.title')}</h3>
            <p>{t('section11.paragraph1')}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>{t('section12.title')}</h3>
            <p>{t('section12.paragraph1')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
