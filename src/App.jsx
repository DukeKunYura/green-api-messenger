import { useState } from 'react';
import './App.css';
import GateScreen from './components/GateScreen';
import ChatScreen from './components/ChatScreen';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <>
            {!loggedIn && <GateScreen />}
            {loggedIn && <ChatScreen />}
        </>

    )
}

export default App
