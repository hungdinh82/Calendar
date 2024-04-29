import classNames from 'classnames/bind';
import { Button } from 'antd';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('header')}>
            <div div className={cx('left-content')}>
                <div className={cx('logo')}>
                    <a href="/" className={cx('logo-link')}>
                        Nhóm 2
                    </a>
                </div>

                <div className={cx('navbar')}>
                    <div className={cx('navbar-item', 'active')}>
                        <a href="/" className={cx('navbar-link')}>
                            Home
                        </a>
                    </div>
                    <div className={cx('navbar-item')}>
                        <a href="/overview" className={cx('navbar-link')}>
                            Overview
                        </a>
                    </div>
                </div>
            </div>

            <div className={cx('right-content')}>
                <Button className={cx('register-btn')} size="large" href="/Signup">
                    Đăng ký
                </Button>
                <Button className={cx('login-btn')} size="large" type="primary" href="/login">
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default Header;
