import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function TokenDropdown({ onChange }) {
  const [tokenList, setTokenList] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [menuPortalTarget, setMenuPortalTarget] = useState(null);

  useEffect(() => {
    fetch('https://tokens.coingecko.com/uniswap/all.json')
      .then(response => response.json())
      .then(data => {
        setTokenList(data.tokens);
        // Set the default token
        const defaultToken = data.tokens.find(token => token.address === "0x967fb0d760ed3ce53afe2f0a071674cccae73550");
        setSelectedToken(defaultToken);
        // Check if there's a selected token in local storage
        const savedTokenValue = localStorage.getItem('selectedToken');
        if (savedTokenValue) {
          const savedTokenInList = data.tokens.find(token => token.value === JSON.parse(savedTokenValue));
          setSelectedToken(savedTokenInList || defaultToken);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  

  useEffect(() => {
    setMenuPortalTarget(document.body);
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedToken(selectedOption);
    // Only save the value property to localStorage
    localStorage.setItem('selectedToken', JSON.stringify(selectedOption.value));
    onChange({ target: { value: selectedOption.value } });
  };
  

  return (
    <Select
      className="my-dropdown"
      value={selectedToken}
      onChange={handleChange}
      options={tokenList.map(token => ({
        value: token,
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
