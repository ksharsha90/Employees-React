import React from "react";
import { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import { baseUrl } from "../shared";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import EditCustomer from "../components/EditCustomer";

export default function Customer() {
  const [customer, setCustomer] = useState({});
  const [notFound, setNotFound] = useState("");
  const [open, setOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);

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

  const handleDelete = async (id) => {
    await axios
      .delete(`${baseUrl}/customers/${id}`)
      .then((res) => {
        setOpen(true);
        navigate("/customers/");
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = async (id) => {
    await axios
      .patch(`${baseUrl}/customers/${id}`)
      .then((res) => {
        console.log("updated!");
      })
      .catch((error) => console.log(error));
  };

  if (notFound) {
    return (
      <div>
        <p className="mb-4">{`the customer ${
          customer && customer.name ? customer.name : id
        } 
        you are looking was not found!`}</p>
        <Link to="/customers" className="underline">
          Go back to customers
        </Link>
      </div>
    );
  }

  if (open) {
    return (
      <>
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete Customer {customer.name} ?
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete the customer? All
                              of your customer data will be permanently removed.
                              This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          handleDelete(id);
                          setOpen(false);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
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
      <div className="flex justify-start">
        <button
          className="rounded-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 "
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete
        </button>
        <Link to="/customers/" key={customer.id}>
          <button className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
            Go Back
          </button>
        </Link>
        
           <div>

           <EditCustomer open={open} setOpen={setOpen} />
           </div>
      </div>
    </div>
  );
}
