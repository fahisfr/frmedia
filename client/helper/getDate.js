import { formatDistanceToNowStrict } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

 const  getDate = (date) => {
  try{
      return `${formatDistanceToNowStrict(
    zonedTimeToUtc(date, Intl.DateTimeFormat().resolvedOptions().timeZone)
  )} ago`;
  }catch(err){
    return date
  }

};
export default getDate