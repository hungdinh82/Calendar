import classNames from 'classnames/bind';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { EyeTwoTone, EyeInvisibleTwoTone, GoogleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from 'antd';

import styles from './Signup.module.scss';
import logoFacebook from '../../imgs/face.png';
import logo from '../../imgs/logo1.png'
import './library.scss'
import avatar from '../../imgs/img6.png';
import avatar_hung from '../../imgs/avatar/hung.png';
import avatar_linh from '../../imgs/avatar/linh.png';
import avatar_nguyet from '../../imgs/avatar/nguyet.jpg'
import avatar_quang from '../../imgs/avatar/quang.jpg'
import avatar_hieu from '../../imgs/avatar/hieu.jpg'
import { useSignUpMutation } from '../../Services/api/authService';


const cx = classNames.bind(styles);

const Signup = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isHidePass, setIsHidePass] = useState(true);
    const [isHideRePass, setIsHideRePass] = useState(true);
    const [isEqualPassword, setIsEqualPassword] = useState(true);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false);
    const [signUp] = useSignUpMutation();


    const handleChangeMail = (e) => {
        setMail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangeRePassword = (e) => {
        setRePassword(e.target.value);
    };
    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
    }

    const handleClickSubmit = async (e) => {
        e.preventDefault();
        if (mail && password) {
            if (password !== rePassword) {
                setIsEqualPassword(false);
                return;
            }
            let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];

            let currentAvatar = "";
            if (userName.includes("quang")) {
                currentAvatar = avatar_quang;
            }
            else if (userName.includes("hung")) {
                currentAvatar = avatar_hung
            }
            else if (userName.includes("linh")) {
                currentAvatar = avatar_linh
            }
            else if (userName.includes("nguyet")) {
                currentAvatar = avatar_nguyet
            }
            else if (userName.includes("hieu")) {
                currentAvatar = avatar_hieu
            }
            else currentAvatar = avatar

            // listAccounts.push({
            //     mail,
            //     password,
            //     userName,
            //     id: Date.now(),
            //     avatar: currentAvatar
            // })
            // localStorage.setItem("listAccounts", JSON.stringify(listAccounts));
            signUp({ mail, password, userName })
                .then((res) => {
                    if (res.data) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Sign Up Successfully",
                            confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
                        }).then((result) => {
                            if (result.isConfirmed) setSuccess(true);
                        });
                        navigate('/Login')
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Sign Up Failed",
                            confirmButtonText: '<div class="fa fa-thumbs-up"}>Nhập lại!</div>',
                        })
                    }

                })
            // Swal.fire({
            //     icon: "success",
            //     title: "Success",
            //     text: "Đăng ký thành công",
            //     confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
            // }).then((result) => {
            //     if (result.isConfirmed) setSuccess(true);
            // });
            // navigate('/Login')
        }
    };

    useEffect(() => {
        document.title = "Sign Up";
    }, []);

    return (
        <div className={cx('sign_up') + " sign-up"} >
            <img className={cx('logo')} src={logo} alt="" />
            <div className={cx('grid wide')}>
                <div className={cx('row no-gutters')}>
                    <div className={cx('col l-6 m-12 c-12 l-o-7 m-o-3 c-o-3')}>
                        <div className={cx('wrapper')}>
                            <div className={cx('header')}>Create Account</div>

                            <form className={cx('form')} onSubmit={handleClickSubmit}>
                                <input
                                    type="name"
                                    required
                                    className={cx('form-input')}
                                    placeholder="Full name"
                                    onChange={handleChangeUserName}
                                />
                                <input
                                    type="email"
                                    required
                                    className={cx('form-input')}
                                    placeholder="Email address or phone number"
                                    onChange={handleChangeMail}
                                />
                                <div className={cx('form-input-wrapper')}>
                                    <input
                                        type={isHidePass ? "password" : "text"}
                                        id="password"
                                        required
                                        className={cx('form-input')}
                                        placeholder="Password"
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

                                {!isEqualPassword ? (
                                    <p className={cx("notify")}>Mật khẩu phải giống nhau!</p>
                                ) : (
                                    <></>
                                )}
                                <div className={cx('form-input-wrapper')}>
                                    <input
                                        type={isHideRePass ? "password" : "text"}
                                        id="rePassword"
                                        required
                                        onChange={handleChangeRePassword}
                                        placeholder="Confirm password"
                                        className={cx('form-input')}
                                    />

                                    <div className={cx("show-icon")}>
                                        {isHideRePass ? (
                                            <EyeTwoTone onClick={() => setIsHideRePass(false)} twoToneColor="#9DADBA" />
                                        ) : (
                                            <EyeInvisibleTwoTone onClick={() => setIsHideRePass(true)} twoToneColor="#9DADBA" />
                                        )}
                                    </div>
                                </div>

                                <div className={cx('select-option')}>
                                    <Checkbox value="agree" defaultChecked >I accept the <a className={cx('link')} href='#'>terms of use </a> and <a className={cx('link')} href='#'>privacy policy</a></Checkbox>

                                </div>
                                <button className={cx(
                                    "form-btn",
                                    mail && password && rePassword
                                        ? "primary"
                                        : ""
                                )}>    Sign Up
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
                                    <div className={cx('navigate-login')}>
                                        <span className={cx('navigate-login-text')}>
                                            Already have an account? <Link to="/Login">Login</Link>
                                        </span>
                                    </div >
                                </div>
                            </form>
                        </div>
                    </div>


                </div >
            </div >
        </div >
    )
}
export default Signup;