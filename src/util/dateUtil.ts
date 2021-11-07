import * as dayjs from "dayjs";
import * as _ from "lodash";

export const toYYYYMMDD = (day: Date) => dayjs(day).format("YYYY-MM-DD");

export const quarterToHour = (q: number): string => {
    const quot = Math.floor((q-1) / 4);
    const rem = (q-1) % 4;
    const minute = rem  * 15;

    return `${_.padStart(String(quot), 2, '0')}:${_.pad(String(minute), 2, '0')}`
}
