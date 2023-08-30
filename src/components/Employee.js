function Employee(props) {
  return (
    <>
      <h3>Employee: {props.name} </h3>
      <p>
        Role:{" "}
        {props.role ? (
          <span>{props.role}</span>
        ) : (
          <span>
           <b>{"No Role"}</b>
          </span>
        )}
      </p>
    </>
  );
}

export default Employee;
