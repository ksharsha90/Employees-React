import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { baseUrl } from "../shared";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    axios.post(`${baseUrl}/customers/`, {name: name, industry: industry})
    .then((res) => {
      if(res.status === 201) {
        setOpen(false);
        window.location.reload();
      }
    })
    .catch((error) => console.log(error))
  }

  const cancelButtonRef = useRef(null);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-1 sm:mx-auto sm:w-full sm:max-w-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
       + Add Customer
      </button>
      {showModal ? (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={() => setShowModal(false)}
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
                          Add Employee
                        </h2>
                      </div>
                      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form
                          className="space-y-6"
                          id="addmodal"
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
                                value={name}
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
                                value={industry}
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
                        form="addmodal"
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setShowModal(false)}
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
