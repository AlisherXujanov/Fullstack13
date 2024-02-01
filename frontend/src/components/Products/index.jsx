import './style.scss'
import { useContext, useEffect, useState } from "react"
import { context } from "../../store"
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

const URL = "https://reqres.in/api/users?page=2"

function Products(props) {
    const { store, setStore } = useContext(context)
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch(URL)
            .then(res => res.json())
            .then(data => setUsers(data.data))
    }, [])

    return (
        <div id="products-wrapper">
            <h2>Products</h2>
            <h3>{ store.count }</h3>
            <button className='warning-btn' onClick={(e) => { setStore({type: 'increment'}) }}>Increment</button>
            

            <div className="container">
                {
                    users.map((user, index) => {
                        return (
                            <div key={index}>
                                <h2>{user.first_name}</h2>
                                <h3>Email: {user.email}</h3>
                                <img src={user.avatar} alt="Avatar" 
                                    width={100} height={100} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Products;
