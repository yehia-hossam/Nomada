/**
 * POST /api/booking
 * Validates a booking request. Wire it to your CRM / email service here:
 *  - Set BOOKING_WEBHOOK_URL in .env.local to forward the payload (Zapier, Make, n8n...).
 *  - Or replace the TODO below with Resend / Nodemailer / your database call.
 */
import { NextResponse } from "next/server";

interface Payload { name?: string; email?: string; destination?: string; date?: string; guests?: number; notes?: string }

export async function POST(req: Request) {
  let body: Payload;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email ?? "");
  if (!body.name?.trim() || !emailOk) {
    return NextResponse.json({ error: "Please provide your name and a valid email." }, { status: 422 });
  }

  const url = process.env.BOOKING_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } catch {
      return NextResponse.json({ error: "Could not reach the booking service." }, { status: 502 });
    }
  } else {
    // TODO: send an email / save to a database. For now we only log in development.
    console.log("[booking]", body);
  }
  return NextResponse.json({ ok: true });
}
