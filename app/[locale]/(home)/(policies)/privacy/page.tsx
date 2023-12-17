import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className='w-full flex flex-col items-center px-10 justify-center py-4 bg-brand-lightbg'>
        <div className=' w-full flex flex-col justify-center text-center items-center '>
          <p>Current as of 17/12/2023</p>
          <h1>Privacy Policy</h1>
          <p>We respect your privacy regarding any information we may collect from you across our website and strive to be 100% transparent.</p>
        </div>
      </section>
      <section className='w-full flex flex-col items-center justify-center py-4 bg-white'>
        <div className='w-1/2 flex flex-col justify-center gap-5 mt-10 '>
          <div className='flex flex-col gap-2'>
            <h2 className='text-left'>Privacy</h2>
            <p>
              Welcome to Yes Job (“the Site”). Your privacy is of utmost importance to us, and we are dedicated to protecting the information you
              entrust to us. Yes Job (referred to as "we", "us", or "our") is a premier horeca job board in Belgium, connecting companies with
              potential candidates. This privacy policy applies to our website, communications, and all services offered through Yes Job (“the
              Services”).
            </p>

            <p>
              Yes Job is committed to complying with the European Union’s General Data Protection Regulation (GDPR) and other relevant European data
              protection laws. This Privacy Policy explains our approach to managing your personal information, including our obligations and your
              rights in respect of our dealings with your personal information. We encourage you to read this Privacy Policy to understand how your
              personal information is handled when collected via our website or as a result of using our Services.
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>1. How we collect your personal information</h3>
            <p>
              We collect and hold your personal information in a manner that is fair, lawful, and non-intrusive. Wherever practical, we collect your
              personal information directly from you through means such as:
            </p>
            <ul>
              <li>Making an inquiry, subscribing, or signing up for our service through our website.</li>
              <li>Contacting us via telephone or email.</li>
              <li>Completing our online forms, using the chat feature on our website, or corresponding with us.</li>
              <li>Participating in customer satisfaction and market research surveys.</li>
              <li>Administering our Services.</li>
              <li>Managing our business operations.</li>
            </ul>
            <p>
              Additionally, we may collect personal information from publicly available sources and third parties, including suppliers, recruitment
              agencies, contractors, clients, and business partners.
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>2. Types of personal information we collect</h3>
            <p>
              The type of personal information we may collect includes, but is not limited to, your name, email address, professional qualifications,
              work experience, photographs, country of residence, and job preferences. Account creation requires your name, email address, and a
              password. You may choose the information to include in your profile, such as work preferences, education, and skills, to enhance the
              effectiveness of our Services. We advise against posting sensitive personal data that you would not want publicly available.
            </p>
            <p>
              Personal data is also collected when you interact with our Services, including filling out forms, responding to surveys, or submitting
              job applications. We log usage data, employ cookies when you use our Services. We do not collect device and network information
            </p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>3. Our purposes for handling your personal information</h3>
          </div>
        </div>
      </section>
    </>
  );
}
