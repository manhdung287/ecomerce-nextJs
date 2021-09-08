import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { DataContext } from "../store/GlobaState";
import { patchData } from "../untils/fetchData";
import UploadImage from "../untils/uploadImage";
import valid from "../untils/valid";
import styles from "./profile.module.scss";

export default function Profile() {
  const initalState = {
    avartar: null,
    name: "",
    password: "",
    confirmpass: "",
  };
  const [data, setData] = useState(initalState);
  const [state, dispath] = useContext(DataContext);
  const { auth } = state;
  const { user } = auth;
  const { avartar, name, password, confirmpass } = data;

  useEffect(() => {
    if (user) setData({ ...data, name: user.name });
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const onChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispath({
        type: "NOTIFY",
        payload: { err: "File does it exits" },
      });
    if (file.size > 1024 * 1024)
      return dispath({ type: "NOTIFY", payload: { err: "Max size is 1Mb" } });
    if (file.type !== "image/jpeg" && file.type !== "image/png")
      return dispath({
        type: "NOTIFY",
        payload: { err: "This file not format" },
      });
    setData({ ...data, avartar: file });
  };
  const onUpdate = (e) => {
    e.preventDefault();
    if (password) {
      const errmsg = valid(name, user.email, password, confirmpass);
      if (errmsg) dispath({ type: "NOTIFY", payload: { err: errmsg } });
      updatePass();
    }
    if (name !== user.name || avartar) updateInfor();
    dispath({ type: "NOTIFY", payload: { loading: false } });
  };

  const updatePass = () => {
    patchData("user/resetPass", { password }, auth.token).then((res) => {
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });
      return dispath({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const updateInfor = async () => {
    let media;
    if (avartar) media = await UploadImage([avartar]);
    dispath({ type: "NOTIFY", payload: { loading: true } });
    patchData(
      "user",
      {
        name,
        avartar: avartar ? media[0].url : user.avartar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });

      dispath({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      return dispath({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  if (!auth.user) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.uploadAvatarContainer}>
        <img
          src={avartar ? URL.createObjectURL(avartar) : user.avartar}
          alt="null"
          className={styles.avartar}
        />
        <label htmlFor="upload_avatar" className={styles.labelUploadAvatar}>
          Chọn
        </label>
        <Input
          onChange={onChangeAvatar}
          name="upload_avatar"
          type="file"
          id="upload_avatar"
          className={styles.uploadAvatar}
        />
      </div>
      <div className={styles.container}>
        <div>Email</div>
        <Input
          value={user.email}
          onChange={handleInput}
          name="email"
          disabled={true}
          className={styles.buttonAvatar}
        />
      </div>
      <div className={styles.container}>
        <div>Name</div>
        <Input value={name} onChange={handleInput} name="name" />
      </div>
      <div className={styles.container}>
        <div>New PassWord</div>
        <Input
          value={password}
          onChange={handleInput}
          name="password"
          placeholder="new Passs"
        />
      </div>
      <div className={styles.container}>
        <div>New confirm PassWord</div>
        <Input
          value={confirmpass}
          onChange={handleInput}
          name="confirmpass"
          placeholder="Confirm new Passs"
        />
      </div>
      <Button onClick={onUpdate} text="Update" />
    </div>
  );
}
