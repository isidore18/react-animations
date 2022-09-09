import React, { useState, useEffect, useRef } from 'react'
import './StateAnim.css';
import { useTransition, animated } from "react-spring";
import { v4 as uuidv4 } from 'uuid';

export default function StateAnim() {

    const [firstDisplay, setFirstDisplay] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setFirstDisplay(false)
        }, 1000);
    }, [])


    const [inputData, setInputData] = useState([
        {
            id: uuidv4(),
            txt: 'System of a down'
        },
        {
            id: uuidv4(),
            txt: 'Metallica'
        },
        {
            id: uuidv4(),
            txt: 'Tagada Jones'
        },
    ]);

    const inputRef = useRef();

    const handleData = e => {
        e.preventDefault();
        const newObj = {
            id: uuidv4(),
            txt: inputRef.current.value
        }

        setInputData([...inputData, newObj])
        inputRef.current.value = "";
    }

    const listTransition = useTransition(inputData, {
        from: { opacity: 0, transform: 'translateY(10px)' },
        enter: { opacity: 1, transform: 'translateY(0px)' },
        keys: inputData.map(item => item.id)
    })

    return (
        <form onSubmit={handleData}>
            <label htmlFor='rock' >
                Renseigne tes groupes de rock préférés !
            </label>
            <input ref={inputRef} type="text" id="rock" />

            {firstDisplay ? (
                <ul>
                    {inputData.map(item => {
                        return <li key={item.id}>{item.txt}</li>
                    })}
                </ul>
            ) : (
                <ul>
                    {listTransition((styles, item) => {
                        return <animated.li style={styles}>
                            {item.txt}
                        </animated.li>
                    })}
                </ul>
            )}

        </form>
    )
}
