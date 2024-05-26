import { useState, useEffect } from 'react';

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
                    <a href={`/accounts/${account.iban}/transactions`}>{account.name}</a><small>{account.iban}</small>
                </p>
            )}
        </section>
    )
}