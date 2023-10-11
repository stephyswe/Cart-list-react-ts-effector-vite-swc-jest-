import { useUnit } from "effector-react";

import { cartService } from "../../services";
import { Cart } from "../../types";
import { ProductList } from "../ProductList/ProductList";
import { Summary } from "../Summary/Summary";

import { Header } from "./components/Header/Header";
import "./CartListItem.css";

export const CartListItem = (props: Cart) => {
  const { id, title, items, photo, itemsCount, totalPrice, deliveryTypes } =
    props;

  const onDeleteCart = useUnit(cartService.cartDeleteEvent);
  const onDeleteItem = useUnit(cartService.deleteItemEvent);
  const onFavoriteItem = useUnit(cartService.favoriteItemEvent);

  const deleteCartHandler = () => {
    onDeleteCart(id);
  };

  return (
    <section className="CartListItem">
      <Header
        photo={photo}
        title={title}
        deliveryTypes={deliveryTypes}
        onClearCart={deleteCartHandler}
      />
      <div className="CartListItemBody">
        <ProductList
          cartId={id}
          items={items}
          onDelete={onDeleteItem}
          onFavorite={onFavoriteItem}
        />
        <div className="CartListItemBody--summary-wrapper">
          <Summary count={itemsCount} price={totalPrice} />
        </div>
      </div>
    </section>
  );
};
