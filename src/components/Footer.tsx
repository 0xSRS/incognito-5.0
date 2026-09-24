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
          <a
            href="https://www.instagram.com/incognito_scsdf_5.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-instagram-icon-link"
            aria-label="Instagram"
          >
            <svg
              className="footer-instagram-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          
          <a
            href="https://www.instagram.com/incognito_scsdf_5.0/"
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
