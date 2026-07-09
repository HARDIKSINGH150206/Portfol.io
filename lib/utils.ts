export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  });

  return formatter.format(date);
}
