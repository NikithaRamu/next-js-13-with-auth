"use client";
import { useRouter } from "next/navigation"
import React, { useState } from 'react';

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        const value = e.targe.value
        const name = e.targe.name
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        const res = await fetch("/api/Users", {
            method: "POST",
            body: JSON.stringify({ formData }),

        })

        if (!res.ok) {
            const response = await res.json()
            setErrorMessage(response.message);
        }
        else {
            router.refresh()
            router.push("/")
        }
    }

    return (<>

        <form
            onSubmit={handleSubmit}
            method="post"
            className="flex flex-col gap-3 w-1/2"

        >

            <h1>Create new user</h1>
            <label>Full name</label>
            <input id="name" name="name" type="name" onChange={handleChange} required={true}
                value={formData.name}
                className="m-2 bg-slate-400 rounded"
            >

            </input>

            <label>Email </label>
            <input id="email" name="email" type="email" onChange={handleChange} required={true}
                value={formData.email}
                className="m-2 bg-slate-400 rounded"
            >

            </input>

            <label>password </label>
            <input id="password" name="password" type="password" onChange={handleChange} required={true}
                value={formData.password}
                className="m-2 bg-slate-400 rounded"
            >

            </input>

            <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100" />
        </form>
        <p className="text-red">{errorMessage}</p>
    </>)
}


export default UserForm;