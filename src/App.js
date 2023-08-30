import "./App.css";
import Employee from "./components/Employee";
import { useState } from "react";

function App() {
  const [role, setRole] = useState("Dev");

  const showEmployess = true;
  return (
    <div className="App">
      {showEmployess ? (
        <>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value)
            }} 
          />
          <Employee name="Harsha" role="Intern" />
          <Employee name="John" role={role} />
          <Employee name="Cilsey" role={role} />
          <Employee name="Justin" role="HR" />
          <Employee name="Smilga" role="Marketing Manager" />
          <Employee name="Caleb" role="Digital Marketing" />
        </>
      ) : (
        "No employees available!"
      )}
    </div>
  );
}

export default App;
