import Cookies from "js-cookie";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobaState";
import { postData } from "../untils/fetchData";
import { useRouter } from "next/router";
import styles from "../styles/signin.module.scss";
import { ROUTER } from "../untils/router";

export default function Sigin() {
  const initalState = { email: "", password: "" };
  const rouer = useRouter();
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
    rouer.push(ROUTER.home);
  };

  useEffect(() => {
    if (Object.keys(auth).length > 0) {
      rouer.push(ROUTER.home);
    }
  }, [auth]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.text}>Email</p>
        <input
          placeholder="Email"
          name="email"
          id="email"
          value={email}
          className={styles.input}
          onChange={hanldeInputChangeValue}
        />
        <p className={styles.text}>Pass</p>
        <input
          placeholder="passWord"
          name="password"
          id="password"
          value={password}
          className={styles.input}
          onChange={hanldeInputChangeValue}
        />
        <button type="submit" className={styles.button}>
          SignIn
        </button>
        <p className={styles.text}>
          You don't have a account?{" "}
          <Link href="/register">
            <a href="/register" className={styles.link}>
              Register
            </a>
          </Link>
        </p>
      </form>
    </div>
  );
}
