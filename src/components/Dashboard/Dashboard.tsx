import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { json, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Login/AuthContext';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import TableCoins from '../Table/TableCoins';

interface Customer {
  id: number;
  name: string;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  balance: number;
}

function Dashboard() {
  

  const navigate = useNavigate()
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== "true") {
      navigate("/")
    }
  }, [])
  const [customers, setCustomers] = useState<Customer[] | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    const getData = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoins(res.data);
        console.log(res.data);
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
      <section className='profile-section'>
        <div className='container'>
          <header>Edit Profile</header>
            <div className="row">
              <input
                type="text"
                placeholder="Search a Coin"
                className="form-control bg-dark text-light border-0 mt-4 text-center"
                autoFocus
                onChange={(e) => setSearch(e.target.value)}
              />

              <TableCoins coins={coins} search={search} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard