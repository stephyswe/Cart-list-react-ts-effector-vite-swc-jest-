import { CartItem, CartItemAction } from "../../types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { CountBlock } from "./components/CountBlock/CountBlock";
import "./ProductCard.css";

type Props = CartItem & {
  cartId: number;
  onDelete: (params: CartItemAction) => void;
  onFavorite: (params: CartItemAction) => void;
};

export const ProductCard = (props: Props) => {
  const { id, count, img, name, price, cartId, onDelete, onFavorite } = props;

  const favoriteHandler = () => {
    onFavorite({ itemId: id, cartId });
  };

  const deleteHandler = () => {
    onDelete({ itemId: id, cartId });
  };

  return (
    <div className="ProductCard">
      <div className="ProductCard--image-wrapper">
        <img src={img} alt="" className="ProductCard--image" />
      </div>
      <div className="ProductCard--details">
        <div className="ProductCard--price">{price} руб.</div>
        <div className="ProductCard--name">{name}</div>
        <div className="ProductCard--actions-wrapper">
          <CountBlock count={count} />
          <div className="ProductCard--action ProductCard--action-favorites">
            <button onClick={favoriteHandler}>
              <FavoriteIcon size={24} />
            </button>
          </div>
          <div className="ProductCard--action ProductCard--action-delete">
            <button onClick={deleteHandler}>
              <DeleteIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
