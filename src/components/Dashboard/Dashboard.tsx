import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Login/AuthContext';
import axios from 'axios';
import TableCoins from '../Table/TableCoins';
import './style.scss'

function Dashboard() {

  const navigate = useNavigate()
  const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
      if (localStorage.getItem('isLoggedIn') !== "true") {
        navigate("/")
      }
    }, [])

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    const getData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoins(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);

  return (
    <div>
      <Navbar/>
      <section className='home-section'>
        <div className="container">
          <div className="input-box">
              <input 
                  type="text" 
                  required 
                  value={search}
                  onChange={(e:any) => {
                    setSearch(e.target.value)}
                  }
              />
              <label htmlFor="">Search Coins</label>
          </div>
          <TableCoins coins={coins} search={search} />
        </div>
      </section>
    </div>
  )
}

export default Dashboard