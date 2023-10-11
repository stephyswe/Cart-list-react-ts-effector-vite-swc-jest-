import { CartItem, CartItemAction } from "../../types";
import { ProductCard } from "../ProductCard/ProductCard";

import "./ProductList.css";

type Props = {
  cartId: number;
  items: CartItem[];
  onDelete: (params: CartItemAction) => void;
  onFavorite: (params: CartItemAction) => void;
};

export const ProductList = ({ cartId, items, onDelete, onFavorite }: Props) => {
  return (
    <ul className="ProductList">
      {items.map((item, idx) => (
        <>
          {idx > 0 && <div className="ProductList--separator" />}
          <ProductCard
            key={item.id}
            cartId={cartId}
            onDelete={onDelete}
            onFavorite={onFavorite}
            {...item}
          />
        </>
      ))}
    </ul>
  );
};
