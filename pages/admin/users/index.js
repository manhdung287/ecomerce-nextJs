import React, { useContext, useEffect, useState } from "react";
import NavLink from "../../../components/NavLink";
import { DataContext } from "../../../store/GlobaState";
import { ROUTER } from "../../../untils/router";
import styles from "./users.module.scss";

function Users() {
  const [state, dispath] = useContext(DataContext);
  const { users } = state;

  if (!users) return null;

  console.log(users);
  return (
    <div>
      Users
      <div>
        {users.map((item) => (
          <div key={item._id} className={styles.item}>
            <img src={item.avartar} alt="null" className={styles.avartar} />
            <p>{item.role}</p>
            <NavLink to={ROUTER.userLink(item._id)} text={item.email} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Users;
