import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CartItem, CartSliceState} from "./types";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

const {totalPrice, items} = getCartFromLS()

const initialState: CartSliceState = {
    totalPrice,
    items
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => {
                return obj.id === action.payload.id
            })


            if (findItem) {
                findItem.count++
                findItem.name = action.payload.name
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => {
                return obj.id === action.payload
            })


            if (findItem) {
                findItem.count--
                state.totalPrice = state.items.reduce((sum, obj) => {
                    return obj.price * obj.count + sum
                }, 0)
            }

        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    },
})



export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions

export default cartSlice.reducer