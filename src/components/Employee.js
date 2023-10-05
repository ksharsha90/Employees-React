import { useState } from "react";
import EditEmployee from "./EditEmployee";

function Employee(props) {
  const [showModal, setShowModal] = useState(false);
  console.log(props, "props")

  return (
    <div className="py-8 m-2 px-8 max-w-sm bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="object-cover rounded-full h-[100px] w-[100px] block mx-auto sm:mx-0 sm:shrink-0"
        src={props.img}
        alt="Woman's Face"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">{props.role}</p>
        </div>

        <EditEmployee
          showModal={showModal}
          setShowModal={setShowModal}
          id={props.id}
          name={props.name}
          role={props.role}
          img={props.img}
          updateEmployee={props.updateEmployee}
        />

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default Employee;
