import { format } from "date-fns";
import { es } from "date-fns/locale";
import { startOfWeek, endOfWeek } from "date-fns";

export function getCurrentWeekRangeString(): string {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 }); // lunes
  const end = endOfWeek(now, { weekStartsOn: 1 }); // domingo

  const formatDayMonth = (date: Date) => format(date, "d/M", { locale: es });

  return `${formatDayMonth(start)} - ${formatDayMonth(end)}`;
}

export function getCurrentMonthName(): string {
  const now = new Date();
  const monthNumber = now.getMonth(); // 0 = enero
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return months[monthNumber];
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export const getTodayCutoffDate = (): Date => {
  const now = new Date();
  const cutoff = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    6,
    0,
    0
  );

  if (now < cutoff) {
    // Si es antes de las 6 AM, retrocede un día
    cutoff.setDate(cutoff.getDate() - 1);
  }

  return cutoff;
};

export const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
};
