import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Formats a date to Indian Standard Time (IST) with the specified format
 * @param date The date to format (Date object, ISO string, or dayjs object)
 * @param formatString The desired output format (default: 'DD-MM-YYYY HH:mm:ss')
 * @returns Formatted date string in IST
 */
export const formatDateToIndianTime = (
  date: Date | string | dayjs.Dayjs,
  formatString: string = 'DD-MM-YYYY HH:mm:ss'
): string => {
  const indianTimeZone = 'Asia/Kolkata';
  return dayjs(date).tz(indianTimeZone).format(formatString);
};