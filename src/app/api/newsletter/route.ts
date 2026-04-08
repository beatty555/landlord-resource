export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    // 1. Upsert subscriber in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      await fetch(`${supabaseUrl}/rest/v1/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({ email, tier: "free", subscribed: true }),
      });

      // 2. Send magic link via Supabase Auth
      await fetch(`${supabaseUrl}/auth/v1/magiclink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          email,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
          },
        }),
      });
    }

    // 3. Send welcome email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "hello@landlordresource.co.uk",
          to: email,
          subject: "Welcome to Landlord Resource",
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png" alt="Landlord Resource" style="height:48px;margin-bottom:24px" />
              <h1 style="color:#1B3A5C;font-size:24px">Welcome to Landlord Resource</h1>
              <p style="color:#555;font-size:16px;line-height:1.6">
                Thanks for signing up. You now have free access to all our guides, legislation updates, and downloadable templates.
              </p>
              <p style="color:#555;font-size:16px;line-height:1.6">
                Check your inbox — we've sent you a magic link to sign in to your account instantly, no password needed.
              </p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/guides" style="display:inline-block;background:#4A7C2F;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px">
                Browse Guides
              </a>
              <p style="color:#999;font-size:12px;margin-top:32px">
                You're receiving this because you signed up at landlordresource.co.uk.
                <a href="#" style="color:#4A7C2F">Unsubscribe</a>
              </p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
