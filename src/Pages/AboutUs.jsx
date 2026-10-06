import '../styles/AboutUs.css';
import aboutImg from "../assets/about/about.jpeg";

function AboutUs() {
  return (
    <section className="About">
      <h1 className="About_title">QUI SOMMES-NOUS ?</h1>

      <div className="About_container">
        <div className="About_image-wrapper">
          <img src={aboutImg} alt="Fred et Lara" className="About_image" />
        </div>

        <div className="About_content">
          <h2 className="About_quote">
            <span className="About_quote-top">“PARTAGER LE</span>
            <span className="About_quote-middle">SAVOIR-FAIRE</span>
            <span className="About_quote-bottom">DE NOTRE ÎLE”</span>
          </h2>

          <div className="About_texts">
            <div className="About_column">
              <p>
                <em>
                  “Originaires de la Grande Île de Madagascar, nous habitons actuellement en Alsace
                  et pourtant notre île ne nous a jamais quittée...”
                </em>
              </p>

              <p>
                Hello ! Nous c’est Lara et Fred, un couple qui aime profondément Madagascar.
              </p>

              <p>
                <em>
                  Fred est né et a grandi en Alsace à l’Est de la France, mais il a toujours baigné
                </em>
              </p>
            </div>

            <div className="About_column">
              <p>
                dans une atmosphère et une culture familiale qui a fait de lui aujourd’hui un vrai
                malgache dans le sang, mais surtout dans le cœur.
              </p>

              <p>
                Et c’est avec ces valeurs profondes qu’il rencontre Lara sa femme. Qui elle, est née
                et a grandi à Madagascar jusqu’à ses 21 ans.
              </p>
            </div>

            <div className="About_column">
              <p>
                Puis est venue s’installer en Alsace.
              </p>

              <p>
                Et c’est ensemble aujourd’hui, nous voulons vous faire découvrir tout l’étendu du
                savoir faire de l’île si chère à nos coeurs.
              </p>

              <p className="About_final-quote">
                “On peut quitter Madagascar, <br />
                mais Madagascar ne nous <br />
                quitte pas”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  

  );
}

export default AboutUs;