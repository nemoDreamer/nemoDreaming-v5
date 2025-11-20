import { formatDate as _formatDate } from "date-fns";

const formatDate = (date: Date, format = "MMM y"): string =>
  _formatDate(date, format);

export default formatDate;
