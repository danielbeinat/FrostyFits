import credit from "../../../assets/credit.svg";
import truck from "../../../assets/truck.svg";
import arrow from "../../../assets/arrow.svg";

import "./Service.scss";
export const Service = () => {
  return (
    <>
      <section className="service font-parkinsans">
        <article>
          <img src={credit} alt="credit" />

          <div className="text">
            <h1>3 CUOTAS SIN INTERÉS</h1>
            <h2>Todas las tarjetas de crédito</h2>
          </div>
        </article>
        <article>
          <img loading="lazy" src={truck} alt="truck" />
          <div className="text">
            <h1>ENVÍOS GRATIS A TODO EL PAIS</h1>
            <h2>Sin moverte de tu casa</h2>
          </div>
        </article>

        <article>
          <img src={arrow} alt="return" />
          <div className="text">
            <h1>CAMBIOS Y DEVOLUCIONES</h1>
            <h2>En 30 diás</h2>
          </div>
        </article>
      </section>
    </>
  );
};
