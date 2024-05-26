import './App.css';
import MyBankAccounts from './MyBankAccounts';

function App() {
  return (
    <div className="App">
        <header>
            <h1>React Banking</h1>
        </header>
        <main>
            <MyBankAccounts></MyBankAccounts>
        </main>
        <footer>
            <p>&copy; 2024 React Banking</p>
        </footer>
    </div>
  );
}

export default App;
