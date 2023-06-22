import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface Token {
  symbol: string;
  name: string;
  logoURI: string;
}

interface TokenDropdownProps {
  onChange: (selectedOption: any) => void;
}

const formatOptionLabel = ({ data }: { data: Token }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={data.logoURI} alt={data.name} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
    <span>{data.name}</span>
  </div>
);

const TokenDropdown: React.FC<TokenDropdownProps> = ({ onChange }) => {
  const [tokenList, setTokenList] = useState<Token[]>([]);

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

  const options = tokenList.map(token => ({
    value: token.symbol,
    label: token.name,
    data: token, // Pass the entire token object as the data property
  }));

  return (
    <Select
      options={options}
      onChange={onChange}
      isSearchable
      placeholder="Select a token"
      formatOptionLabel={formatOptionLabel} // Add logos
    />
  );
}

export default TokenDropdown;
