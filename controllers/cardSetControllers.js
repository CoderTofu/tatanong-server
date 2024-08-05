import firebase from "../firebase.js";
import CardSet from "../cardSetModel.js";

import {
  query,
  where,
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

// Get all card sets
export const getCardSets = async (req, res) => {
  try {
    // create a query
    const cardSetsCollection = collection(db, "FlashCards");
    const querySnapshot = await getDocs(cardSetsCollection);

    if (!querySnapshot.empty) {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      res.status(200).send(results);
    } else {
      res.status(404).send("No Card Sets found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Create a new card set
export const createCardSet = async (req, res) => {
  try {
    const data = req.body;
    // create a class instance
    const cardSet = new CardSet(
      data.searchID,
      data.editID,
      data.title,
      data.cards
    );

    await addDoc(collection(db, "FlashCards"), cardSet.objectify());
    res.status(200).send("Card Set added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a card set by search ID
export const getBySearchID = async (req, res) => {
  try {
    // create a query
    const searchID = req.params.searchID;

    const q = query(
      collection(db, "FlashCards"),
      where("searchID", "==", searchID)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      res.status(200).send(firstDoc.data());
    } else {
      res.status(404).send("No Card Sets found with search ID");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a card set by edit ID
export const getByEditID = async (req, res) => {
  try {
    // create a query
    const editID = req.params.editID;

    const q = query(
      collection(db, "FlashCards"),
      where("editID", "==", editID)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      res.status(200).send(firstDoc.data());
    } else {
      res.status(404).send("No Card Sets found with edit ID");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update a card set
export const updateCardSet = async (req, res) => {
  try {
    // create a query
    const editID = req.params.editID;
    const update = req.body;

    const q = query(
      collection(db, "FlashCards"),
      where("editID", "==", editID)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      const docRef = doc(db, "FlashCards", firstDoc.id);

      // Update the document
      await updateDoc(docRef, update);

      res.status(200).send("Card Set updated successfully");
    } else {
      res.status(404).send("No Card Set found with the given name");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a card set
export const deleteCardSet = async (req, res) => {
  try {
    // create a query
    const editID = req.params.editID;

    const q = query(
      collection(db, "FlashCards"),
      where("editID", "==", editID)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      const docRef = doc(db, "FlashCards", firstDoc.id);

      // Delete the document
      await deleteDoc(docRef);

      res.status(200).send("Card Set deleted successfully");
    } else {
      res.status(404).send("No Card Set found with the given ID");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
