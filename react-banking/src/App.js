import './App.css';
import MyBankAccounts from './MyBankAccounts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Transactions from './Transactions';

function App() {
  return (
    <Router>
        <div className="App">
            <header>
                <h1>React Banking</h1>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<MyBankAccounts/>} />
                    <Route path="/accounts/:iban/transactions" element={<Transactions/>} />
                </Routes>
            </main>
            <footer>
                <p>&copy; 2024 React Banking</p>
            </footer>
        </div>
    </Router>
  );
}

export default App;
