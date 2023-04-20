import React from "react";
import "./style.scss"


const TableCoins = ({ coins, search }: any) => {
  const filteredCoins = coins.filter((coin:any) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!coins) return <div>no coins</div>

  return (
      <div className="container">
        <section className="table__body">
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Image </th>
                        <th> Symbol </th>
                        <th> Price </th>
                        <th> High Value </th>
                        <th> Low Value </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCoins.map((coin: any) => (
                      <tr>
                        <td>{coin.name}</td>
                        <td><img src={coin.image} alt="" /></td>
                        <td>{coin.symbol}</td>
                        <td>{coin.current_price}</td>
                        <td className="high-price">{coin.high_24h}</td>
                        <td className="low-price">{coin.low_24h}</td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </section>
      </div>
  );
};

export default TableCoins;