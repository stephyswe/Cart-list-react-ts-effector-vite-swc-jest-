import { useList, useStore, useUnit } from "effector-react";

import { CartListItem } from "../CartListItem/CartListItem";
import { LazyFetch } from "../LazyFetch/LazyFetch";
import { Spinner } from "../Spinner/Spinner";

import { cartService } from "../../services";

import "./CartList.css";

export const CartList = () => {
  const fetchNext = useUnit(cartService.fetchNextEvent);
  const showNextFetch = useStore(cartService.$isFetchNextAvailable);
  const isNextLoading = useStore(cartService.$nextDataLoading);

  // формируем список корзин
  const cartList = useList(cartService.$cartList, (cart) => {
    return <CartListItem key={cart.id} {...cart} />;
  });

  return (
    <div className="CartList">
      {cartList}
      {showNextFetch && <LazyFetch onIntersect={fetchNext} />}
      {isNextLoading && <Spinner />}
    </div>
  );
};
