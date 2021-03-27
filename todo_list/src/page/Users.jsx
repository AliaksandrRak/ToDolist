import React, { useState } from "react";
import MyTable from "../utils/MyTable";
import "./Users.sass";

import myFetch from "../utils/myFetch";
import config from "../config";
import MyTableContol from "../utils/MyTableContol";

const getUsersFetch = () => {
  return myFetch(config.user, "GET");
};

function Users(props) {
  const [users, setUsers] = useState([]);
  const [checking, setChecking] = useState([]);

  const getUsers = ()=> {
    getUsersFetch().then((res) => {
      console.log(res);
      setUsers(res);
    });
  }

  const clearChecking = ()=> {
    setChecking([]);
  }

  if (!users.length) {
    getUsers();
  }

  return (
    <div className="users">
      <div className="users-content">
        <div className="users-content-header">
          <MyTableContol 
          checking={checking}
          data={users}
          getUsers={getUsers}
          clearChecking={clearChecking}
           />
        </div>
        <div className="users-content-table">
          <MyTable
            isChecked={true}
            headers={["login", "pass"]}
            data={users}
            checking={checking}
            setChecking={setChecking}
          ></MyTable>
        </div>
      </div>
    </div>
  );
}

export default Users;
