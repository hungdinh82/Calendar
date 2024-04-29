import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import { EyeTwoTone, EyeInvisibleTwoTone, GoogleOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import logoFacebook from '../../imgs/face.png'
import logo from '../../imgs/logo1.png'
import styles from './Login.module.scss';
import '../Signup/library.scss'
import { useSignInMutation } from '../../app/api/authService';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [isHidePass, setIsHidePass] = useState(true);
    const [signIn] = useSignInMutation();

    const handleChangeMail = (e) => {
        setMail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleClickSubmit = (e) => {
        e.preventDefault();
        // let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
        signIn({ mail, password})
        .then((res) => {
            if (res.data) {
                localStorage.setItem("currentUser", res.data);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Đăng nhập thành công",
                    confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
                })
                navigate("/");
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Sai tài khoản hoặc mật khẩu",
                    confirmButtonText: '<div class="fa fa-thumbs-up"}>Nhập lại!</div>',
                })
            }
        }) 
        // const user = listAccounts.filter((account) => mail === account.mail && password === account.password)
        // if (user && user[0]) {
        //     localStorage.setItem("currentUserId", user[0].id);
        //     Swal.fire({
        //         icon: "success",
        //         title: "Success",
        //         text: "Đăng nhập thành công",
        //         confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
        //     })
        //     navigate("/");
        // }
        // else {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Error",
        //         text: "Sai tài khoản hoặc mật khẩu",
        //         confirmButtonText: '<div class="fa fa-thumbs-up"}>Nhập lại!</div>',
        //     })
        // }
    };

    useEffect(() => {
        document.title = "Log in";
    }, []);

    return (
        <div className={cx('login') + " login"}>
            <img className={cx('logo')} src={logo} alt="" />
            <div className={cx('grid wide')}>
                <div className={cx('row no-gutters')}>
                    <div className={cx('col l-6 m-12 c-12 l-o-7 m-o-3 c-o-3')}>
                        <div className={cx('wrapper')}>
                            <h1 className={cx('header')}>Log in</h1>

                            <form className={cx('form')} onSubmit={handleClickSubmit}>
                                <input
                                    type="email"
                                    required
                                    className={cx('form-input')}
                                    placeholder="name@gmail.com"
                                    onChange={handleChangeMail}
                                />
                                <div className={cx('form-input-wrapper')}>
                                    <input
                                        type={isHidePass ? "password" : "text"}
                                        required
                                        className={cx('form-input')}
                                        placeholder="Enter your password"
                                        onChange={handleChangePassword}
                                    />
                                    <div className={cx("show-icon")}>
                                        {isHidePass ? (
                                            <EyeTwoTone onClick={() => setIsHidePass(false)} twoToneColor="#9DADBA" />
                                        ) : (
                                            <EyeInvisibleTwoTone onClick={() => setIsHidePass(true)} twoToneColor="#9DADBA" />
                                        )}
                                    </div>

                                </div>

                                <div className={cx('form-options')}>
                                    <div className={cx('select-option')}>
                                        <Checkbox value="agree" defaultChecked >Stay log in</Checkbox>
                                    </div>
                                    <h3 className={cx('link-option')}>Forgot Password?</h3>
                                </div>

                                <button className={cx(
                                    "form-btn",
                                    mail && password
                                        ? "primary"
                                        : ""
                                )}>    Log In
                                </button>
                                <div className={cx('other-login')}>

                                    <div className={cx('char-type')}>
                                        Or With
                                    </div>
                                    <div className={cx('social-btn-all')}>
                                        <div className={cx('social-btn')}>
                                            <div className={cx('social-btn__logo')}>
                                                <GoogleOutlined style={{ fontSize: "3.5rem", color: '#1075dd' }} />
                                            </div>
                                            <h4 className={cx('social-btn__body')}>Sign up with Google</h4>
                                        </div>

                                        <div className={cx('social-btn')}>
                                            <div className={cx('social-btn__logo')}>
                                                <img src={logoFacebook} alt="Logo" />
                                            </div>
                                            <h4 className={cx('social-btn__body')}>Sign up with Facebook</h4>
                                        </div>

                                    </div>

                                    <div className={cx('navigate-sign-up')}>
                                        <span className={cx('navigate-sign-up-text')}>
                                            don't have an account yet? <Link to="/Signup">Sign up</Link>
                                        </span>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
