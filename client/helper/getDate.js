import { formatDistanceToNowStrict } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

 const  getDate = (date) => {
  return `${formatDistanceToNowStrict(
    zonedTimeToUtc(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
  )} ago`;
};
export default getDate