export const formatDate = (date: string | Date) => {
  const dateParser = new Intl.DateTimeFormat("pt-br", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return dateParser.format(new Date(date));
};
