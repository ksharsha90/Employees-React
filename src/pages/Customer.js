import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const [customer, setCustomer] = useState({});
  const [notFound, setNotFound] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const customerData = async () => {
    await axios
      .get(`${baseUrl}/customers/${id}/`)
      .then((res) => {
        if (res.status === 200) {
          setNotFound(false);
          setCustomer(res.data);
        }
      })
      .catch((error) => {
        setNotFound(true);
        console.log(error);
      });
  };

  useEffect(() => {
    customerData();
  }, []);

  if (notFound) {
    return (
      <div>
        <p className="mb-4">{`the customer ${customer && customer.name ? customer.name : id} 
        you are looking was not found!`}</p>
        <Link to="/customers" className="underline">Go back to customers</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Customer Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Role
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customer.industry}
            </dd>
          </div>
        </dl>
      </div>
      <Link to="/customers/" key={customer.id}>
        <p className="underline">Go Back</p>
      </Link>
    </div>
  );
}
