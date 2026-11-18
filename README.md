# Potluck Postcard

Make a potluck invitation and download a calendar file your guests can open in Apple Calendar, Outlook or Google Calendar. Edit the party name, place, time and note to see the postcard update. All event details stay in the browser until you share the downloaded file.

[Make a postcard](https://cjimenz.github.io/potluck-postcard/)

The demo grew out of calendar-export helpers I wrote for a personal RSVP app in July 2026. The editor, preview and standalone exporter were added for this release. The example party is fictional.

## Run locally

From the repository directory, run `python3 -m http.server 8000 --bind 127.0.0.1` and open [localhost:8000](http://localhost:8000). There are no dependencies or accounts to configure.

## How the export works

Enter times in the browser’s displayed time zone. The exporter writes UTC instants so the recipient’s calendar can display them locally. It escapes calendar text and folds long lines at UTF-8 character boundaries. Downloads from the same page instance use the same event identifier. Reload to begin a separate invitation.

Run `node --test calendar.test.mjs` to check UTC conversion, escaping, line folding and validation.
