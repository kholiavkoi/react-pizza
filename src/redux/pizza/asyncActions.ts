import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza, SearchPizzaParams} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {category, currentPage, sortBy, order, search} = params
        const {data} = await axios.get<Pizza[]>(`https://6336f57a5327df4c43cd11bf.mockapi.io/items?${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${search}`)

        return data
    }
)