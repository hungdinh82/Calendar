import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import { EyeTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import adminLogo from '../../imgs/adminLogo.png'
import styles from './LoginAdmin.module.scss';
import '../Signup/library.scss'
import { useSignInMutation } from '../../Services/api/authService';

const cx = classNames.bind(styles);

function LoginAdmin() {
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
        signIn({ mail, password })
            .then((res) => {
                if (res.data.login && res.data.isAdmin) {
                    localStorage.setItem("currentUser", JSON.stringify(res.data));
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Đăng nhập thành công",
                        confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
                    })
                    navigate("/AdminDashboard");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Sai tài khoản hoặc mật khẩu",
                        confirmButtonText: '<div class="fa fa-thumbs-up"}>Nhập lại!</div>',
                    })
                }
            })
    };

    useEffect(() => {
        document.title = "Admin Log in";
    }, []);

    return (
        <div className={cx('login-admin')}>
            <img className={cx('admin-logo')} src={adminLogo} alt="Admin Logo" />
            <div className={cx('grid')}>
                <div className={cx('wrapper')}>
                    <h1 className={cx('header')}>Admin Log in</h1>
                    <form className={cx('form')} onSubmit={handleClickSubmit}>
                        <input
                            type="email"
                            required
                            className={cx('form-input')}
                            placeholder="admin@example.com"
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
                        <button className={cx("form-btn", mail && password ? "primary" : "")}>Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginAdmin;
