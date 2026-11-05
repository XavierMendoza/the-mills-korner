function NewsletterSignup() {
  return (
    <div className="newsletter">
      <h2>Stay connected</h2>
      <form
        method="POST"
        action="https://285cd55d.sibforms.com/serve/MUIFALniuc74hgZEOE-xAyQkscpvkRynbf9TxP3B-sp1cSiyY88K4t_P6DDscmqXR5PsqSA6M19sIWikFBqBIIE2P7i-8zh9kN493JKubNZYY9NVe7WJKO1lV7JR8hOHqBftzglcCddTt9ZdvAEV1XQ3oRlXzHFcsQES6ngn1hqDL_QqwnliVgknYvHWrRlbgjR6BgTXiGjz6ddnng=="
      >
        <label htmlFor="newsletter-email">Email address</label>
        <div>
          <input id="newsletter-email" name="EMAIL" type="email" required autoComplete="email" />
          <button type="submit">Join</button>
        </div>
        <input
          className="newsletter-honeypot"
          type="text"
          name="email_address_check"
          value=""
          readOnly
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />
        <input type="hidden" name="locale" value="en" />
        <input type="hidden" name="html_type" value="simple" />
      </form>
    </div>
  )
}
export default NewsletterSignup
