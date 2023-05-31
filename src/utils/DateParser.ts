export const formatDate = (date: string | Date) => {
  const dateParser = new Intl.DateTimeFormat("pt-br", {
    timeStyle: "short",
  });
  return dateParser.format(new Date(date));
};
