// store.js
import create from 'zustand';

export const useStore = create(set => ({
  receiverAddress: "",
  transferAmount: "0",
  userNonce: 0,
  maxPrice: 0,
  timeLimit: 0,
  tokenTypeForm1: 'token2',
  tokenTypeForm2: '',
  setReceiverAddress: (value) => set({ receiverAddress: value }),
  setTransferAmount: (value) => set({ transferAmount: value }),
  setUserNonce: (value) => set({ userNonce: value }),
  setMaxPrice: (value) => set({ maxPrice: value }),
  setTimeLimit: (value) => set({ timeLimit: value }),
  setTokenTypeForm1: (value) => set({ tokenTypeForm1: value }),
  setTokenTypeForm2: (value) => set({ tokenTypeForm2: value }),
}));
