import Image from "next/image";

export default function CinematicArchive() {
  return (
    <section className="cinematic-archive section-transparent" id="archive">
      <div className="wrap">
        <div className="file-mark reveal">
          <span className="num editorial">Biglietto d&rsquo;invito</span>
        </div>
        <div className="archive-grid">
          <figure className="archive-card reveal">
            <Image
              src="/images/frame-2.webp"
              alt="Incognito cinematic hero"
              width={1280}
              height={720}
            />
            <figcaption>01 — The Invitation</figcaption>
          </figure>
          <figure className="archive-card reveal">
            <Image
              src="/images/frame-1-no-text.webp"
              alt="Incognito vintage invitation"
              width={1280}
              height={720}
            />
            <figcaption>02 — The Family</figcaption>
          </figure>
          <figure className="archive-card reveal">
            <Image
              src="/images/frame-3.webp"
              alt="Incognito noir night"
              width={1280}
              height={720}
            />
            <figcaption>03 — The Night</figcaption>
          </figure>
          <figure className="archive-card reveal">
            <Image
              src="/images/frame-5.webp"
              alt="Incognito visual archive"
              width={1280}
              height={720}
            />
            <figcaption>04 — The Legacy</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
