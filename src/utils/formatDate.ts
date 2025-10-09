import { format as dateFormat } from "date-fns";

const formatDate = (date: string, format = "MMM Y"): string =>
  dateFormat(new Date(date), format);

export default formatDate;
