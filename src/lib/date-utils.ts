const DASHBOARD_TIME_ZONE = 'Asia/Dhaka'

export const getDateParts = (date: Date = new Date()) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: DASHBOARD_TIME_ZONE,
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(date)
}

export const getDatePart = (date: Date, type: 'year' | 'month') => {
  return Number(getDateParts(date).find((part) => part.type === type)?.value)
}
