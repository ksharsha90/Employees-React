import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../shared";

export default function EditCustomer(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [customerData, setCustomerData] = useState({});

  const navigate = useNavigate();

  const cancelButtonRef = useRef(null);

  const { id } = useParams();

  const getCustomerData = async () => {
    await axios
      .get(`${baseUrl}/customers/${id}/`)
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch((error) => console.log(error));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(`${baseUrl}/customers/${id}/`, {name: name, industry: industry})
      .then((res) => {
        if (res.status === 200) {
          setOpen(false);
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    getCustomerData();
    console.log("...rendering")
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
      >+ Edit Customer</button>
      {setOpen ? (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={() => setOpen(false)}
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
                      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                          Edit Employee
                        </h2>
                      </div>
                      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                          className="space-y-6"
                          id="editmodal"
                          onSubmit={handleSubmit}
                        >
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                            Name
                            </label>
                            <div className="mt-2">
                              <input
                                id="name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                placeholder="Enter Name"
                                required
                                defaultValue={customerData.name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="industry"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Industry
                            </label>
                            <div className="mt-2">
                              <input
                                id="industry"
                                name="industry"
                                type="industry"
                                autoComplete="industry"
                                placeholder="Enter Industry"
                                required
                                defaultValue={customerData.industry}
                                onChange={(e) => {
                                  setIndustry(e.target.value);
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        form="editmodal"
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        // ref={cancelButtonRef}
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
      ) : null}
    </>
  );
}
