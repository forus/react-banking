import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SendMoney from './SendMoney';

export default function Transactions() {
    const { iban } = useParams();
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:8080/transactions?from_iban=${iban}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, [iban, refresh]);

    async function handleSent(data) {
        try {
            const response = await fetch('http://localhost:8080/transactions', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from_iban: iban,
                    to_iban: data.iban,
                    datetime: new Date().toISOString(),
                    amount: data.amount,
                    currency: "EUR",
                    description: data.description,
                    category: "Other"
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            setRefresh(prev => !prev);
            // Handle the successful response here
        } catch (error) {
            console.error('Error:', error);
            // Handle the error here
        }
  };

    return (
        <>
            <SendMoney onSent={handleSent}></SendMoney>
            <section>
                <h2>Transactions of {iban}</h2>
                <p>Below you can find all transactions of the account:</p>
                <p>
                    <table>
                        <tr>
                            <th>Time</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                        {data.map((transaction) =>
                            <tr>
                                <td>{transaction.datetime}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.from_iban == iban ? '-' : ''}{transaction.amount} {transaction.currency}</td>
                            </tr>
                        )}
                    </table>
                </p>
            </section>
        </>
    )
}