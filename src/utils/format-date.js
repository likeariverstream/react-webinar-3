export function formatDate (date, union = 'в', options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }) {
  const parseDate = new Date(date)
  const localDate = parseDate.toLocaleDateString('ru-RU', options)

  return `${localDate} ${union} ${parseDate.getHours()}:${parseDate.getMinutes()}`
}
