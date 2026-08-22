/// <reference path="../pb_data/types.d.ts" />

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

onRecordAfterCreateSuccess((e) => {
  const name = e.record.getString("name");
  const email = e.record.getString("email");
  const message = e.record.getString("message");
  const to = $os.getenv("CONTACT_NOTIFY_EMAIL") || "contact@saadstack.com";

  const settings = e.app.settings();
  const fromAddress =
    settings.meta.senderAddress ||
    $os.getenv("BUILDER_MAILER_SENDER_ADDRESS") ||
    "noreply@saadstack.com";
  const fromName = settings.meta.senderName || "Saadstack";

  const text = [
    "New message from the saadstack.com contact form.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  const html = `
    <p>New message from the saadstack.com contact form.</p>
    <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
    <strong>Email:</strong> ${escapeHtml(email)}</p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  const mail = new MailerMessage({
    from: { address: fromAddress, name: fromName },
    to: [{ address: to }],
    replyTo: [{ address: email, name: name }],
    subject: `New contact form message from ${name}`,
    text,
    html,
  });

  try {
    e.app.newMailClient().send(mail);
  } catch (err) {
    e.app.logger().error("contact_notify_failed", "error", err);
    throw new ApiError(
      502,
      "Unable to deliver your message. Please email contact@saadstack.com"
    );
  }

  e.next();
}, "contact_submissions");
