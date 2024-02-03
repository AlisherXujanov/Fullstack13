import './style.scss'
import { useContext, useEffect, useState } from "react"
import { context } from "../../store"
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import Test from './Test.jsx'

let page = 1
const URL = "https://reqres.in/api/users?page=" + page

function Products(props) {
    const { store, setStore } = useContext(context)
    // const [users, setUsers] = useState([])

    useEffect(() => {
        // fetch(URL)
        //     .then(res => res.json())
        //     .then(data => setUsers(data.data))
    }, [])

    return (
        <div id="products-wrapper">
            <h2>Products</h2>
            <h3>{store.count}</h3>
            <button className='warning-btn' onClick={(e) => { setStore({ type: 'increment' }) }}>Increment</button>

            <div className="container">
                <Test />
                {/* {
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
                } */}
                {/* <Get url={URL} params={{}}>
                    {(error, response, isLoading, makeRequest, axios) => {
                        if (error) {
                            return (
                                <div>
                                    Something bad happened: {error.message}
                                    <button onClick={() => makeRequest({ params: { reload: true } })}>
                                        Retry
                                    </button>
                                </div>
                            )
                        }
                        else if (isLoading) {
                            return (<div>Loading...</div>)
                        }
                        else if (response !== null) {
                            return (
                                <div>
                                    <button className='warning-btn' 
                                        onClick={() => makeRequest({ params: { refresh: true } })}
                                    >
                                        Refresh
                                    </button>
                                    {
                                        response.data.data.map((user, index) => {
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
                            )
                        }
                        return (<div>Default message before request is made.</div>)
                    }}
                </Get> */}
            </div>
        </div>
    );
}

export default Products;
