import "./CountBlock.css";

type Props = {
  count: number;
};

export const CountBlock = ({ count }: Props) => {
  return (
    <div className="CountBlock">
      <button className="CountBlock--button">-</button>
      <div className="CountBlock--count">{count}</div>
      <button className="CountBlock--button">+</button>
    </div>
  );
};
