import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function TokenDropdown({ onChange }) {
  const [tokenList, setTokenList] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [tokenAddress, setTokenAddress] = useState('');
  const [menuPortalTarget, setMenuPortalTarget] = useState(null);

  useEffect(() => {
    fetch('https://tokens.coingecko.com/uniswap/all.json')
      .then(response => response.json())
      .then(data => {
        setTokenList(data.tokens);
        // Set the default token
        const defaultToken = data.tokens.find(token => token.address === "0x967fb0d760ed3ce53afe2f0a071674cccae73550");
        setSelectedToken(defaultToken);
        setTokenAddress(defaultToken.address);
        // Check if there's a selected token in local storage
        const savedTokenValue = localStorage.getItem('selectedToken');
        if (savedTokenValue) {
          const savedTokenInList = data.tokens.find(token => token.value === JSON.parse(savedTokenValue));
          setSelectedToken(savedTokenInList || defaultToken);
          setTokenAddress(savedTokenInList ? savedTokenInList.address : defaultToken.address);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    setMenuPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (selectedToken) {
      // Only save the value property to localStorage
      localStorage.setItem('selectedToken', JSON.stringify(selectedToken.value));
      setTokenAddress(selectedToken.address);
    }
  }, [selectedToken]);

  const handleChange = (selectedOption) => {
    setSelectedToken(selectedOption);
    setTokenAddress(selectedOption.value.address);
    onChange({ target: { value: selectedOption } });
  };

  const handleAddressChange = (event) => {
    setTokenAddress(event.target.value);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderWidth: '4px',
      borderColor: 'rgba(214, 9, 170)',
      backgroundColor: 'rgba(95, 98, 245)',
      height: '60px',
      minHeight: '60px',
      display: 'flex',
      alignItems: 'center',
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black', // Set the selected option text color to white and other options to black
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', // Set the selected value text color to white
    }),
  };
  

 // New state variables for the order type and minimum entry price
 const [orderType, setOrderType] = useState(null);
 const [minEntryPrice, setMinEntryPrice] = useState('');

 // New handler functions for the order type and minimum entry price
 const handleOrderTypeChange = (selectedOption) => {
   setOrderType(selectedOption);
 };

 const handleMinEntryPriceChange = (event) => {
   setMinEntryPrice(event.target.value);
 };



 return (
  <div>
    <div style={{ display: 'flex' }}>
      {/* Existing dropdown and input box... */}
      <div style={{ flex: 1 }}>
        <Select
          className="my-dropdown"
          value={selectedToken}
          onChange={handleChange}
          options={tokenList.map(token => ({
            value: token,
            label: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={token.logoURI} alt={token.symbol} style={{ width: '40px', height: '40px', marginRight: '5px' }} />
                {token.name}
              </div>
            ),
          }))}
          menuPortalTarget={menuPortalTarget}
          menuPosition={'fixed'} // optionally, you can use "absolute"
          styles={customStyles}
        />
      </div>
      <div style={{ flex: 1 }}>
        <input
          type="text"
          value={tokenAddress}
          onChange={handleAddressChange}
          style={{
            width: '100%',
            backgroundColor: 'rgba(95, 98, 245)',
            borderWidth: '4px',
            borderColor: 'rgba(214, 9, 170)',
            height: '60px',
            fontSize: '23px', // Adjust this value to change the text size
            fontWeight: 'bold', // Make the text bold
            fontFamily: 'SD Glitch 2' // Change the font style
          }}
        />
      </div>
    </div>
    <div style={{ display: 'flex', marginTop: '10px' }}> {/* Add margin for spacing */}
      <div style={{ flex: 1 }}>
        <Select
          value={orderType}
          onChange={handleOrderTypeChange}
          options={[
            { value: 'limit', label: 'Limit Order' },
            { value: 'market', label: 'Market Order' },
          ]}
          menuPortalTarget={menuPortalTarget}
          menuPosition={'fixed'}
          styles={customStyles}
        />
      </div>
      <div style={{ flex: 1 }}>
        <input
          type="text"
          value={minEntryPrice}
          onChange={handleMinEntryPriceChange}
          placeholder="Minimum entry price"
          style={{
            width: '100%',
            backgroundColor: 'rgba(95, 98, 245)',
            borderWidth: '4px',
            borderColor: 'rgba(214, 9, 170)',
            height: '60px',
            fontSize: '23px',
            fontWeight: 'bold',
            fontFamily: 'SD Glitch 2'
          }}
        />
      </div>
    </div>
  </div>
);
}

export default TokenDropdown;