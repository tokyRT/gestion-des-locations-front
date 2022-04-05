import React from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function DashboardLayout() {
    const [token, setToken] = React.useState('');
    React.useEffect(() => {

        axios.get('http://169.254.101.183:8000/sanctum/csrf-cookie').then((res) => {
            console.log(res);
            axios.post('http://169.254.101.183:8000/api/login', {
                email: "basta@gmail.com",
                password: "1234"
            }).then(response => {
                setToken(response.data.token)
            });
        });

    }, []);
    const logout = () => {
        console.log(token);
        axios.delete('http://169.254.101.183:8000/api/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            console.log('logged out');
        })
        // axios.get('http://169.254.101.183:8000/api/users', {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }).then(res => console.log(res)).then(() => {
        //     console.log(token);

        // })
    }

    const users = () =>{
        axios.get('http://169.254.101.183:8000/api/users', {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(response => {
                console.log(response);
            })
    }

    return (
        <div>
            <h1>Dashboard layout</h1>
            <button onClick={logout}>logout</button>
            <button onClick={users}>users</button>
            <Outlet />
        </div>
    );
}
