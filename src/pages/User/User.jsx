import React, { useEffect, useState } from "react";

const User = ({ url }) => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    const res = await axios.get(`${url}/api/user/login`);
    if (res.data.success) {
      setUser(res.data.data);
    } else {
      toast.error("Failed to fetch list");
    }
  };

  return (
    <div className="list add flex-col">
      <p>All User List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Name</b>
          <b>email</b>
          <b>role</b>
          <b>Action</b>
        </div>
        {user.map((item, index) => (
          <div className="list-table-format" key={index}>
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>Admin</p>
            <p className="cursor" onClick={() => removeFood(item._id)}>
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
