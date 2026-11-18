function calendarTimestamp(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcsText(value) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;")
    .replace(/\r\n|\r|\n/g, "\\n");
}

function foldLine(value) {
  const encoder = new TextEncoder();
  let line = "", size = 0;
  const lines = [];
  for (const char of value) {
    const bytes = encoder.encode(char).length;
    if (size + bytes > 75) {
      lines.push(line);
      line = " ";
      size = 1;
    }
    line += char;
    size += bytes;
  }
  return [...lines, line].join("\r\n");
}

export function invitation({title, place, note, start, end}, uid, now = new Date()) {
  if (!title.trim() || !Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start)
    throw new Error("Choose a title and an end time after the start.");
  if (!/^[\w.@-]+$/.test(uid)) throw new Error("Invalid invitation identifier.");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Potluck Postcard//EN", "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT", "UID:" + uid, "DTSTAMP:" + calendarTimestamp(now), "DTSTART:" + calendarTimestamp(start),
    "DTEND:" + calendarTimestamp(end), "SUMMARY:" + escapeIcsText(title), "LOCATION:" + escapeIcsText(place),
    "DESCRIPTION:" + escapeIcsText(note), "END:VEVENT", "END:VCALENDAR"];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
