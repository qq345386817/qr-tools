import { DateTime, IANAZone } from 'luxon';
import { createEvent } from 'ics';

function zonedTime(value, zone) {
  const date = DateTime.fromISO(value, { zone });
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) || !date.isValid || date.toFormat("yyyy-MM-dd'T'HH:mm") !== value) throw new Error('eventTime');
  // Reject repeated local times at DST fallback instead of picking an offset silently.
  if (date.getPossibleOffsets().length > 1) throw new Error('eventAmbiguous');
  return date;
}

export function makeCalendar(fields) {
  if (typeof fields.timezone !== 'string' || !IANAZone.isValidZone(fields.timezone)) throw new Error('eventTime');
  const title = String(fields.title || '').trim();
  if (!title || title.length > 200 || String(fields.location || '').length > 500 || String(fields.description || '').length > 2000) throw new Error('eventFields');
  const start = zonedTime(fields.start, fields.timezone);
  const end = zonedTime(fields.end, fields.timezone);
  if (end <= start) throw new Error('eventTime');
  const location = String(fields.location || '').trim();
  const description = String(fields.description || '');
  const compact = (date) => date.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
  const link = new URL('https://calendar.google.com/calendar/render');
  for (const [key, value] of Object.entries({ action: 'TEMPLATE', text: title, dates: `${compact(start)}/${compact(end)}`, ctz: fields.timezone, location, details: description })) link.searchParams.set(key, value);
  const utcArray = (date) => { const d = date.toUTC(); return [d.year, d.month, d.day, d.hour, d.minute]; };
  const event = createEvent({ title, location, description, start: utcArray(start), end: utcArray(end), startInputType: 'utc', endInputType: 'utc', startOutputType: 'utc', endOutputType: 'utc', productId: 'qrtools.luopeike.com', ...(fields.uid ? { uid: fields.uid } : {}) });
  if (event.error) throw new Error('eventFields');
  return { payload: link.href, ics: event.value, start: start.toISO(), end: end.toISO() };
}
