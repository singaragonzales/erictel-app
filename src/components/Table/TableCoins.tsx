import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "./style.scss"


const TableCoins = ({ coins, search }: any) => {
  const filteredCoins = coins.filter((coin:any) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!coins) return <div>no coins</div>

  return (
      <div className="container">
        <table>
          <thead>
            <tr className="table100-head">
              <th className="column1">Name</th>
              <th className="column2">Image</th>
              <th className="column3">Symbol</th>
              <th className="column4">Price</th>
              <th className="column5">High Value</th>
              <th className="column6">Low Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin: any) => (
              <tr>
                <td>{coins.name}</td>
                <td><img style={{width:'30px'}} src={coin.image} alt="" /></td>
                <td className="symbol">{coin.symbol}</td>
                <td>{coin.current_price}</td>
                <td className="high-price">{coin.high_24h}</td>
                <td className="low-price">{coin.low_24h}</td>
              </tr>
            ))}
          </tbody>
      </table>
      </div>
  );
};

export default TableCoins;