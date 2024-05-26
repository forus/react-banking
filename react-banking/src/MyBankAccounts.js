import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyBankAccounts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8080/accounts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <section>
            <h2>My Bank Accounts</h2>
            <p>Below you can find all bank accounts:</p>
            {data.map((account) =>
                <p>
                    <Link to={`/accounts/${account.iban}/transactions`}>{account.name}</Link><small>{account.iban}</small>
                </p>
            )}
        </section>
    )
}