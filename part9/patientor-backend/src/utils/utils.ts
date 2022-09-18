export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseString = (param: unknown, fieldName: string): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing " + fieldName + ": " + param);
  }
  return param;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};
