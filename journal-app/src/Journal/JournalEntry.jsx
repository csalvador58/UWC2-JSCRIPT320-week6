import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../db';

export default function JournalEntry() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [entry, setEntry] = useState([]);

  useEffect(() => {
    const entryRef = doc(db, 'journal-entries', id);
    getDoc(entryRef).then((docSnap) => {
      setIsLoading(false);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setEntry(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
        setHasError(true);
      }
    });
  }, [id]);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (hasError) {
    return <p>Has error!</p>;
  }

  return (
    <div>
      <h1>Journal Entry: {id}</h1>
      {entry.entry}
    </div>
  );
}
