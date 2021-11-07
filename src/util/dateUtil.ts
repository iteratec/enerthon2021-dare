import * as dayjs from "dayjs";

export const toYYYYMMDD = (day: Date) => dayjs(day).format("YYYY-MM-DD");
