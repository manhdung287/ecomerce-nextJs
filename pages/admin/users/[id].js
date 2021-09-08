import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../../../store/GlobaState";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import CheckBox from "../../../components/CheckBox";
import { patchData } from "../../../untils/fetchData";

const Userdetai = () => {
  const router = useRouter();
  const { id } = router.query;

  const [state, dispath] = useContext(DataContext);
  const { auth, users } = state;

  const [editUser, SetEditUser] = useState({});

  const [checkAdmin, setAdmin] = useState(false);
  const [checkManager, setManager] = useState(false);
  const [checkContent, setContent] = useState(false);

  const goback = () => {
    router.back();
  };

  const handleInput = () => {};

  const handleSetAdmin = () => {
    setAdmin(!checkAdmin);
  };
  const handleSetManager = () => {
    setManager(!checkManager);
  };
  const handleSetContent = () => {
    setContent(!checkContent);
  };

  const onUpdate = () => {
    patchData(
      `user/edituser/${id}`,
      { checkAdmin, checkContent, checkManager },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });
      return dispath({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === id) {
        SetEditUser(user);
        setAdmin(user.isAdmin);
        setContent(user.isContent);
        setManager(user.isManager);
      }
    });
  }, [users]);

  if (!editUser) return null;
  
  return (
    <div>
      <Button onClick={goback} text="back" />
      <img src={editUser.avartar} alt="null" />
      <div>
        <Input
          onChange={handleInput}
          value={editUser.name|| ' '}
          label="Name"
          disabled
        />
        <Input
          onChange={handleInput}
          value={editUser.email|| ' '}
          label="email"
          disabled
          name="email"
        />
        <CheckBox
          onChange={handleSetAdmin}
          checked={checkAdmin}
          id="isAdmin"
          label="isAdmin"
          name="isAdmin"
          value={checkAdmin||''}
        />
       
        <CheckBox
          onChange={handleSetContent}
          checked={checkContent}
          id="isContent"
          label="isContent"
          name="isContent"
          value={checkContent||''}
        />
         <CheckBox
          onChange={handleSetManager}
          checked={checkManager}
          id="isManager"
          label="isManager"
          name="isManager"
          value={checkManager||''}
        />
      </div>
      <br />
      <Button text="Update" onClick={onUpdate} />
    </div>
  );
};
export default Userdetai;
