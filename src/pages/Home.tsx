import React, {useCallback, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";

import {useSelector} from "react-redux";
import qs from "qs";
import {RootState, useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/filter/selectors";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/filter/slice";
import {selectPizza} from "../redux/pizza/selectors";
import {SearchPizzaParams} from "../redux/pizza/types";
import {fetchPizzas} from "../redux/pizza/asyncActions";

import {Categories, sortList, Sort, Pagination, PizzaBlock, Skeleton} from "../components";



const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const {categoryId, currentPage, searchValue} = useSelector(selectFilter)
    const sortType = useSelector((state: RootState) => state.filter.sort.sortProperty)
    const {items, status} = useSelector(selectPizza)


    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [dispatch])

    const onPageChanged = (number: number) => {
        dispatch(setCurrentPage(number))
    }

    const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const sortBy = sortType.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''


        dispatch(
            fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage: String(currentPage)
            }))
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }

        isMounted.current = true
    }, [sortType, categoryId, currentPage])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
            const sort = sortList.find(obj => obj.sortProperty === params.sortBy)

            dispatch(setFilters({
                categoryId: Number(params.category),
                currentPage: Number(params.currentPage),
                searchValue: params.search,
                sort: sort || sortList[0]
            }))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items
        .filter((obj: any) => {
            if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return true
            }
            return false
        })
        .map((obj: any) => (
            <PizzaBlock  key={obj.id} {...obj} />
        ))


    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)


    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>

            {status === 'error' ?
                <>
                    <h2>Some error ;(</h2>
                    <p>no pizzas fetched</p>
                </>

                :
                <div className="content__items">
                    {status === 'loading' ?
                        skeletons
                        :
                        pizzas

                    }
                </div>
            }


            <Pagination value={currentPage} onPageChanged={onPageChanged} />
        </div>
    );
}

export default Home;