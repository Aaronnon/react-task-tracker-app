import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'


export const TaskDetails = () => {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    // const [error, setError] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
            const data = await res.json()

            if (res.status === 404) {
                navigate('/')
            }

            setTask(data)
            setLoading(false)
        }
        fetchTask()
    }, [navigate, params.id])
    // if (error) {
    //     return <Navigate to='/' />
    // }

    return loading ? (
        <h3>Loading...</h3>
    ) : (
        <div>
            <h3>{task.text}</h3>
            <p>{task.day}</p>
            <button onClick={() => {
                navigate('/')
            }}>Go Back</button>
        </div>
    )
}
