const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type WaitlistEmailRequest = {
  fullName?: string;
  email?: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const sendEmail = async ({
  apiKey,
  from,
  to,
  subject,
  html,
}: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
}) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend failed: ${details}`);
  }
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const fromEmail = Deno.env.get('EMAIL_FROM');
  const notifyEmail = Deno.env.get('WAITLIST_NOTIFY_EMAIL');

  if (!resendApiKey || !fromEmail) {
    return new Response(JSON.stringify({ error: 'Email delivery is not configured' }), {
      status: 503,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const body = (await req.json()) as WaitlistEmailRequest;
  const fullName = body.fullName?.trim();
  const email = body.email?.trim().toLowerCase();

  if (!fullName || !email || !/\S+@\S+\.\S+/.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid waitlist details' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);

  await sendEmail({
    apiKey: resendApiKey,
    from: fromEmail,
    to: email,
    subject: 'You are on the RELIC waitlist',
    html: `
      <div style="font-family:Inter,Arial,sans-serif;color:#0f172a;line-height:1.6">
        <h1 style="margin:0 0 12px;font-size:24px">Welcome to RELIC.</h1>
        <p>Hi ${safeName},</p>
        <p>Your waitlist spot is confirmed for <strong>${safeEmail}</strong>.</p>
        <p>We will send beta access details and product updates to this email as batches open.</p>
        <p style="margin-top:24px">The RELIC Team</p>
      </div>
    `,
  });

  if (notifyEmail) {
    await sendEmail({
      apiKey: resendApiKey,
      from: fromEmail,
      to: notifyEmail,
      subject: 'New RELIC waitlist signup',
      html: `
        <div style="font-family:Inter,Arial,sans-serif;color:#0f172a;line-height:1.6">
          <h1 style="margin:0 0 12px;font-size:20px">New waitlist signup</h1>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
        </div>
      `,
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
