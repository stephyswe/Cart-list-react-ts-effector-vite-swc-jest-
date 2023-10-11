import { fork, allSettled, Scope, Store, Effect } from "effector";
// import { render, screen, fireEvent, act } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";

import { cartService } from "../.";
import { cartListMock } from "../../mocks/cartListMock";

describe("Сart service", () => {
  let scope: Scope;
  let getCartListFxMock: jest.Mock;
  const { domain, gate, $cartList, $isLoadingError, cartDeleteEvent } =
    cartService;

  beforeEach(() => {
    getCartListFxMock = jest.fn(() => cartListMock);
    // полный экземпляр effector-приложения
    scope = fork(domain, {
      // тут можем подменять значения из стора
      // values: new Map<Store<any>([
      //   [cartService.$cartList],
      // ]),
      handlers: new Map<Effect<any, any, any>, Function>([
        [cartService.getCartListFx, getCartListFxMock],
      ]),
    });
  });

  describe("Монтирование компонента", () => {
    it("Запрашивает данные и помещает в стор", async () => {
      await allSettled(gate.open, { scope, params: {} });
      expect(getCartListFxMock).toHaveBeenCalled();
      expect(scope.getState($cartList)).toEqual(cartListMock);
    });

    it("При ошибке, меняется значение стора для ошибки", async () => {
      getCartListFxMock.mockRejectedValueOnce(new Error("Я усталъ"));
      await allSettled(gate.open, { scope, params: {} });
      expect(scope.getState($cartList)).toHaveLength(0);
      expect(scope.getState($isLoadingError)).toBeTruthy();
    });
  });

  describe("Корзина", () => {
    it("При удалении корзины, она пропадает из стора", async () => {
      scope = fork(domain, {
        // тут можем подменять значения из стора
        values: [[cartService.$cartList, cartListMock]],
      });

      const cartIdToDelete = 1;

      expect(scope.getState($cartList)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: cartIdToDelete }),
        ])
      );

      await allSettled(cartDeleteEvent, { scope, params: cartIdToDelete });

      expect(scope.getState($cartList)).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: cartIdToDelete }),
        ])
      );
    });
  });
});
