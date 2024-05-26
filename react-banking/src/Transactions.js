import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Transactions() {
    const { iban } = useParams();
    const [data, setData] = useState([]);

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
    }, [iban]);

    return (
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
    )
}