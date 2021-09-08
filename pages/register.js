import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobaState";
import { postData } from "../untils/fetchData";
import valid from "../untils/valid";
import { useRouter } from "next/router";
import { ROUTER } from "../untils/router";
import Button from "../components/Button";
import Input from "../components/Input";
import Cookies from "js-cookie";

export default function Register() {
  const initalState = { name: "", email: "", password: "", confirmpass: "" };
  const [userData, setUserData] = useState(initalState);
  const { name, email, password, confirmpass } = userData;
  const [state, dispath] = useContext(DataContext);
  const router = useRouter();
  const hanldeInputChangeValue = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispath({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, confirmpass);
    if (errMsg) return dispath({ type: "NOTIFY", payload: { err: errMsg } });
    dispath({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);
    if (res.err) return dispath({ type: "NOTIFY", payload: { err: res.err } });

    dispath({ type: "NOTIFY", payload: { loading: false } });
    dispath({ type: "NOTIFY", payload: { success: "Register Success" } });
    const resLogin = await postData('auth/login',userData);

    dispath({
      type: "AUTH",
      payload: {
        token: resLogin.acceess_token,
        user: resLogin.user,
      },
    });

    Cookies.set("refreshtoken", resLogin.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("FirstLogin", true);


    router.push(ROUTER.home);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <p>Name</p>
        <Input
          type="text"
          placeholder="userName"
          name="name"
          value={name}
          id="name"
          onChange={hanldeInputChangeValue}
        />
        <p>Email</p>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          id="email"
          onChange={hanldeInputChangeValue}
        />

        <p>Pass</p>
        <Input
          type="text"
          placeholder="passWord"
          name="password"
          value={password}
          id="password"
          onChange={hanldeInputChangeValue}
        />

        <p>Confirm Pass</p>
        <Input
          type="text"
          placeholder="Confirm passWord"
          name="confirmpass"
          value={confirmpass}
          id="confirmpass"
          onChange={hanldeInputChangeValue}
        />
        <Button type="submit" text="Register" />
        <p>
          You have a account?
          <Link href="/signin">
            <a href="/signin">Login</a>
          </Link>
        </p>
      </form>
    </div>
  );
}
