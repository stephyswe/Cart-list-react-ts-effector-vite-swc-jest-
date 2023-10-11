import "./Summary.css";

type Props = {
  count: number;
  price: string;
};

export const Summary = ({ count, price }: Props) => {
  return (
    <aside className="Summary">
      <div className="Summary--total-wrapper">
        <div className="Summary--total-text">Итого {count} товаров:</div>
        <div className="Summary--tital-price">{price} р.</div>
      </div>
      <div className="Summary--description">
        Способы доставки обговариваются с продавцом
      </div>
      <button className="Summary--checkout-btn">Оформить заказ</button>
    </aside>
  );
};
