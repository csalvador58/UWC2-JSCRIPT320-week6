import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import db from '../db';
import { Link } from 'react-router-dom';
import AddJournal from '../Journal/AddJournal';
import { doc, deleteDoc } from 'firebase/firestore';

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    // const getData = async () => {
    //     const querySnapshot = await getDocs(collection(db, "journal-entries"));
    //     console.log(querySnapshot.docs)
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // }
    // getData();

    // getDocs(collection(db, 'journal-entries')).then(
    //     snapshot => {
    //         // snapshot.forEach(doc => {
    //         //     console.log(doc.data())
    //         // })
    //         setEntries(snapshot.docs);
    //         setIsLoading(false);
    //     },
    //     error => {
    //         console.log(error);
    //         setIsLoading(false);
    //         setHasError(true);
    //     }
    // )

    const entriesQuery = query(
      collection(db, 'journal-entries'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      collection(db, 'journal-entries'),
      (snapshot) => {
        // snapshot.forEach(doc => {
        //     console.log(doc.data())
        // })
        setEntries(snapshot.docs);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
        setHasError(true);
      }
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (hasError) {
    return <p>Has error!</p>;
  }

  const deleteHandler = (id) => {
    const entryRef = collection(db, 'journal-entries', id);
    deleteDoc(collection(db, 'journal-entries', id));
  };

  return (
    <div>
      <h1>Journal Entries</h1>
      <AddJournal />
      {entries.map((entry) => {
        console.log(entry.id);
        return (
          <div key={entry.id}>
            <p>
              {entry.data().entry}
              <span>
                <Link to={`/journal/${entry.id}`}>View</Link>
              </span>
            </p>
            <p onClick={deleteHandler(entry.id)}>Delete</p>
          </div>
        );
      })}
    </div>
  );
}

// docs[0]['_document'].data.value.mapValue.fields
