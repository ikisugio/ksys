const DisplayUser = ({ users, onEdit }) => {
  const cardStyle = {
    border: "2px solid #aaa",
    borderRadius: "1em",
    padding: "1em",
    margin: "1em",
  };

  return (
    <ul style={{ listStyle: "None", padding: "0" }}>
      {users.map((user) => (
        <li key={user.id} style={cardStyle}>
          <h3>Name: {user.name}</h3>
          <p>Created At: {user.createdAt}</p>
          <p>Intro: {user.intro}</p>
          <button onClick={() => onEdit(user)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default DisplayUser;
