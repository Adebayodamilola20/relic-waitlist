const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type WaitlistEmailRequest = {
  fullName?: string;
  email?: string;
  queuePosition?: number;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const buildWaitlistEmail = ({
  safeName,
  safeEmail,
  safeQueuePosition,
}: {
  safeName: string;
  safeEmail: string;
  safeQueuePosition: string;
}) => `
  <!doctype html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>You are on the RELIC waitlist</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f7f6;font-family:Inter,Arial,Helvetica,sans-serif;color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7f6;margin:0;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #dbe6e2;border-radius:22px;overflow:hidden;box-shadow:0 18px 50px rgba(15,23,42,0.08);">
              <tr>
                <td style="background:#07110d;padding:34px 32px 30px;border-bottom:4px solid #32bb78;">
                  <div style="font-size:12px;line-height:1;text-transform:uppercase;letter-spacing:2.4px;color:#7de2ad;font-weight:800;margin-bottom:18px;">RELIC Private Beta</div>
                  <h1 style="margin:0;color:#ffffff;font-size:32px;line-height:1.1;font-weight:900;letter-spacing:0;">Your spot is secured.</h1>
                  <p style="margin:14px 0 0;color:#cbd5d0;font-size:15px;line-height:1.7;">You are officially on the RELIC waitlist. We saved your place and will use this email for access updates.</p>
                </td>
              </tr>

              <tr>
                <td style="padding:34px 32px 8px;">
                  <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#334155;">Hi <strong style="color:#0f172a;">${safeName}</strong>,</p>
                  <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#334155;">Thanks for joining RELIC. We are building an AI operating system for founders and builders, and your beta access request is now confirmed.</p>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;margin:0 0 26px;">
                    <tr>
                      <td style="background:#ecfdf5;border:1px solid #9ee6bf;border-radius:18px;padding:24px;text-align:center;">
                        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.8px;color:#0f7a49;font-weight:800;margin-bottom:10px;">Queue Position</div>
                        <div style="font-size:44px;line-height:1;font-weight:900;color:#07110d;">#${safeQueuePosition}</div>
                        <div style="font-size:13px;line-height:1.5;color:#35614a;margin-top:10px;">Your position moves forward as beta batches open.</div>
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 26px;">
                    <tr>
                      <td style="padding:0 0 12px;">
                        <div style="font-size:13px;font-weight:800;color:#0f172a;margin-bottom:4px;">Confirmed email</div>
                        <div style="font-size:14px;color:#475569;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;">${safeEmail}</div>
                      </td>
                    </tr>
                  </table>

                  <div style="border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;padding:22px 0;margin:0 0 26px;">
                    <div style="font-size:13px;text-transform:uppercase;letter-spacing:1.6px;color:#64748b;font-weight:800;margin-bottom:12px;">What happens next</div>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#334155;">1. We will send product updates as RELIC moves through private beta.</p>
                    <p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#334155;">2. When your batch opens, you will receive access instructions at this email.</p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">3. Duplicate signups are blocked, so this queue position stays tied to your email.</p>
                  </div>

                  <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#334155;">Keep an eye on your inbox. We will reach out when your RELIC beta invite is ready.</p>
                </td>
              </tr>

              <tr>
                <td style="padding:0 32px 34px;">
                  <div style="background:#07110d;border-radius:16px;padding:20px;">
                    <div style="font-size:15px;font-weight:900;color:#ffffff;margin-bottom:6px;">The RELIC Team</div>
                    <div style="font-size:13px;line-height:1.6;color:#a7b8af;">Building the AI organization layer for modern founders.</div>
                  </div>
                </td>
              </tr>
            </table>

            <p style="max-width:640px;margin:18px auto 0;font-size:11px;line-height:1.6;color:#94a3b8;text-align:center;">You received this because you joined the RELIC waitlist. We will only email you about RELIC access and product updates.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

const buildNotifyEmail = ({
  safeName,
  safeEmail,
  safeQueuePosition,
}: {
  safeName: string;
  safeEmail: string;
  safeQueuePosition: string;
}) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:24px;color:#0f172a;">
    <div style="max-width:520px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.8px;color:#0f7a49;font-weight:800;margin-bottom:12px;">RELIC Waitlist</div>
      <h1 style="margin:0 0 18px;font-size:22px;line-height:1.2;">New waitlist signup</h1>
      <p style="margin:0 0 8px;font-size:14px;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin:0 0 8px;font-size:14px;"><strong>Email:</strong> ${safeEmail}</p>
      <p style="margin:0;font-size:14px;"><strong>Queue position:</strong> #${safeQueuePosition}</p>
    </div>
  </div>
`;

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
  const queuePosition = Number(body.queuePosition);

  if (!fullName || !email || !/\S+@\S+\.\S+/.test(email) || !Number.isInteger(queuePosition) || queuePosition < 1) {
    return new Response(JSON.stringify({ error: 'Invalid waitlist details' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const safeQueuePosition = escapeHtml(queuePosition.toLocaleString('en-US'));

  await sendEmail({
    apiKey: resendApiKey,
    from: fromEmail,
    to: email,
    subject: 'You are on the RELIC waitlist',
    html: buildWaitlistEmail({ safeName, safeEmail, safeQueuePosition }),
  });

  if (notifyEmail) {
    await sendEmail({
      apiKey: resendApiKey,
      from: fromEmail,
      to: notifyEmail,
      subject: 'New RELIC waitlist signup',
      html: buildNotifyEmail({ safeName, safeEmail, safeQueuePosition }),
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
