import {invitation} from "./calendar.mjs";
const byId = id => document.getElementById(id);
const next = new Date();
next.setDate(next.getDate() + (7 - next.getDay() || 7));
next.setHours(17, 0, 0, 0);
function localInput(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0,16);
}
byId("start").value = localInput(next);
byId("end").value = localInput(new Date(next.getTime() + 7200000));
byId("zone").textContent = "Times are in " + Intl.DateTimeFormat().resolvedOptions().timeZone;
const uid = crypto.randomUUID() + "@potluck-postcard";
function fields() {
  return {title: byId("title").value.trim(), place: byId("place").value, note: byId("note").value,
    start: new Date(byId("start").value), end: new Date(byId("end").value)};
}
function render() {
  const e = fields();
  byId("headline").textContent = e.title;
  byId("where").textContent = e.place;
  byId("message").textContent = e.note;
  byId("when").textContent = Number.isFinite(e.start.getTime()) ? e.start.toLocaleString(undefined,{dateStyle:"medium",timeStyle:"short"}) : "";
  byId("status").textContent = "";
}
byId("editor").addEventListener("input",render);
byId("editor").addEventListener("submit",event => {
  event.preventDefault();
  try {
    const data = invitation(fields(),uid);
    const url = URL.createObjectURL(new Blob([data],{type:"text/calendar;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url; link.download = "potluck-invitation.ics"; link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    byId("status").textContent = "Calendar file ready. Share it with your guests.";
  } catch(error) { byId("status").textContent = error.message; }
});
render();
