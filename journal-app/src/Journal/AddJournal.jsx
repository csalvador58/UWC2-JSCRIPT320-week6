import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../db';

export default function AddJournal() {
  const [entry, setEntry] = useState('');

  console.log(entry);

  const submitForm = (e) => {
    e.preventDefault();
    console.log('submit');
    console.log(entry);

    // Add a new document with a generated id.
    const entriesRef = collection(db, 'journal-entries');
    addDoc(collection(db, 'journal-entries'), {
      entry,
      createdAt: new Date(),
    }).then(setEntry(''));
    //   console.log('Document written with ID: ', docRef.id);
  };

  return (
    <div>
      <h2>Add Journal Entry</h2>
      <form onSubmit={submitForm}>
        <label htmlFor='entry-input'>Entry: </label>
        <textarea id='entry-input' onChange={(e) => setEntry(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
