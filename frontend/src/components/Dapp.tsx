import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { parseEther } from 'ethers/lib/utils.js';

export default function Dapp() {
  // Existing state variables
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [transferAmount, setTransferAmout] = useState<string>("0");

  // New state variables
  const [userNonce, setUserNonce] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [tokenType, setTokenType] = useState<string>('');

  const addRecentTransaction = useAddRecentTransaction();
  const videoRef = useRef<HTMLVideoElement>(null); // Create a reference to the video element

  const onRecipientAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  }

  const onTransferAmountChange = ( e: ChangeEvent<HTMLInputElement>) => {
    setTransferAmout(e.target.value);
  }

  // New event handlers
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
      videoRef.current.playbackRate = 0.75; // Set the playback speed
    }
  }, [data, isSuccess]);

  return (
    <div className='relative bg-slate-900 h-screen flex justify-center items-center'>
      <video
        ref={videoRef} // Attach the reference to the video element
        autoPlay
        loop
        muted
        className="absolute w-auto min-w-full min-h-full max-w-none z-0"
        src="/black_-_13495 (540p).mp4"
      />
      <div className='relative z-10 bg-slate-800 w-3/6 h-min py-12 px-24 rounded-2xl flex flex-col'>
        <h2 className='text-white font-bold text-4xl text-center mb-8'>
          Safi-Bridge/Winslow-Widget
        </h2>
        <form> 
          {/* Existing form fields */}
          <label
            htmlFor='receiver'
            className="text-neutral-300 font-light text-md block mb-2 text-sm font-medium"
          >
First name
          </label>
          <input
            id='receiver'
            type='text'
            placeholder='Receiver address'
            className='bg-slate-800 px-2 py-1 w-full text-lg outline-0 border-b mb-4 border-slate-600 text-neutral-200 appearance-none'
            onChange={onRecipientAddressChange}
            value={receiverAddress}
          />
          <label
            htmlFor='transferAmount'
            className="text-neutral-300 font-light text-md block mb-2 text-sm font-medium"
          >
            Transfer Amount
          </label>
          <input
            id='transferAmount'
            type="number"
            step="0.1"
            placeholder='0'
            className='bg-slate-800 text-neutral-200 px-2 py-1 w-full text-lg outline-0 border-b mb-4 border-slate-600 appearance-none'
            onChange={onTransferAmountChange}
            value={transferAmount}
          />

          {/* New form fields */}
          <label htmlFor='userNonce' className="text-neutral-300 font-light text-md block mb-2 text-sm font-medium">
            User Nonce
          </label>
          <input
            id='userNonce'
            type='number'
            placeholder='0'
            className='bg-slate-800 text-neutral-200 px-2 py-1 w-full text-lg outline-0 border-b mb-4 border-slate-600 appearance-none'
            onChange={onUserNonceChange}
            value={userNonce}
          />

          <label htmlFor='maxPrice' className="text-neutral-300 font-light text-md block mb-2 text-sm font-medium">
            Max Price
          </label>
          <input
            id='maxPrice'
            type='number'
            placeholder='0'
            className='bg-slate-800 text-neutral-200 px-2 py-1 w-full text-lg outline-0 border-b mb-4 border-slate-600 appearance-none'
            onChange={onMaxPriceChange}
            value={maxPrice}
          />

          <label htmlFor='timeLimit' className="text-neutral-300 font-light text-md block mb-2 text-sm font-medium">
            Time Limit
          </label>
          <input
            id='timeLimit'
            type='number'
            placeholder='0'
            className='bg-slate-800 text-neutral-200 px-2 py-1 w-full text-lg outline-0 border-b mb-4 border-slate-600 appearance-none'
            onChange={onTimeLimitChange}
            value={timeLimit}
          />

          <label htmlFor='tokenType' className="text-neutral-300 font-light text-md block mb-2 text-sm font-medium">
            Token Type
          </label>
          <input
            id='tokenType'
            type='text'
            placeholder='Token Type'
            className='bg-slate-800 text-neutral-200 px-2 py-1 w-full text-lg outline-0 border-b mb-4 border-slate-600 appearance-none'
            onChange={onTokenTypeChange}
            value={tokenType}
          />
        </form>
        { error && (
          <div className='text-red-600'>
            An error occurred preparing the transaction: {error.message}
          </div>
        )}

        <button
          className='font-bold text-white bg-indigo-600 mt-4 self-center px-8 py-4 rounded-full disabled:opacity-75'
          disabled={!sendTransaction || isLoading}
          onClick={handleSendTransaction}
        >
          Confirm Transfer
        </button>
      </div>
    </div>
  )
}
