import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { parseEther } from 'ethers/lib/utils.js';
import Head from 'next/head';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import zIndex from '@mui/material/styles/zIndex';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TokenDropdown from './TokenDropdown';



export default function Dapp() {
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [transferAmount, setTransferAmout] = useState<string>("0");
  const [userNonce, setUserNonce] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [tokenType, setTokenType] = useState<string>('token2'); // Set default to Tether

  const addRecentTransaction = useAddRecentTransaction();
  const videoRef = useRef<HTMLVideoElement>(null);

  const onRecipientAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  }

  const onTransferAmountChange = ( e: ChangeEvent<HTMLInputElement>) => {
    setTransferAmout(e.target.value);
  }

  const onUserNonceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNonce(Number(e.target.value));
  }

  const onMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  }

  const onTimeLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeLimit(Number(e.target.value));
  }

  const onTokenTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTokenType(e.target.value);
  }

  const { config, error } = usePrepareSendTransaction({
    request: {
      to: receiverAddress,
      value: parseEther(transferAmount || '0'),
    }
  });

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction(config)

  const handleSendTransaction = async () => {
    sendTransaction?.();
  }

///////////Token logos for deposit type
  const tokenLogos = {
    'token1': '/Circle_USDC_Logo.svg-removebg-preview.png',
    'token2': '/Tether1.png',
    'token3': '/WETH.png',
  };

  const [tokens, setTokens] = useState([]);


  //////////Fetch Token List for Target token through 0x protocol
  useEffect(() => {
    fetch('https://api.0x.org/swap/v1/tokens')
      .then(response => response.json())
      .then(data => setTokens(data.records))
      .catch(error => console.error('Error:', error));
  }, []);
  

  const logoPath = tokenLogos[tokenType];

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: "Send Transaction",
      });
    }
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, [data, isSuccess]);

  const FormComponent1 = () => {
    const buttons = [
      <Button key="token1" onClick={() => setTokenType('token1')}>USDC</Button>,
      <Button key="token2" onClick={() => setTokenType('token2')}>Tether</Button>,
      <Button key="token3" onClick={() => setTokenType('token3')}>WETH</Button>,
    ];
  
    // Get the logo path for the currently selected token
    const logoPath = tokenLogos[tokenType];
  
    return (
      <div className='relative z-10 bg-blue-900 w-3/6 h-min py-12 px-24 rounded-2xl flex flex-col'>
        <img src="/My_project-1_(2).png" alt="Image 1" style={{ width: '85px', height: '85px', position: 'absolute', top: 0, left: 0 }} />
        <form>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img src={logoPath} alt="Token Logo" style={{ width: '65px', height: '60px', marginRight: '10px' }} />
            <ButtonGroup
              disableElevation
              style={{  height: '60px', width: '33%'}}
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              {buttons}
            </ButtonGroup>
            <OutlinedInput
              type="text"
              style={{  
                height: '60px', 
                width: '100%', 
                backgroundColor: 'rgba(95, 98, 245)', 
                borderWidth: '4px',  
                borderColor: 'rgba(214, 9, 170)',
                fontSize: '40px', // Adjust this value to change the text size
                fontWeight: 'bold', // Make the text bold
                fontFamily: 'SD Glitch 2' // Change the font style
              }}
              name="Deposit Amount"
              placeholder="Deposit Amount"
              value={transferAmount}
              onChange={onTransferAmountChange}
            />
          </div>








          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/barcode-removebg-preview.png" alt="Logo" style={{  width: '65px', height: '60px', marginRight: '10px' }} />
            <OutlinedInput
              type="text"
              name="Deposit Address"
              placeholder="Deposit Address"
              value={receiverAddress}
              onChange={onRecipientAddressChange}
              style={{  height: '60px', 
              width: '100%', 
              backgroundColor: 'rgba(95, 98, 245)', 
              borderWidth: '4px', 
              borderColor: 'rgba(214, 9, 170)',
              fontSize: '40px', // Adjust this value to change the text size
              fontWeight: 'bold', // Make the text bold
              fontFamily: 'SD Glitch 2' // Change the font style

            }}



               
            />
          </div>
          <h1>An Arbitrum address is 42 characters in length and begins with 0x. This address is public and okay to share.</h1>
        </form>
      </div>
    );
  };
  
           


          
  
  
  const FormComponent2 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Logic for submitting the form goes here
    };
  
    return (
      <div className="relative z-10 bg-slate-800 w-3/6 h-min py-12 px-24 rounded-2xl flex flex-col">
        <img
          src="/My_project-1_(4).png"
          alt="Image 2"
          style={{ width: '85px', height: '85px', position: 'absolute', top: 0, left: 0 }}
        />
        <h1>Form 2</h1>
        {/* Form fields for Form 2 */}
        <form onSubmit={handleSubmit}>
          <TokenDropdown onChange={onTokenTypeChange} />
          <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} />
          <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          <button type="submit">Submit Form 2</button>
        </form>
      </div>
    );
  };
  
  
  // Second blue button
  const BlueButton = () => (
    <button className="rounded-full p-4  bg-blue-500 text-white relative z-10">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 mx-auto">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
  
  const FormComponent3 = () => (
    <div className='relative z-10  bg-blue-900 w-3/6 h-min py-12 px-24 rounded-2xl flex flex-col'>
      <img src="/My_project-1_(2).png" alt="Image 1" style={{ width: '85px', height: '85px', position: 'absolute', top: 0, left: 0 }} />
      <h1>Form 3</h1>
      {/* Form fields for Form 3 */}
      <form>
        {/* Add your form fields here */}
        <button>Submit Form 3</button>
      </form>
    </div>
  );
  
  return (
    <div className='relative bg-slate-900 h-screen flex justify-center items-center flex-col space-y-50'>
      <Head>
        <title>Safi-Bridge</title>
        <style>{`
          @font-face {
            font-family: 'SD Glitch 2';
            src: url('/SdglitchdemoRegular-YzROj.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </Head>
      
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '20px', borderRadius: '10px', width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
  <h1 style={{ fontFamily: "'SD Glitch 2'", fontSize: '10em', color: '#fc03ce', position: 'relative', zIndex: 11 }}>Supra-Bridge</h1>
 
</div>


      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="absolute w-auto min-w-full min-h-full max-w-none z-0"
        src="/yo.mp4"
      />
      <FormComponent1 />
      <BlueButton />
      <FormComponent2 />
      <BlueButton />
      <FormComponent3 />
    </div>
  );
}
  