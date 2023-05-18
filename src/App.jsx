import { useSelector } from 'react-redux';
import GateScreen from './components/GateScreen';
import ChatScreen from './components/ChatScreen';

function App() {
    const state = useSelector((state) => state.master);

    return (
        <>
            {!state.logged && <GateScreen />}
            {state.logged && <ChatScreen />}
        </>

    )
}

export default App
