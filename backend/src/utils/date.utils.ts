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
