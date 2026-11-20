function NewsletterSignup() {
  return (
    <div className="newsletter">
      <h2>Stay Konnected<br />With TMK</h2>
      <form
        method="POST"
        action="https://e3f8e079.sibforms.com/serve/MUIFAOfK16sCxmh4nt6oL-BPLYL5MgXTEQdpaxpEjLrDL1JeopN7EnTkRR-BLzLFQdidP2Zd5HZqF-SPDy_kDqn9ZJS5wawQpoNkiSZa9yuvjlQlGkZuCO-_v6Dz14Cxjx4mMYVjtSwCMz8an90kUKhAASmpPEX7QDHTIFFvB5a1135xzyjRWiUhBcJQ_GHSR-HQq8OIrrmli1ksXw=="
      >
        <label htmlFor="newsletter-email">Email address</label>
        <div>
          <input id="newsletter-email" name="EMAIL" type="email" required autoComplete="email" />
          <button type="submit">Join the TMK Newsletter</button>
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
