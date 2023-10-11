import { Fragment } from "react";
import { DeliveryType } from "../../types";

import "./DeliveryTypes.css";

type Props = {
  list?: DeliveryType[];
};

type DeliveryTypes = {
  [k in DeliveryType]: string;
};

const dtypes: DeliveryTypes = {
  1: "Доставка",
  2: "Самовывоз",
  3: "ПВЗ",
  4: "Почта",
};

export const DeliveryTypes = ({ list }: Props) => {
  if (!list) {
    return null;
  }

  return (
    <span className="DeliveryTypes">
      {list.map((deliveryType, idx) => (
        <Fragment key={deliveryType}>
          {idx > 0 && <span className="DeliveryTypes--separator"> - </span>}
          <span className="DeliveryTypes--item">{dtypes[deliveryType]}</span>
        </Fragment>
      ))}
    </span>
  );
};
