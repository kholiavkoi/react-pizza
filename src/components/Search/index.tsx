import React, {useCallback, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import {setSearchValue} from "../../redux/filter/slice";


export const Search: React.FC = () => {
    const dispatch = useDispatch()

    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState('')

    const onClickClear = () => {
        setValue('')
        dispatch(setSearchValue(''))
        inputRef.current?.focus()
    }


    const onUpdateSearchValue = useCallback(debounce((str: string) => {
        dispatch(setSearchValue(str))
    }, 1000), [])


    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        onUpdateSearchValue(e.target.value)
    }


    return (
        <div className={styles.root}>
            <label htmlFor="input">
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="512px" id="Layer_1"
                     version="1.1" viewBox="0 0 512 512" width="512px">
                    <path
                        d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
                </svg>
            </label>
            <input ref={inputRef} onChange={onChangeInput} id='input' placeholder='Pizza search...' type="text"
                   value={value} />

            {value &&
                <svg onClick={onClickClear} className={styles.clearIcon} xmlns="http://www.w3.org/2000/svg"
                     height="48" viewBox="0 0 48 48"
                     width="48">
                    <path
                        d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
                    <path d="M0 0h48v48h-48z" fill="none" />
                </svg>
            }
        </div>
    )
};
