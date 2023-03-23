import React, {FC, useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const  FullPizza: FC  = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        name: string,
        price: number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        async function fetchPizza () {
            try {
                const {data} = await axios(`https://6336f57a5327df4c43cd11bf.mockapi.io/items/${id}`)
                setPizza(data)
            } catch (error) {
                alert('Error in getting pizza')
                navigate('/')
            }
        }

        fetchPizza()
    }, [id])

    if (!pizza) {
        return <>Loading...</>
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="pizza" />
            <h2>{pizza.name}</h2>
            <h4>{pizza.price} грн</h4>
        </div>
    );
}

export default FullPizza;