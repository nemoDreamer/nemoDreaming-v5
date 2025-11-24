import { formatDate as _formatDate } from "date-fns";

export const formatDate = (date: Date, format = "MMM y"): string =>
  _formatDate(date, format);
