"""
Vellum & Vector — Email Utility
Sends enquiry notification emails via the Resend SDK.
Gracefully falls back if RESEND_API_KEY is not configured.

Spec reference: Tech Stack table — Email: Resend SDK (latest)
"""

import logging
from django.conf import settings
from django.utils.html import escape

logger = logging.getLogger(__name__)


def send_enquiry_email(submission) -> bool:
    """
    Dispatch a contact form notification email to NOTIFY_EMAIL.
    Returns True on success, False on failure.

    The API call is wrapped in a try/except so a failed email never
    prevents the submission from being saved to the database.
    """
    api_key = getattr(settings, "RESEND_API_KEY", "")
    notify_email = getattr(settings, "NOTIFY_EMAIL", "oyekanboluwatife6@gmail.com")

    if not api_key:
        logger.warning(
            "RESEND_API_KEY not configured — enquiry email not sent for submission %s",
            submission.id,
        )
        return False

    try:
        import resend

        resend.api_key = api_key

        html_body = _build_email_html(submission)

        # Sanitize subject line to prevent header injection issues
        clean_name = " ".join(submission.name.splitlines()).strip()

        resend.Emails.send({
            "from": f"Vellum & Vector <{getattr(settings, 'FROM_EMAIL', 'onboarding@resend.dev')}>",
            "to": [notify_email],
            "reply_to": submission.email,
            "subject": f"New Enquiry from {clean_name} — Vellum & Vector",
            "html": html_body,
        })

        logger.info("Enquiry email sent for submission %s", submission.id)
        return True

    except Exception as exc:
        logger.error(
            "Failed to send enquiry email for submission %s: %s",
            submission.id,
            exc,
        )
        return False


def _build_email_html(submission) -> str:
    """Build a clean HTML email body for the enquiry notification."""

    name = escape(submission.name)
    email = escape(submission.email)
    budget = escape(submission.budget_range or "Not specified")
    business_type = escape(submission.business_type or "Not specified")
    
    # Safely escape message body and replace newlines with HTML line breaks
    message = escape(submission.message).replace("\n", "<br />")
    ip_address = escape(submission.ip_address or "unknown")
    submission_id = escape(str(submission.id))

    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        body {{ font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }}
        .card {{ background: #ffffff; border-radius: 12px; padding: 32px; max-width: 580px; margin: 0 auto; border: 1px solid #e5e7eb; }}
        .header {{ border-bottom: 3px solid #FF6B35; padding-bottom: 16px; margin-bottom: 24px; }}
        .brand {{ font-size: 20px; font-weight: 700; color: #0F172A; }}
        .label {{ font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #9ca3af; margin-bottom: 4px; }}
        .value {{ font-size: 15px; color: #111827; margin-bottom: 20px; }}
        .message-box {{ background: #f9fafb; border-radius: 8px; padding: 16px; border-left: 3px solid #FF6B35; }}
        .footer {{ margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center; }}
        .badge {{ display: inline-block; background: #FF6B35; color: #fff; border-radius: 100px; padding: 2px 10px; font-size: 11px; font-weight: 600; }}
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="brand">Vellum &amp; Vector</div>
          <div style="margin-top: 4px;">
            <span class="badge">New Enquiry</span>
          </div>
        </div>

        <div class="label">Name</div>
        <div class="value">{name}</div>

        <div class="label">Email</div>
        <div class="value"><a href="mailto:{email}" style="color: #FF6B35;">{email}</a></div>

        <div class="label">Business Type</div>
        <div class="value">{business_type}</div>

        <div class="label">Budget Range</div>
        <div class="value">{budget}</div>

        <div class="label">Message</div>
        <div class="message-box" style="color: #111827; font-size: 15px; line-height: 1.6;">
          {message}
        </div>

        <div class="footer">
          Submitted {submission.created_at:%d %B %Y at %H:%M WAT} &bull;
          IP: {ip_address} &bull;
          ID: {submission_id}
        </div>
      </div>
    </body>
    </html>
    """

