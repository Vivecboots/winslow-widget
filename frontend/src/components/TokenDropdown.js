import React, { useEffect, useState } from 'react';

function TokenDropdown({ onChange }) {
  const [tokenList, setTokenList] = useState([]);

  useEffect(() => {
    fetch('https://tokens.coingecko.com/uniswap/all.json')
      .then(response => response.json())
      .then(data => {
        setTokenList(data.tokens);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <select onChange={onChange}>
      {tokenList.map(token => (
        <option key={token.symbol} value={token.symbol}>
          {token.name}
        </option>
      ))}
    </select>
  );
}

export default TokenDropdown;
