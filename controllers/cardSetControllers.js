import firebase from "../firebase";
import CardSet from "../cardSetModel";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

export const createCardSet = async (req, res) => {
  try {
    const data = req.body;
    await addDoc(collection(db, "FlashCards"), data);
    res.status(200).send("Card Set added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getCardSet = async (req, res) => {
  try {
    const cardSet = await getDocs(doc(db, "FlashCards", req.params.id));
    const cardSetArray = [];

    if (cardSet.empty) {
      res.status(404).send("No card set found");
    } else {
      cardSet.forEach((doc) => {
        const cardSet = new CardSet(
          doc.data().searchID,
          doc.data().editID,
          doc.data().title,
          doc.data().cards
        );
        cardSetArray.push(cardSet);
      });
      res.status(200).send(cardSetArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
