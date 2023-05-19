import { useSelector } from 'react-redux';
import GateScreen from './components/GateScreen';
import ChatScreen from './components/ChatScreen';
import './App.css';

function App() {
    const state = useSelector((state) => state.master);

    return (
        <div className="app">
            {!state.logged && <GateScreen />}
            {state.logged && <ChatScreen />}
        </div>

    )
}

export default App
