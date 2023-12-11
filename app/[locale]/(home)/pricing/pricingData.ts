import type { subDataTypes, boostDataTypes } from '@/types';
export const subData: subDataTypes[] = [
  {
    title: 'Standard plan',
    price: 150,
    saves: 180,
    details: ['5 job listings', 'Dashboard', 'Basic chat and email support', 'Job application sent directly to your email'],
    buttonText: 'Get started',
  },
  {
    title: 'Premium plan',
    price: 400,
    saves: 230,
    details: [
      '10 job listings',
      '2 boost per month',
      'Specialize Dashboard',
      'Priority chat and email support',
      'Job application sent directly to your email',
    ],
    buttonText: 'Get started',
  },
  {
    title: 'Platinum plan',
    price: 900,
    saves: 310,
    details: [
      '15 job listings',
      '5 boost per month',
      'Specialize Dashboard',
      'Priority chat and email support',
      'Job application sent directly to your email',
      'Get featured to our social promotions',
    ],
    buttonText: 'Get started',
  },
];

export const boostData: boostDataTypes[] = [
  {
    title: 'Boost 1',
    price: 50,
    subText: 'Increase job post visibility',
    details: ['1 boost', 'Sponsored tag', 'Distinguishable job post', 'Job post will appeared more in search results'],
    buttonText: 'Get started',
  },
  {
    title: 'Boost 5',
    price: 250,
    subText: 'Increase job post visibility with 5 boost',
    details: ['5 boost', 'Sponsored tag', 'Distinguishable job post', 'Job post will appeared more in search results'],
    buttonText: 'Get started',
  },
  {
    title: 'Company Boost',
    price: 50,
    subText: 'Increase company promotion and visibility',
    details: ['Company banner custom on homepage and listing pages for 14 days', 'Sponsored ad on Facebook and Instagram'],
    buttonText: 'Get started',
  },
];
