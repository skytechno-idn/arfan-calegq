// utils/dayjs.ts
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set the default time zone
const defaultTimeZone = 'America/New_York';
dayjs.tz.setDefault(defaultTimeZone);

export default dayjs;