"use client";

import { useState } from "react";
import { site } from "@/data/portfolioData";

const topics = ["Product design", "UX research", "Design system", "Accessibility audit", "Something else"];

// No backend: the form validates, then hands a pre-written message to the visitor's email app.
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [picked, setPicked] = useState(["Product design"]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const toggle = (t) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "What should I call you?";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "That email doesn’t look quite right.";
    if (form.message.trim().length < 10) next.message = "Tell me a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = `Hello from ${form.name} — ${picked.join(", ") || "a project"}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-done" role="status">
        <span className="form-done-icon" aria-hidden="true">✿</span>
        <h2>Your email app should be opening…</h2>
        <p>
          Hit send there and I’ll reply within a day. If nothing opened, write to{" "}
          <a className="link-underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <button type="button" className="link-underline" onClick={() => setSent(false)}>Edit message</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      <fieldset className="chips">
        <legend>I’m interested in…</legend>
        {topics.map((t) => (
          <label key={t} className={`chip ${picked.includes(t) ? "is-on" : ""}`}>
            <input type="checkbox" checked={picked.includes(t)} onChange={() => toggle(t)} />
            {t}
          </label>
        ))}
      </fieldset>

      <div className="form-row">
        <Field id="name" label="Your name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" value={form.name} onChange={update("name")} placeholder="Alex Rivera" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={update("email")} placeholder="alex@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        </Field>
      </div>

      <Field id="message" label="What are you working on?" error={errors.message}>
        <textarea id="message" name="message" rows={6} value={form.message} onChange={update("message")} placeholder="A bit about your product, your users and the problem you’re trying to solve…" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
      </Field>

      <button type="submit" className="btn btn--teal btn--lg" data-cursor="send">
        Send message <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
    </div>
  );
}
