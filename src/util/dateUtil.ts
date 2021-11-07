import * as dayjs from "dayjs";

export const toYYYYMMDD = (day: Date) => dayjs(day).format("YYYY-MM-DD");

export const quarterToHour = (q: number): string => {
    const quot = Math.floor((q-1) / 4);
    const rem = (q-1) % 4;
    const hour = quot < 2 ? 22 + quot : quot - 2;
    const minute = rem  * 15;

    return `${hour}:${minute == 0 ? "00" : minute}`
}
