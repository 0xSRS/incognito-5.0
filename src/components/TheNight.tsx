import Image from "next/image";

export default function TheNight() {
  return (
    <section className="the-night" id="the-night">
      <div className="night-media">
        <Image
          src="/images/frame-4-no-text.webp"
          alt="The Night"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="night-content">
          <div className="wrap" style={{ padding: 0 }}>
            <div className="file-mark reveal">
              <span className="num editorial">File No. II</span>
              <span className="rule" />
              <span className="editorial">The Night</span>
            </div>
            <h2 className="night-title display reveal">The Business at Hand.</h2>
            <div className="night-details reveal">
              <div className="item">
                <div className="label editorial">Date</div>
                <div className="value">5 Oct 2026</div>
              </div>
              <div className="item">
                <div className="label editorial">Time</div>
                <div className="value">4:00 PM</div>
              </div>
              <div className="item">
                <div className="label editorial">Venue</div>
                <div className="value">Upper Auditorium</div>
              </div>
              <div className="item">
                <div className="label editorial">Dress</div>
                <div className="value">A Touch of Noir The feel of Mafia</div>
              </div>
              <div className="item">
                <div className="label editorial">Entry</div>
                <div className="value">Name on the List</div>
              </div>
              <div className="item">
                <div className="label editorial">Eligibility</div>
                <div className="value">SCSDF students only</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
