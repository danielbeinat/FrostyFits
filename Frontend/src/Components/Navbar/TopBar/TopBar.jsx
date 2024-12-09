import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTruck,
  faCreditCard,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

export const TopBar = () => {
  return (
    <>
      <div className="move">
        <div className="send">
          <FontAwesomeIcon icon={faTruck} className="icon" />
          <h1>¡ENVÍO GRATIS A PARTIR DE $80.000!</h1>
        </div>
        <div className="credit">
          <FontAwesomeIcon icon={faCreditCard} className="icon" />
          <h1>¡3 CUOTAS SIN INTERÉS!</h1>
        </div>
        <div className="exchange">
          <FontAwesomeIcon icon={faExchangeAlt} className="icon" />
          <h1>CAMBIOS Y DEVOLUCIONES GRATIS</h1>
        </div>
      </div>
    </>
  );
};
