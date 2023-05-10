export default function DisplayMail({ mail }) {
  return (
    <div style={{ marginLeft: "16px" }}>
      <h3>From: {mail.from}</h3>
      <h4>Subject: {mail.subject}</h4>
      <p>Content: {mail.content}</p>
    </div>
  );
}
