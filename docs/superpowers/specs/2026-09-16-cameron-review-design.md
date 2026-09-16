# Cameron's review of the sandbox, 14 September 2026

Source: Ryan's recording of the meeting (`2026-09-14 16-42-23.mkv`), transcribed
on 16 September. Cameron walked the sandbox at
https://s375kl2brd0yjsk6xo5texqr.fra.prisma.build and asked for five changes.

## The changes

1. **Drop "We Do Both".** The two panels (Register A Marriage / Have A Wedding)
   under the door question go. Ryan kept them because the landing page looked
   thin; Cameron: "not really". The menu entries that pointed at them now open
   question one; the "every couple" line stays on the door.
2. **The quiz fits the viewport.** From the second question on, the whole
   screen (question, options, the record) sits inside one viewport on a
   desktop. No option and no stamp below the fold. The record uses the small
   stamp so seven answers fit at 900px.
3. **The date is a pop-up.** "Any date in mind" opens a dialog over the
   question instead of replacing the screen.
4. **The plan page keeps the two-thirds / one-third layout, and stays inside
   the viewport.** The record stays on the right; Book This and Send Me This
   move to the bottom of that column. The clause list, the officer plate, the
   free-text form, the closing photograph and the perforation go: "way too
   long on this page".
5. **The left two-thirds is a chat.** The first message is *Your process*.
   Under each of our messages sit quick-reply buttons (the FAQ for that
   message), pressed the way WhatsApp buttons are pressed. Each button posts
   the next message from the library. Free text is matched by keyword against
   the library, as the WhatsApp router does; there is no AI anywhere in it.

## The chat, precisely

`src/chat/thread.ts` is pure TypeScript, mirroring the exported WhatsApp flow
(`fixtures/whatsapp-flows-2026-09-10.json`): a message is sent, the visitor
presses a button or types, a router picks the next template by button id or
keyword, and a template already sent is skipped (`skip_if_sent`).

- **Topics** are the library sections in their order, plus the officer:
  process ("How does it work?", opened first), price ("What does it cost?"),
  bring ("What do we bring?"), home_affairs ("Where does Home Affairs fit?"),
  officer ("Who will we meet?"), always ("Anything else to know?"). A topic
  is offered only if the situation has answers for it.
- `openThread(situation)` posts the process message with the remaining
  topics as its replies.
- `pressReply(thread, id)` posts the visitor's words as their message, then
  our message for that topic, with the topics not yet sent as its replies.
  When the last topic is sent the message closes with "That is the whole of
  it" and the only thing left to press is Book This, which never moves.
- `askThread(thread, text)` posts the text as the visitor's message, then
  every library answer whose triggers match and whose conditions the
  situation meets. No match posts one honest line and leaves the replies as
  they were.
- A `?q=` on the URL is asked as soon as the thread opens, so Send Me This
  still carries a typed question.

Drafts show only with `NEXT_PUBLIC_SHOW_DRAFTS=true`, as everywhere else.
