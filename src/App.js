import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "./components/AddEmployee";

function App() {
  const [role, setRole] = useState("Dev");
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Caleb",
      role: "Intern",
      img: "https://images.pexels.com/photos/6404665/pexels-photo-6404665.jpeg",
    },
    {
      id: 2,
      name: "Harsha",
      role: "Dev",
      img: "https://images.pexels.com/photos/2553653/pexels-photo-2553653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      name: "John",
      role: "Devops",
      img: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      name: "Smilga",
      role: "CTO",
      img: "https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      name: "Justin",
      role: "Manager",
      img: "https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 6,
      name: "Mitchell",
      role: "SDE",
      img: "https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if (id == employee.id) {
        console.log("Coming!!");
        return { ...employee, name: newName, role: newRole };
      }
      console.log("Not to if statement!");
      return employee;
    });
    console.log(newName, newRole, "New inputs");
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    console.log(newEmployee, "newEmployee")
    setEmployees([ ...employees, newEmployee ]);
  }

  const showEmployess = true;

  return (
    <div className="flex flex-wrap">
      {showEmployess ? (
        <>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />
          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              return (
                <Employee
                  id={employee.id}
                  key={uuidv4()}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  updateEmployee={updateEmployee}
                />
              );
            })}
          </div>
          <AddEmployee
            showModal={showModal}
            setShowModal={setShowModal}
            newEmployee={newEmployee}
          />
        </>
      ) : (
        "No employees available!"
      )}
    </div>
  );
}

export default App;
