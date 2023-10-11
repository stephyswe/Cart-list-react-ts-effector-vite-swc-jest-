import { createDomain, sample, combine } from "effector";
import { createGate } from "effector-react";

import { Cart, CartItemAction } from "../../types";
import { cartListMock } from "../../mocks/cartListMock";

export const createCartService = () => {
  // домен
  const domain = createDomain("Cart");

  // gate - связка с react-компонентом
  const gate = createGate();

  // события
  const fetchedEvent = domain.createEvent<Cart[]>();
  const fetchNextEvent = domain.createEvent();
  const nextFetchedEvent = domain.createEvent<Cart[]>();
  const deleteItemEvent = domain.createEvent<CartItemAction>();
  const favoriteItemEvent = domain.createEvent<CartItemAction>();
  const cartDeleteEvent = domain.createEvent<number>();

  // стор
  const $cartList = domain.createStore<Cart[]>([]);
  const $isLoadingError = domain.createStore<boolean>(false);
  const $isLoadingNextError = domain.createStore<boolean>(false);
  const $isAllCartLoaded = domain.createStore<boolean>(false);

  // вычисляемые значения
  const $isFetchNextAvailable = combine(
    [$cartList, $isAllCartLoaded],
    ([carts, isAllLoaded]) => carts.length < cartListMock.length && !isAllLoaded
  );

  // эффекты
  const getCartListFx = domain.createEffect<void, Cart[], Error>();
  const fetchNextCartListFx = domain.createEffect<void, Cart[], Error>();

  // состояния эффектов
  const $initialDataLoading = getCartListFx.pending;
  const $nextDataLoading = fetchNextCartListFx.pending;

  // реализация эффектов
  getCartListFx.use(async () => {
    const promise = new Promise<Cart[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(cartListMock.slice(0, 2));
      }, 2000);
    });
    return await promise;
  });

  fetchNextCartListFx.use(async () => {
    const promise = new Promise<Cart[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(cartListMock.slice(2));
      }, 1000);
    });
    return await promise;
  });

  // обработка событий на сторах
  sample({
    clock: fetchedEvent,
    target: $cartList,
  });

  // добавление корзин в список
  $cartList.on(nextFetchedEvent, (prevState, newCarts) => {
    console.log(newCarts);
    return [...prevState, ...newCarts];
  });

  // При маунте компонента запрашиваем корзины
  sample({
    clock: gate.open,
    target: getCartListFx,
  });

  // После запроса корзин, создаем событие об их загрузке
  sample({
    clock: getCartListFx.doneData,
    target: fetchedEvent,
  });
  // если возникла ошибка, кладем true в стор ошибки
  sample({
    clock: getCartListFx.failData,
    fn: () => true,
    target: $isLoadingError,
  });

  // при запросе следующих корзин, дергаем эффект
  sample({
    clock: fetchNextEvent,
    target: fetchNextCartListFx,
  });

  // после загрузки следующих корзин, кладем их в событие
  sample({
    clock: fetchNextCartListFx.done,
    // забираем из эффекта данные и кладем их в target
    // тут done, вместо doneData для примера
    fn: ({ result }) => result,
    target: nextFetchedEvent,
  });
  // при запросе последних корзин меняем флаг
  // загрузки всех корзин
  sample({
    clock: fetchNextCartListFx.doneData,
    fn: () => true,
    target: $isAllCartLoaded,
  });
  // если возникла ошибка, кладем true в стор ошибки
  sample({
    clock: fetchNextCartListFx.failData,
    fn: () => true,
    target: $isLoadingNextError,
  });

  // удаление товара из корзины
  $cartList.on(deleteItemEvent, (carts, event) => {
    const cartIdx = carts.findIndex((cart) => cart.id === event.cartId);

    if (cartIdx < 0) {
      return carts;
    }

    const cartItem = carts[cartIdx];
    const itemToDelete = cartItem.items.findч(
      (item) => item.id === event.itemId
    );

    if (!itemToDelete) {
      return carts;
    }

    // если в корзине один товар, удаляем корзину
    if (cartItem.items.length === 1) {
      return carts.filter((cart) => cart.id !== event.cartId);
    }

    const updatedCart: Cart = {
      ...cartItem,
      items: cartItem.items.filter((cartItem) => cartItem !== itemToDelete),
    };

    return [
      ...carts.slice(0, cartIdx),
      updatedCart,
      ...carts.slice(cartIdx + 1),
    ];
  });
  // удаление корзины
  $cartList.on(cartDeleteEvent, (state, cartId) =>
    state.filter((cart) => cart.id !== cartId)
  );

  return {
    domain,
    gate,

    $cartList,
    $isFetchNextAvailable,
    $isLoadingError,
    $isLoadingNextError,
    $isAllCartLoaded,

    $initialDataLoading,
    $nextDataLoading,

    fetchedEvent,
    fetchNextEvent,
    nextFetchedEvent,
    deleteItemEvent,
    cartDeleteEvent,
    favoriteItemEvent,

    getCartListFx,
    fetchNextCartListFx,
  };
};
