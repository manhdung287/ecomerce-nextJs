import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from '../signin.module.scss';
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { ROUTER } from "../../untils/router";


const imageSiginURl = 'https://res.cloudinary.com/nextecomerce/image/upload/v1632218537/next_media/bgLogin_uahjju.jpg';

export default function Register() {
  const initalState = { name: "", email: "", password: "", confirmpass: "" };
  const [userData, setUserData] = useState(initalState);
  const { name, email, password, confirmpass } = userData;
  const [showPass, setShowPass] = useState(false);
  const [state, dispath] = useContext(DataContext);
  const router = useRouter();
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
    const errMsg = valid(name, email, password, confirmpass);
    if (errMsg) return dispath({ type: "NOTIFY", payload: { err: errMsg } });
    dispath({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);
    if (res.err) return dispath({ type: "NOTIFY", payload: { err: res.err } });

    dispath({ type: "NOTIFY", payload: { loading: false } });
    dispath({ type: "NOTIFY", payload: { success: "Register Success" } });
    const resLogin = await postData('auth/login', userData);

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
    <div className={styles.wrapper} >
      <div className={styles.container}
        style={{ backgroundImage: `url(${imageSiginURl})`, backgroundPosition: 'center' }}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.wrapperForm}>
            <a className={styles.titlePage} href={ROUTER.home}>KT Shop</a>
            <Input
              placeholder="Nhập emai đăng ký"
              name="name"
              id="name"
              value={name}
              label='Tên '
              ClassNameLabel={styles.text}
              className={styles.input}
              onChange={hanldeInputChangeValue}
            />
            <Input
              placeholder="Nhập emai đăng ký"
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
                type={showPass ? 'text' : 'password'}
                value={password}
                className={styles.input}
                onChange={hanldeInputChangeValue}
              />
              {showPass ? <AiOutlineEyeInvisible onClick={onSetShowPass}
                className={styles.iconPassword} /> : <AiFillEye onClick={onSetShowPass}
                  className={styles.iconPassword} />}
            </div>
            <div className={styles.passwordWrapper}>
              <p className={styles.text}>Xác thực mật khẩu</p>
              <Input
                placeholder="Nhập lại mật khẩu"
                name="confirmpass"
                id="confirmpass"
                type={showPass ? 'text' : 'password'}
                value={confirmpass}
                className={styles.input}
                onChange={hanldeInputChangeValue}
              />
              {showPass ? <AiOutlineEyeInvisible onClick={onSetShowPass} className={styles.iconPassword} /> : <AiFillEye onClick={onSetShowPass} className={styles.iconPassword} />}
            </div>
            <Button type="submit" className={styles.button} text='Đăng Ký' />
            <p className={styles.textNav}>
              Bạn không có tài khoản?
              <Link href={ROUTER.sigin}  >
                <a href={ROUTER.sigin} className={styles.link}> Đăng nhập</a>
              </Link>
            </p>

          </div>
        </form>

      </div>
    </div>
  );

}
