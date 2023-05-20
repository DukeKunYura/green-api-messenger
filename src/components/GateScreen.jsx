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
        <div className="contacts">
            <div>
                <h4 className="title4">Gate</h4>
                <form id="myForm" onSubmit={handleSubmit}>
                    <label className="title5">Input ID:</label>
                    <div className="control">
                        <input className="input"
                            placeholder='ID'
                            type="text"
                            name="inputId"
                            id="inputId"
                            value={inputId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <br />
                    <label className="title5">Input Token:</label>
                    <div className="control">
                        <input className="input"
                            placeholder='Token'
                            type="text"
                            name="inputToken"
                            id="inputToken"
                            value={inputToken}
                            onChange={handleInputChange}
                        />
                    </div>
                    <br />
                    <button className="button" type="submit">Submit</button>
                </form>
            </div>

        </div>

    )
}
