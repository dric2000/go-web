const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const months = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${weekdays[d.getDay() === 0 ? 6 : d.getDay() - 1]}. ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${time}`;
}

export function formatFcfa(n: number) {
  return `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FCFA`;
}

export function formatTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function formatDateHeader(iso: string) {
  const d = new Date(iso);
  const weekday = weekdays[d.getDay() === 0 ? 6 : d.getDay() - 1];
  return `${weekday}. ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`.toUpperCase();
}

export function dateKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
