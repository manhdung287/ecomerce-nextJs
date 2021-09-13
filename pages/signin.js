import Cookies from "js-cookie";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobaState";
import { postData } from "../untils/fetchData";
import { useRouter } from "next/router";
import styles from "../styles/signin.module.scss";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";


export default function Sigin() {
  const initalState = { email: "", password: "" };
  const router = useRouter();
  const history = useHistory();
  const [userData, setUserData] = useState(initalState);
  const { email, password } = userData;
  const [state, dispath] = useContext(DataContext);
  const { auth } = state;
  const hanldeInputChangeValue = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispath({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispath({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/login", userData);
    if (res.err) return dispath({ type: "NOTIFY", payload: { err: res.err } });

    dispath({ type: "NOTIFY", payload: { success: res.msg } });

    dispath({
      type: "AUTH",
      payload: {
        token: res.acceess_token,
        user: res.user,
      },
    });

    Cookies.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("FirstLogin", true);
    router.back();
  };

  useEffect(() => {
    if (Object.keys(auth).length > 0) {
      router.back();
    }
  }, [auth]);

  return (
    <div className={styles.wrapper} >
      <img className={styles.img} src='https://res.cloudinary.com/nextecomerce/image/upload/v1631523410/next_media/cafe-5635015_1920_eiycst.jpg' alt='' height={600}/>
      <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.wrapperForm}>
      <p className={styles.titlePage}>Sigin</p>
      <div>
      <Input
          placeholder="Email"
          name="email"
          id="email"
          value={email}
          label='Email'
          ClassNameLabel={styles.text}
          className={styles.input}
          onChange={hanldeInputChangeValue}
        />
       
        <Input
          placeholder="passWord"
          name="password"
          id="password"
          value={password}
          className={styles.input}
          label='Pass'
          ClassNameLabel={styles.text}
          onChange={hanldeInputChangeValue}
        />
          <Button type="submit" className={styles.button} text='Sign'/>
      </div>
        <p className={styles.text}>
          You don't have a account?
          <Link href="/register">
            <a href="/register" className={styles.link}>
              Register
            </a>
          </Link>
        </p>
        </div>
      </form>
    </div>
  );
}
