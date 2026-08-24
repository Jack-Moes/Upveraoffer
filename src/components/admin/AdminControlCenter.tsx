import type { Plan } from "@/content/pricing";
import type { StoredBooking, StoredMessage } from "@/lib/admin-store";
import type { FeedbackEntry } from "@/lib/managed-content";
import type { PostDraft } from "@/lib/blog";
import {
  createBooking,
  deleteFeedback,
  deletePost,
  saveFeedback,
  savePost,
  updateBooking,
  updateMessage,
  updatePlan,
} from "@/app/admin/actions";

const field =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground " +
  "placeholder:text-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-subtle";
const saveButton =
  "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover";
const dangerButton =
  "rounded-full border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-500/10 dark:text-red-300";

function when(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

function SectionTitle({ id, eyebrow, title, intro }: { id: string; eyebrow: string; title: string; intro: string }) {
  return (
    <div id={id} className="scroll-mt-28 border-t border-border pt-14 first:border-0 first:pt-0">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold">{title}</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted">{intro}</p>
    </div>
  );
}

export function AdminControlCenter({
  messages,
  bookings,
  plans,
  posts,
  feedback,
}: {
  messages: StoredMessage[];
  bookings: StoredBooking[];
  plans: Plan[];
  posts: PostDraft[];
  feedback: FeedbackEntry[];
}) {
  const newMessages = messages.filter((message) => message.status === "new").length;
  const requestedCalls = bookings.filter((booking) => booking.status === "requested").length;

  return (
    <div className="space-y-14">
      <nav className="sticky top-20 z-20 -mx-2 overflow-x-auto rounded-2xl border border-border bg-background/95 p-2 shadow-lg shadow-primary/5 backdrop-blur">
        <div className="flex min-w-max gap-1">
          {[
            ["inbox", `Inbox${newMessages ? ` (${newMessages})` : ""}`],
            ["bookings", `Bookings${requestedCalls ? ` (${requestedCalls})` : ""}`],
            ["pricing-control", "Pricing"],
            ["blog-control", "Blog"],
            ["feedback-control", "Feedback"],
          ].map(([href, text]) => (
            <a key={href} href={`#${href}`} className="rounded-xl px-4 py-2 text-sm font-semibold text-muted transition hover:bg-primary-soft hover:text-primary">
              {text}
            </a>
          ))}
        </div>
      </nav>

      <section className="space-y-6">
        <SectionTitle id="inbox" eyebrow="Client messages" title="Inbox" intro="Every contact-form submission is stored here, even when email notifications are not configured." />
        {messages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-surface p-8 text-center text-muted">No client messages yet.</div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {messages.map((message) => (
              <article key={message.id} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{message.name}</h3>
                    <a href={`mailto:${message.email}`} className="mt-1 block text-sm font-medium text-primary underline underline-offset-4">{message.email}</a>
                  </div>
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold capitalize text-primary">{message.status}</span>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted">{message.message}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
                  <div><dt className="text-subtle">Current role</dt><dd className="mt-1 font-medium">{message.currentRole}</dd></div>
                  <div><dt className="text-subtle">Target role</dt><dd className="mt-1 font-medium">{message.targetRole}</dd></div>
                  <div><dt className="text-subtle">Service</dt><dd className="mt-1 font-medium">{message.service}</dd></div>
                  <div><dt className="text-subtle">Received</dt><dd className="mt-1 font-medium">{when(message.createdAt)}</dd></div>
                </dl>
                <form action={updateMessage.bind(null, message.id)} className="mt-5 flex flex-wrap items-end gap-3">
                  <div className="min-w-40 flex-1">
                    <label className={label} htmlFor={`message-${message.id}`}>Status</label>
                    <select id={`message-${message.id}`} name="status" defaultValue={message.status} className={field}>
                      <option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option><option value="archived">Archived</option>
                    </select>
                  </div>
                  <button type="submit" className={saveButton}>Update</button>
                  <a href={`mailto:${message.email}?subject=Re: Your Upveraoffer message`} className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary/40">Reply</a>
                </form>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <SectionTitle id="bookings" eyebrow="Consultations" title="Booking tracker" intro="Confirm requested times, keep internal notes, and move calls through completion or cancellation." />
        <details className="rounded-3xl border border-primary/25 bg-primary-soft p-6">
          <summary className="cursor-pointer font-display text-lg font-semibold">Add a call manually</summary>
          <form action={createBooking} className="mt-6 grid gap-4 md:grid-cols-2">
            <div><label className={label}>Client name</label><input name="name" required className={field} /></div>
            <div><label className={label}>Email</label><input name="email" type="email" required className={field} /></div>
            <div><label className={label}>Requested date</label><input name="requestedDate" type="date" className={field} /></div>
            <div><label className={label}>Requested time</label><input name="requestedTime" type="time" className={field} /></div>
            <div><label className={label}>Timezone</label><input name="timezone" placeholder="Central Time" className={field} /></div>
            <div><label className={label}>Confirmed date/time</label><input name="scheduledAt" type="datetime-local" className={field} /></div>
            <div><label className={label}>Service</label><input name="service" className={field} /></div>
            <div><label className={label}>Status</label><select name="status" defaultValue="confirmed" className={field}><option value="requested">Requested</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
            <div className="md:col-span-2"><label className={label}>Internal notes</label><textarea name="internalNotes" rows={3} className={field} /></div>
            <div className="md:col-span-2"><button className={saveButton}>Add call</button></div>
          </form>
        </details>
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-surface p-8 text-center text-muted">No consultation requests yet.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><h3 className="font-display text-xl font-semibold">{booking.name}</h3><a href={`mailto:${booking.email}`} className="text-sm text-primary underline underline-offset-4">{booking.email}</a></div>
                  <div className="text-right text-sm"><p className="font-semibold capitalize text-primary">{booking.status}</p><p className="mt-1 text-subtle">Requested {booking.requestedDate} {booking.requestedTime} · {booking.timezone}</p></div>
                </div>
                {booking.notes && <p className="mt-4 rounded-2xl bg-surface p-4 text-sm leading-relaxed text-muted">{booking.notes}</p>}
                <form action={updateBooking.bind(null, booking.id)} className="mt-5 grid gap-4 border-t border-border pt-5 md:grid-cols-[0.65fr_1fr_1.5fr_auto] md:items-end">
                  <div><label className={label}>Status</label><select name="status" defaultValue={booking.status} className={field}><option value="requested">Requested</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
                  <div><label className={label}>Confirmed date/time</label><input name="scheduledAt" type="datetime-local" defaultValue={booking.scheduledAt} className={field} /></div>
                  <div><label className={label}>Internal notes</label><input name="internalNotes" defaultValue={booking.internalNotes} className={field} /></div>
                  <button className={saveButton}>Save</button>
                </form>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <SectionTitle id="pricing-control" eyebrow="Public content" title="Pricing" intro="Changes save to private runtime storage and update the homepage, pricing page, and contact form." />
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <form key={plan.id} action={updatePlan} className="space-y-4 rounded-3xl border border-border bg-background p-6 shadow-sm">
              <input type="hidden" name="id" value={plan.id} />
              <div><label className={label}>Plan name</label><input name="name" defaultValue={plan.name} required className={field} /></div>
              <div className="grid grid-cols-2 gap-3"><div><label className={label}>Price</label><input name="price" defaultValue={plan.price ?? "Custom"} className={field} /></div><div><label className={label}>Cadence</label><input name="cadence" defaultValue={plan.cadence} className={field} /></div></div>
              <div><label className={label}>Tagline</label><textarea name="tagline" defaultValue={plan.tagline} rows={2} className={field} /></div>
              <div><label className={label}>Best for</label><textarea name="bestFor" defaultValue={plan.bestFor} rows={2} className={field} /></div>
              <div><label className={label}>Features (one per line)</label><textarea name="features" defaultValue={plan.features.join("\n")} rows={8} className={field} /></div>
              <div><label className={label}>Button label</label><input name="ctaLabel" defaultValue={plan.cta.label} className={field} /></div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" defaultChecked={plan.featured} /> Featured plan</label>
              <button className={saveButton}>Save plan</button>
            </form>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle id="blog-control" eyebrow="Publishing" title="Blog manager" intro="Create drafts, publish articles, or update the existing Markdown posts without editing source files." />
        <details className="rounded-3xl border border-primary/25 bg-primary-soft p-6">
          <summary className="cursor-pointer font-display text-lg font-semibold">Create a new article</summary>
          <PostForm />
        </details>
        <div className="space-y-4">
          {posts.map((post) => (
            <details key={post.slug} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <summary className="cursor-pointer list-none">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div><h3 className="font-display text-xl font-semibold">{post.title}</h3><p className="mt-1 text-sm text-subtle">/{post.slug} · {post.published ? "Published" : "Draft"}</p></div>
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Edit</span>
                </div>
              </summary>
              <PostForm post={post} />
              <form action={deletePost.bind(null, post.slug)} className="mt-4"><button className={dangerButton}>Remove article</button></form>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-6 pb-10">
        <SectionTitle id="feedback-control" eyebrow="Social proof" title="Feedback manager" intro="Only publish feedback you have permission to use. Uncheck Published to keep an entry as a private draft." />
        <details className="rounded-3xl border border-primary/25 bg-primary-soft p-6">
          <summary className="cursor-pointer font-display text-lg font-semibold">Add client feedback</summary>
          <FeedbackForm />
        </details>
        <div className="grid gap-5 lg:grid-cols-2">
          {feedback.map((item) => (
            <details key={item.id} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
              <summary className="cursor-pointer list-none"><div className="flex items-center justify-between gap-3"><div><h3 className="font-display text-lg font-semibold">{item.name}</h3><p className="text-sm text-subtle">{item.role} · {item.published ? "Published" : "Draft"}</p></div><span className="text-xs font-semibold text-primary">Edit</span></div></summary>
              <FeedbackForm item={item} />
              <form action={deleteFeedback.bind(null, item.id)} className="mt-4"><button className={dangerButton}>Remove feedback</button></form>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}

function PostForm({ post }: { post?: PostDraft }) {
  return (
    <form action={savePost} className="mt-6 grid gap-4 md:grid-cols-2">
      <input type="hidden" name="originalSlug" value={post?.slug ?? ""} />
      <div><label className={label}>Title</label><input name="title" defaultValue={post?.title} required className={field} /></div>
      <div><label className={label}>Slug</label><input name="slug" defaultValue={post?.slug} required placeholder="article-url" className={field} /></div>
      <div><label className={label}>Category</label><input name="category" defaultValue={post?.category ?? "Guides"} className={field} /></div>
      <div><label className={label}>Date</label><input name="date" type="date" defaultValue={post?.date ?? new Date().toISOString().slice(0, 10)} className={field} /></div>
      <div><label className={label}>Author</label><input name="author" defaultValue={post?.author ?? "Upveraoffer"} className={field} /></div>
      <div><label className={label}>Cover path</label><input name="cover" defaultValue={post?.cover} placeholder="/images/blog/photo.jpg" className={field} /></div>
      <div className="md:col-span-2"><label className={label}>Description</label><textarea name="description" defaultValue={post?.description} rows={2} className={field} /></div>
      <div className="md:col-span-2"><label className={label}>Cover alt text</label><input name="coverAlt" defaultValue={post?.coverAlt} className={field} /></div>
      <div><label className={label}>Photo credit</label><input name="coverCredit" defaultValue={post?.coverCredit} className={field} /></div>
      <div><label className={label}>Credit URL</label><input name="coverCreditUrl" defaultValue={post?.coverCreditUrl} className={field} /></div>
      <div className="md:col-span-2"><label className={label}>Article body (Markdown)</label><textarea name="body" defaultValue={post?.body} required rows={18} className={`${field} font-mono`} /></div>
      <div className="flex items-center gap-4 md:col-span-2"><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={post?.published ?? false} /> Published</label><button className={saveButton}>Save article</button></div>
    </form>
  );
}

function FeedbackForm({ item }: { item?: FeedbackEntry }) {
  return (
    <form action={saveFeedback} className="mt-6 grid gap-4 md:grid-cols-2">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <div><label className={label}>Client name</label><input name="name" defaultValue={item?.name} required className={field} /></div>
      <div><label className={label}>Role</label><input name="role" defaultValue={item?.role} required className={field} /></div>
      <div><label className={label}>Company</label><input name="company" defaultValue={item?.company} className={field} /></div>
      <div><label className={label}>Service</label><input name="service" defaultValue={item?.service} className={field} /></div>
      <div><label className={label}>Outcome</label><input name="outcome" defaultValue={item?.outcome} className={field} /></div>
      <div><label className={label}>Rating (1–5)</label><input name="rating" type="number" min="1" max="5" defaultValue={item?.rating ?? ""} className={field} /></div>
      <div className="md:col-span-2"><label className={label}>Quote</label><textarea name="quote" defaultValue={item?.quote} required rows={5} className={field} /></div>
      <div className="md:col-span-2"><label className={label}>Portrait path (optional)</label><input name="photo" defaultValue={item?.photo} placeholder="/images/people/client.jpg" className={field} /></div>
      <div className="flex items-center gap-4 md:col-span-2"><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={item?.published ?? false} /> Published</label><button className={saveButton}>Save feedback</button></div>
    </form>
  );
}
