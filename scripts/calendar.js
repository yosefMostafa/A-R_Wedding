/**
 * calendar.js — "Add to Calendar" for the wedding.
 *
 * Times are emitted as FLOATING (no timezone) so calendar apps read them as
 * local wall-clock time. For a wedding that is what you want: 8pm means 8pm
 * at the venue, whatever timezone the guest's phone happens to be set to.
 */

function initCalendar(config) {
  var btn = document.getElementById('cal-btn');
  if (!config.dateISO) {
    if (btn) btn.style.display = 'none';
    return;
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* Local wall-clock formatter — never converts to UTC */
  function stamp(d) {
    return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) +
           'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
  }

  var start = new Date(config.dateISO);
  var end   = config.endISO
    ? new Date(config.endISO)
    : new Date(start.getTime() + 4 * 3600000); /* default: 4 hours */

  var groom = (config.groom && config.groom.en) || '';
  var bride = (config.bride && config.bride.en) || '';
  var title = groom + ' & ' + bride + ' — Wedding';

  var venue = (config.venue && config.venue.name && config.venue.name.en) || '';
  var addr  = (config.venue && config.venue.address && config.venue.address.en) || '';
  var place = [venue, addr].filter(Boolean).join(', ');

  var details = ((config.invite && config.invite.en) || '').replace(/\n/g, ' ');

  /* ── .ics download (Apple Calendar, Google Calendar, Outlook, everything else) ── */
  if (!btn) return;

  /* RFC 5545: backslash, semicolon and comma must be escaped; CRLF -> \n */
  function esc(s) {
    return String(s).replace(/([\\;,])/g, '\\$1').replace(/\r?\n/g, '\\n');
  }

  btn.addEventListener('click', function () {
    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//wedding-invitation//EN',
      'BEGIN:VEVENT',
      'UID:' + stamp(start) + '-wedding@invitation',
      'DTSTAMP:' + stamp(new Date()),
      'DTSTART:' + stamp(start),
      'DTEND:'   + stamp(end),
      'SUMMARY:'  + esc(title),
      'LOCATION:' + esc(place),
      'DESCRIPTION:' + esc(details),
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    var url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = (groom + '-' + bride + '-wedding.ics').replace(/\s+/g, '');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (window._toast) window._toast('Calendar file downloaded');
  });
}
