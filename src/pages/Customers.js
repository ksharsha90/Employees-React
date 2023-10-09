import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import {baseUrl} from '../shared'

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const customersData = async () => {
    await axios.get(baseUrl + '/customers/')
    .then((res) => {
      setCustomers(res.data)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    customersData();
  }, []);

  return (
    <div>
      <h1>List of customers</h1>
      {customers &&
        customers.map((customer) => {
          return (
            <Link to={`${customer.id}/`} key={customer.id}>
              <p className="underline">{customer.name}</p>  
             </Link>
            )
        })}
    </div>
  );
};

export default Customers;
