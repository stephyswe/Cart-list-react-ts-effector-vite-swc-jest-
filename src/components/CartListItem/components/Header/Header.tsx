import { DeliveryType } from "../../../../types";

import { DeliveryTypes } from "../DeliveryTypes/DeliveryTypes";

type Props = {
  photo: string;
  title: string;
  onClearCart: () => void;
  deliveryTypes?: DeliveryType[];
};

export const Header = ({ photo, title, deliveryTypes, onClearCart }: Props) => (
  <header className="CartListItemHeader">
    <div className="CartListItemHeader--image-wrapper">
      <img src={photo} alt="" className="CartListItemHeader--image" />
    </div>
    <div className="CartListItemHeader--details">
      <h2 className="CartListItemHeader--title">{title}</h2>
      <span className="CartListItemHeader--delivery-types">
        <DeliveryTypes list={deliveryTypes} />
      </span>
    </div>
    <div className="CartListItemHeader--actions">
      <button className="CartListItemHeader--action-btn">
        Написать продавцу
      </button>
      <button className="CartListItemHeader--action-btn" onClick={onClearCart}>
        Удалить все товары
      </button>
    </div>
  </header>
);
