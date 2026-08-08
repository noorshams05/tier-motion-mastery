import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().max(200),
  move_date: z.string().trim().min(1).max(40),
  move_from: z.string().trim().max(200).optional().default(""),
  move_to: z.string().trim().max(200).optional().default(""),
  move_size: z.string().trim().max(80).optional().default(""),
  details: z.string().trim().max(2000).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("leads").insert({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email,
        move_date: data.move_date,
        move_from: data.move_from || null,
        move_to: data.move_to || null,
        move_size: data.move_size || null,
        details: data.details || null,
      });
      if (error) {
        console.error("[leads.insert]", error);
      }
    } catch (err) {
      console.error("[supabase.unavailable]", err);
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("[resend] RESEND_API_KEY is not set");
      throw new Error("Could not send your request. Please call 774-415-6411.");
    }

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;background:#0a0a0a;color:#fff;padding:24px;border-radius:12px">
        <h2 style="color:#a5c74f;margin:0 0 16px">New Top Tier Moving Quote Request</h2>
        <table style="width:100%;border-collapse:collapse;color:#fff">
          <tr><td style="padding:6px 0;color:#8a8a8a">Name</td><td>${escape(data.full_name)}</td></tr>
          <tr><td style="padding:6px 0;color:#8a8a8a">Phone</td><td>${escape(data.phone)}</td></tr>
          <tr><td style="padding:6px 0;color:#8a8a8a">Email</td><td>${escape(data.email)}</td></tr>
          <tr><td style="padding:6px 0;color:#8a8a8a">Move date</td><td>${escape(data.move_date)}</td></tr>
          <tr><td style="padding:6px 0;color:#8a8a8a">From</td><td>${escape(data.move_from)}</td></tr>
          <tr><td style="padding:6px 0;color:#8a8a8a">To</td><td>${escape(data.move_to)}</td></tr>
          <tr><td style="padding:6px 0;color:#8a8a8a">Size</td><td>${escape(data.move_size)}</td></tr>
          <tr><td style="padding:6px 0;color:#8a8a8a;vertical-align:top">Details</td><td>${escape(data.details).replace(/\n/g, "<br/>")}</td></tr>
        </table>
      </div>`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Top Tier Moving <onboarding@resend.dev>",
          to: ["justin@toptiermove.com"],
          reply_to: data.email,
          subject: `New quote: ${data.full_name} — ${data.move_date}`,
          html,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("[resend] send failed", res.status, body);
        throw new Error("Could not send your request. Please call 774-415-6411.");
      }
    } catch (err) {
      console.error("[resend]", err);
      throw new Error("Could not send your request. Please call 774-415-6411.");
    }

    return { ok: true as const };
  });

function escape(v: string): string {
  return (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
