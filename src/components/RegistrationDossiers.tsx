export default function RegistrationDossiers() {
  return (
    <section className="registration-dossiers section-transparent" id="registrations">
      <div className="wrap">
        <div className="section-head reveal">
          <div className="file-mark" style={{ justifyContent: "center" }}>
            <span className="num editorial">File No. IV</span>
            <span className="rule" />
            <span className="editorial">The Don&rsquo;s Ledger</span>
          </div>
          <h2>Choose your place at the table.</h2>
          <p>Every name enters through the proper door. Select the invitation or opportunity that belongs to you.</p>
        </div>

        <div className="dossier-grid">
          <article className="dossier-card reveal">
            <div className="dossier-kicker">Dossier I · New Blood</div>
            <h3>Freshers&rsquo; Registration</h3>
            <p>For freshers joining the family. Put your name on the list and receive your invitation to Incognito 5.0.</p>
            <a
              className="dossier-btn"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfnduyC3DDuHO79LgrrrtARtPqFF0AT0zTNfVg3K6jXrYJ4DQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the List →
            </a>
          </article>

          <article className="dossier-card reveal">
            <div className="dossier-kicker">Dossier II · The House</div>
            <h3>SCSDF Family</h3>
            <p>For seniors and members of the SCSDF family. This is the house-side register for the evening.</p>
            <a
              className="dossier-btn"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfS16PIszoS2_NZeDlD3Ul9WuWvjh9vKu9H_le656b0WJ2Pzg/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enter the House →
            </a>
          </article>

          <article className="dossier-card accent reveal">
            <div className="dossier-kicker">Dossier III · The Crown</div>
            <h3>Mr. &amp; Ms. Freshers</h3>
            <p>For the freshers stepping into the spotlight. One registration opens the door to the night&rsquo;s defining contest.</p>
            <a
              className="dossier-btn"
              href="https://docs.google.com/forms/d/e/1FAIpQLSeBWv1ZYroQZSlOHymGw6PQddTsvZj1PrYLv6lN6pmBtXjpfQ/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claim the Spotlight →
            </a>
          </article>

          {/* <article className="dossier-card reveal">
            <div className="dossier-kicker">Dossier IV · The Hunt</div>
            <h3>The Treasure Hunt</h3>
            <p>Clues, riddles and hidden trails. Join the operation and see whether your crew can find what the family has concealed.</p>
            <a
              className="dossier-btn"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfgO22DCSI9zKM8IZa6xaxHduO5IHltIafEKkgjfkG0CDbkqg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Hunt →
            </a>
          </article> */}

          <article className="dossier-card center-card reveal">
            <div className="dossier-kicker">Dossier V · The Stage</div>
            <h3>Talent Hunt</h3>
            <p>Step into the spotlight and show the family what you&rsquo;re made of. Singer, dancer, performer — every talent has its moment.</p>
            <a
              className="dossier-btn"
              href="https://forms.gle/B227QKfYJWuiVQns6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Show Your Talent →
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
