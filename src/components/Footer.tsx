export default function Footer() {
  return (
    <footer>
      <div className="marks">
        <div className="div" />
      </div>
      <div className="event-mark display">Incognito 5.0</div>
      <p>Freshers&rsquo; Night &middot; School of Cybersecurity and Digital Forensics</p>

      <div className="footer-contact">
        <div className="footer-item">
          <span className="footer-label editorial">Queries</span>
          <a href="mailto:incognito.scsdf.events@gmail.com" className="footer-link">
            incognito.scsdf.events@gmail.com
          </a>
        </div>
        <span className="footer-sep">&middot;</span>
        <div className="footer-item">
          <span className="footer-label editorial">Instagram</span>
          <a
            href="https://www.instagram.com/p/DdhAYgvQ1U6/?stkn=MWdpNjZnam91dnFteg=="
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            @incognito_scsdf_5.0
          </a>
        </div>
      </div>

      <p className="small">Six families. One vision. One night to remember.</p>
    </footer>
  );
}
