import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";

function App() {
  const [role, setRole] = useState("Dev");

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
          <Employee
            name="Harsha"
            role="Intern"
            img="https://images.pexels.com/photos/6404665/pexels-photo-6404665.jpeg"
          />
          <Employee
            name="John"
            role={role}
            img="https://images.pexels.com/photos/6404665/pexels-photo-6404665.jpeg"
          />
          <Employee
            name="Cilsey"
            role={role}
            img="https://images.pexels.com/photos/6404665/pexels-photo-6404665.jpeg"
          />
          <Employee
            name="Justin"
            role="HR"
            img="https://images.pexels.com/photos/6404665/pexels-photo-6404665.jpeg"
          />
          <Employee
            name="Smilga"
            role="Marketing Manager"
            img="https://images.pexels.com/photos/6404665/pexels-photo-6404665.jpeg"
          />
          <Employee
            name="Caleb"
            role="Digital Marketing"
            img="https://images.pexels.com/photos/6404665/pexels-photo-6404665.jpeg"
          />
        </>
      ) : (
        "No employees available!"
      )}
    </div>
  );
}

export default App;
