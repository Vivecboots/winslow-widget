import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { parseEther } from 'ethers/lib/utils.js';




export default function Dapp() {
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [transferAmount, setTransferAmout] = useState<string>("0");
  const [userNonce, setUserNonce] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [tokenType, setTokenType] = useState<string>('');

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

  useEffect(() => {
    if (isSuccess) {
      addRecentTransaction({
        hash: data?.hash || "",
        description: "Send Transaction",
      });
    }
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, [data, isSuccess]);

  const FormComponent1 = () => (
    <div className='relative z-10b bg-blue-900 w-3/6 h-min py-12 px-24 rounded-2xl flex flex-col'>
      <img src="/My_project-1_(2).png" alt="Image 1" style={{ width: '70px', height: '70px', position: 'absolute', top: 0, left: 0 }} />
      <h1>Form 1</h1>
      {/* Form fields for Form 1 */}
      <form>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <button>Submit Form 1</button>
      </form>
    </div>
  );
  
  const FormComponent2 = () => (
    <div className='relative z-10 bg-slate-800 w-3/6 h-min py-12 px-24 rounded-2xl flex flex-col'>
      <img src="/My_project-1_(4).png" alt="Image 2" style={{ width: '70px', height: '70px', position: 'absolute', top: 0, left: 0 }}  />
      <h1>Form 2</h1>
      {/* Form fields for Form 2 */}
      <form>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button>Submit Form 2</button>
      </form>
    </div>
  );
  
  
  const FormComponent3 = () => (
    <div className='relative z-10 bg-slate-800 w-3/6 h-min py-12 px-24 rounded-2xl flex flex-col'>
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
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="absolute w-auto min-w-full min-h-full max-w-none z-0"
        src="/black_-_13495 (540p).mp4"
      />
      <FormComponent1 />
      <button className="rounded-full p-4 bg-blue-500 text-white relative z-10">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 mx-auto">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
</button>






      <FormComponent2 />
      <div style={{ height: '20px' }} />
      <FormComponent3 />
    </div>
  );
}
