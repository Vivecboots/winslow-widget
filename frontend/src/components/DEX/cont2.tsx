// Cont2.tsx
import React from 'react';

const Cont2: React.FC = () => (
  <div>
    <h2>Transfer</h2>
    <form>
      <label>
        Amount
        <input type="number" />
      </label>
      <label>
        To
        <input type="text" />
      </label>
      <button>Send</button>
    </form>
  </div>
);

export default Cont2;
