import format from 'date-fns-tz/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import parseJSON from 'date-fns/parseJSON';

export function getDateAndTimeText(jsonDateTime) {
  const dateTime = parseJSON(jsonDateTime);
  const timeZone = 'Europe/Bratislava';
  const zonedDateTime = utcToZonedTime(dateTime, timeZone);

  return {
    date: format(zonedDateTime, 'yyyy-MM-dd', { timeZone }),
    time: format(zonedDateTime, "HH'h'mm'm", { timeZone }),
  };
}
