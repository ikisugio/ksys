import { useState } from "react";

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [intro, setIntro] = useState(user.intro);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...user, name, intro });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      ></textarea>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditUserForm;
