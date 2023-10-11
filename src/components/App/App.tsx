import { useGate, useStore } from "effector-react";
import { cartService } from "../../services";
import { CartList } from "../CartList/CartList";
import { Spinner } from "../Spinner/Spinner";
import "./App.css";

export const App = (): JSX.Element => {
  useGate(cartService.gate);
  const isLoading = useStore(cartService.$initialDataLoading);

  return <div className="App">{isLoading ? <Spinner /> : <CartList />}</div>;
};
