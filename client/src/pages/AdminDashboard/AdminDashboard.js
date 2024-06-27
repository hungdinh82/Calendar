import { useState, useEffect } from "react";
import classNames from 'classnames/bind';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from './AdminDashboard.module.scss';
import { useGetAccountsQuery, useDeleteAccountMutation, useAddAccountMutation, useUpdateAccountMutation } from '../../Services/api/adminService';

const cx = classNames.bind(styles);

function AdminDashboard() {
    const { data: accounts, refetch } = useGetAccountsQuery();
    const [deleteAccount] = useDeleteAccountMutation();
    const [addAccount] = useAddAccountMutation();
    const [updateAccount] = useUpdateAccountMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [currentAccount, setCurrentAccount] = useState({ id: '', mail: '', userName: '', isAdmin: false });
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        await deleteAccount(id);
        refetch();
        Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "Tài khoản đã bị xóa thành công",
            confirmButtonText: 'OK',
        });
    };

    const handleEdit = (account) => {
        setCurrentAccount(account);
        setIsEditing(true);
    };

    const handleAdd = () => {
        setCurrentAccount({ id: '', mail: '', userName: '', isAdmin: false });
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (currentAccount.id) {
            await updateAccount(currentAccount);
        } else {
            await addAccount(currentAccount);
        }
        refetch();
        setIsEditing(false);
        Swal.fire({
            icon: "success",
            title: "Saved",
            text: "Tài khoản đã được lưu thành công",
            confirmButtonText: 'OK',
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/LoginAdmin");
    };

    useEffect(() => {
        document.title = "Admin Dashboard";
    }, []);

    return (
        <div className={cx('admin-dashboard')}>
            <h1 className={cx('header')}>Admin Dashboard</h1>
            <button className={cx('add-btn')} onClick={handleAdd}>Thêm tài khoản mới</button>
            <button className={cx('logout-btn')} onClick={handleLogout}>Logout</button>
            <table className={cx('accounts-table')}>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>User Name</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts?.map(account => (
                        <tr key={account.id}>
                            <td>{account.mail}</td>
                            <td>{account.userName}</td>
                            <td>{account.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleEdit(account)}>Edit</button>
                                <button onClick={() => handleDelete(account.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditing && (
                <div className={cx('edit-form')}>
                    <h2>{currentAccount.id ? 'Edit Account' : 'Add Account'}</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <input
                            type="email"
                            value={currentAccount.mail}
                            onChange={(e) => setCurrentAccount({ ...currentAccount, mail: e.target.value })}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            value={currentAccount.userName}
                            onChange={(e) => setCurrentAccount({ ...currentAccount, userName: e.target.value })}
                            placeholder="User Name"
                            required
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={currentAccount.isAdmin}
                                onChange={(e) => setCurrentAccount({ ...currentAccount, isAdmin: e.target.checked })}
                            />
                            Admin
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
