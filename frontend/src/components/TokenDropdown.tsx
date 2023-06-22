import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function TokenDropdown({ onChange }) {
  const [tokenList, setTokenList] = useState([]);
  const [menuPortalTarget, setMenuPortalTarget] = useState(null);

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

  useEffect(() => {
    setMenuPortalTarget(document.body);
  }, []);

  const handleChange = (selectedOption) => {
    onChange({ target: { value: selectedOption.value } });
  };

  return (
    <Select
  className="my-dropdown"
  onChange={handleChange}
  options={tokenList.map(token => ({
    value: token.symbol,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={token.logoURI} alt={token.symbol} style={{ width: '20px', marginRight: '5px', zIndex: 999 }} />
        {token.name}
      </div>
    ),
  }))}
  menuPortalTarget={menuPortalTarget}
  menuPosition={'fixed'} // optionally, you can use "absolute"
/>
  );
}

export default TokenDropdown;
