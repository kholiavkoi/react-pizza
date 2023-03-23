export type Pizza = {
    id: string
    name: string
    imageUrl: string
    sizes: number[]
    types: number[]
    price: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzaSliceState {
    items: Pizza[];
    status: Status
    totalPrice: number
}

export type SearchPizzaParams = {
    category: string,
    currentPage: string,
    sortBy: string,
    order: string,
    search: string
}