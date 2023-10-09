import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";

function App() {
  // const [showModal, setShowModal] = useState(false);
  // const [employees, setEmployees] = useState([
  //   {
  //     id: 1,
  //     name: "Caleb",
  //     role: "Intern",
  //     img: "https://images.pexels.com/photos/6404665/pexels-photo-6404665.jpeg",
  //   },
  //   {
  //     id: 2,
  //     name: "Harsha",
  //     role: "Dev",
  //     img: "https://images.pexels.com/photos/2553653/pexels-photo-2553653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     name: "John",
  //     role: "Devops",
  //     img: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     name: "Smilga",
  //     role: "CTO",
  //     img: "https://images.pexels.com/photos/2586823/pexels-photo-2586823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 5,
  //     name: "Justin",
  //     role: "Manager",
  //     img: "https://images.pexels.com/photos/2743754/pexels-photo-2743754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 6,
  //     name: "Mitchell",
  //     role: "SDE",
  //     img: "https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ]);

  // function updateEmployee(id, newName, newRole) {
  //   const updatedEmployees = employees.map((employee) => {
  //     if (id == employee.id) {
  //       return { ...employee, name: newName, role: newRole };
  //     }
  //     return employee;
  //   });
  //   setEmployees(updatedEmployees);
  // }

  // function newEmployee(name, role, img) {
  //   const newEmployee = {  //     id: uuidv4(),
  //     name: name,
  //     role: role,
  //     img: img,
  //   };
  //   console.log(newEmployee, "newEmployee")
  //   setEmployees([ ...employees, newEmployee ]);
  // }

  // const showEmployess = true;

  return (
    // <div className="App bg-gray-300 min-h-screen">
    //   <Header />
    //   {showEmployess ? (
    //     <div className="flex flex-wrap">
    //       <div className="flex flex-wrap justify-center">
    //         {employees.map((employee) => {
    //           return (
    //             <Employee
    //               id={employee.id}
    //               key={uuidv4()}
    //               name={employee.name}
    //               role={employee.role}
    //               img={employee.img}
    //               updateEmployee={updateEmployee}
    //             />
    //           );
    //         })}
    //       </div>
    //       <AddEmployee
    //         showModal={showModal}
    //         setShowModal={setShowModal}
    //         newEmployee={newEmployee}
    //       />
    //     </div>
    //   ) : (
    //     "No employees available!"
    //   )}
    // </div>
    
      <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/customers/:id" element={<Customer />}></Route>
          <Route path="/dictionary/:search" element={<Definition />}></Route>
          <Route path="/dictionary" element={<Dictionary />}></Route>
          <Route path="/404" element={<NotFound />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        </Header>
      </BrowserRouter>
    
  );
}

export default App;
