import { TranslationProps } from '@/types';

export function timeDifference(previous: string, { t }: TranslationProps): string {
  const current: Date = new Date();
  const previousDate: Date = new Date(previous);

  const msPerMinute: number = 60 * 1000;
  const msPerHour: number = msPerMinute * 60;
  const msPerDay: number = msPerHour * 24;
  const msPerMonth: number = msPerDay * 30;

  const elapsed: number = current.getTime() - previousDate.getTime();
  if (elapsed < msPerMinute) {
    return `${t('listing.justNow')}`;
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    return minutes > 1 ? `${t('listing.minutesAgo', { minutes: minutes })}` : `${t('listing.minuteAgo')}`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return hours > 1 ? `${t('listing.hoursAgo', { hours: hours })}` : `${t('listing.hourAgo')}`;
  } else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    return days > 1 ? ` ${t('listing.daysAgo', { days: days })}` : `${t('listing.dayAgo')}`;
  } else {
    const months = Math.round(elapsed / msPerMonth);
    return months > 1 ? ` ${t('listing.monthsAgo', { months: months })}` : `${t('listing.monthAgo')}`;
  }
}
