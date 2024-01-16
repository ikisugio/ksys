import {
  listUser,
  createUser,
  retrieveUser,
  updateUser,
  destroyUser,
} from "@/api/userApi";
import { useState } from "react";
import DisplayUserList from "@/components/exp/DisplayUserList";
import EditUserForm from "@/components/exp/EditUserForm";
import "@/styles/drawer.css";

const InquiryForm = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleFetchButtonClick = async () => {
    const response = await listUser();
    setUsers(response);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowDrawer(true);
  };

  const handleSave = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
    setShowDrawer(false);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowDrawer(false);
  };

  return (
    <div style={{ maxHeight: "80vh", overflow: "auto" }}>
      <button onClick={handleFetchButtonClick}>Fetch</button>
      <button onClick={() => console.log("showDrawer:", showDrawer)}>
        check
      </button>
      <DisplayUserList users={users} onEdit={handleEdit} />
      {showDrawer && (
        <div className={`styled-drawer ${showDrawer ? "showDrawer" : ""}`}>
          <EditUserForm
            user={editingUser}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}
      {editingUser ? <div>test on</div> : <div>fuga off</div>}
      {showDrawer ? <div>1111test on</div> : <div>1111fuga off</div>}
    </div>
  );
};

export default InquiryForm;
