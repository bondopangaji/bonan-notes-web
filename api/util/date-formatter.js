// Copyright (c) 2022 Bondo Pangaji
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

// Method to generate custom date
function dateNow() { // example format: Sat, 23 July 2022 at 9:19:05 AM
  const date = new Date()
  const dayName = days[date.getDay()]
  const day = date.getDate()
  const monthName = months[date.getMonth()]
  const year = date.getFullYear()
  const time = date.toLocaleTimeString()
  return dayName + ", " + day + " " + monthName + " " + year + " at " + time
}