import Cookies from "js-cookie";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../src/store/GlobaState";
import { postData } from "../src/untils/fetchData";
import { useRouter } from "next/router";
import styles from "../src/styles/signin.module.scss";
import { NavLink, useHistory } from "react-router-dom";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import { ROUTER } from "../src/untils/router";
import {AiFillEye,AiOutlineEyeInvisible} from 'react-icons/ai';
import { validateEmail, validateNumber, validString } from "../src/untils/valid";

const imageSiginURl = 'https://res.cloudinary.com/nextecomerce/image/upload/v1632218537/next_media/bgLogin_uahjju.jpg';


export default function Sigin() {
  const initalState = { email: "", password: "" };
  const router = useRouter();
  const [userData, setUserData] = useState(initalState);
  const [showPass, setShowPass] = useState(false);
  const { email, password } = userData;
  const [state, dispath] = useContext(DataContext);
  const { auth } = state;

  const onSetShowPass = () => {
    setShowPass(!showPass);
  }
  const hanldeInputChangeValue = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispath({ type: "NOTIFY", payload: {} });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispath({ type: "NOTIFY", payload: { loading: true } });

    if (email.length < 1 || password.length < 1 ) {
      return dispath({ type: 'NOTIFY', payload: { err: 'Bạn chưa nhập liệu' } })
    }
    if (!validateEmail(email)) {
      return dispath({ type: 'NOTIFY', payload: { err: 'Đây không phải email' } })
    }

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
  console.log(userData)
  return (
    <div className={styles.wrapper} >
      <div className={styles.container}>
        <img src={imageSiginURl} className={styles.img} alt='img-bg' />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.wrapperForm}>
            <a className={styles.titlePage} href={ROUTER.home}>KT Shop</a>
            <div>
              <Input
                placeholder="Nhập emai đăng nhập"
                name="email"
                id="email"
                value={email}
                label='Email '
                ClassNameLabel={styles.text}
                className={styles.input}
                onChange={hanldeInputChangeValue}
              />
              <div className={styles.passwordWrapper}>
                <p className={styles.text}>Mật khẩu</p>
                <Input
                  placeholder="Nhập mật khẩu"
                  name="password"
                  id="password"
                  type={showPass?'text':'password'}
                  value={password}
                  className={styles.input}
                  onChange={hanldeInputChangeValue}
                />
                {showPass ?<AiOutlineEyeInvisible onClick={onSetShowPass} className={styles.iconPassword}/>:<AiFillEye onClick={onSetShowPass}  className={styles.iconPassword}/>}
              </div>

              <Button type="submit" className={styles.button} text='Đăng nhập' />
            </div>
            <p className={styles.textNav}>
              Bạn không có tài khoản?
              <Link href="/register" >
                <a href="/register" className={styles.link}>
                  Đăng ký
                </a>
              </Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
