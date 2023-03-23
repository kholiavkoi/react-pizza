export type CartItem = {
    id: string
    name: string
    imageUrl: string
    price: number
    type: string
    size: number,
    count: number
}

export interface CartSliceState {
    totalPrice: number
    items: CartItem[]
}