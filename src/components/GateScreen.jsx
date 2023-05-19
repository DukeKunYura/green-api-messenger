import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged, setIdInstance, setApiTokenInstance } from '../redux/masterSlice';


export default function GateScreen() {
    const [inputId, setInputId] = useState("");
    const [inputToken, setInputToken] = useState("");

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "inputId") {
            setInputId(value);
        } else {
            setInputToken(value);
        }
    };

    const handleSubmit = () => {
        if (inputId != "" && inputToken != "") {
            dispatch(setIdInstance(inputId));
            dispatch(setApiTokenInstance(inputToken));
            dispatch(setLogged(true))
        }
    }


    return (
        <>
            <div>Gate</div>
            <form id="myForm" onSubmit={handleSubmit}>
                <label htmlFor="inputId">
                    Input ID:
                    <input
                        type="text"
                        name="inputId"
                        id="inputId"
                        value={inputId}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="inputToken">
                    Input Token:
                    <input
                        type="text"
                        name="inputToken"
                        id="inputToken"
                        value={inputToken}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>

    )
}
