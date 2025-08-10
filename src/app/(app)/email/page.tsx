'use client';
import React from 'react';
import axios from 'axios';

function page() {
  return (
    <div className="mt-60">
      <h1>Send Mail</h1>
      <p>This is Sending mail.</p>
      <button
        onClick={async () => {
          try {
            const send = await axios.post('/api/email');
            console.log(send);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Send
      </button>
    </div>
  );
}

export default page;
