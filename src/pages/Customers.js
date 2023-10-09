import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const customersData = async () => {
    await axios
      .get(baseUrl + "/customers/")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    customersData();
    console.log("rendering..");
  }, []);

  return (
    <>
      <div>
        <h1>List of customers</h1>
        {customers &&
          customers.map((customer) => {
            return (
              <Link to={`${customer.id}/`} key={customer.id}>
                <p className="underline">{customer.name}</p>
              </Link>
            );
          })}
      </div>
      <div>
        <AddCustomer />
      </div>
    </>
  );
};

export default Customers;
