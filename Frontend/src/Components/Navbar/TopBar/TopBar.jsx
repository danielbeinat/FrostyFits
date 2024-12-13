import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTruck,
  faCreditCard,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

const topcards = [
  {
    icon: faTruck,
    text: "¡ENVÍO GRATIS A PARTIR DE $80.000!",
  },
  {
    icon: faCreditCard,
    text: "¡3 CUOTAS SIN INTERÉS!",
  },
  {
    icon: faExchangeAlt,
    text: "CAMBIOS Y DEVOLUCIONES GRATIS",
  },
];

export const TopBar = () => {
  return (
    <>
      <div className="move font-parkinsans">
        {topcards.map((card, index) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <FontAwesomeIcon
              className="text-white"
              icon={card.icon}
              // className="icon"
            />
            <h1 className="text-white text-[13px] text-sm">{card.text}</h1>
          </div>
        ))}
      </div>
    </>
  );
};
