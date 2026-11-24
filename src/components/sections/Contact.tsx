"use client";
/**
 * Closing call-to-action with a newsletter form.
 * TODO for the buyer: connect the form to Mailchimp / Resend / your API inside onSubmit.
 */
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useUI } from "@/components/providers/UIProvider";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  const { openBooking } = useUI();
  const [done, setDone] = useState(false);

  return (
    <section id="contact" className="wrap pb-24 pt-10 md:pb-36">
      <div className="rounded-[2.5rem] bg-accent p-8 text-accent-ink md:rounded-[4rem] md:p-16">
        <h2 className="h-display max-w-4xl text-[clamp(2.6rem,7vw,6.5rem)]">Your next trip starts with one message.</h2>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Magnetic>
            <button onClick={() => openBooking()} className="rounded-full bg-accent-ink px-8 py-4 text-lg font-semibold text-accent">Request a trip</button>
          </Magnetic>

          <form onSubmit={(e) => { e.preventDefault(); setDone(true); /* TODO: send e.currentTarget email to your provider */ }} className="w-full max-w-md">
            <label htmlFor="nl" className="mb-2 block text-sm font-medium">Monthly dispatch: two routes we love, no spam.</label>
            {done ? (
              <p className="py-3 text-lg font-semibold">Thanks, see you in your inbox.</p>
            ) : (
              <div className="flex gap-2 rounded-full border border-accent-ink/30 p-1.5 focus-within:border-accent-ink">
                <input id="nl" type="email" required placeholder="you@email.com" className="min-w-0 flex-1 bg-transparent px-4 outline-none placeholder:text-accent-ink/50" />
                <button className="rounded-full bg-accent-ink px-6 py-3 font-semibold text-accent">Subscribe</button>
              </div>
            )}
          </form>
        </div>
        <p className="mt-10 text-sm opacity-70">Prefer a call? {siteConfig.contact.phone}</p>
      </div>
    </section>
  );
}
