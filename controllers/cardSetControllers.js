import firebase from "../firebase.js";
import CardSet from "../cardSetModel.js";

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

export const getCardSets = async (req, res) => {
  try {
    const cardSet = await getDocs(doc(db, "FlashCards"));
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

export const getBySearchID = async (req, res) => {
  try {
    const searchID = req.params.searchID;
    const cardSet = doc(db, "FlashCards", searchID);
    const data = await getDoc(cardSet);
    if (!data.exists()) {
      res.status(404).send("Card Set not found");
    } else {
      res.status(200).send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getByEditID = async (req, res) => {
  try {
    const editID = req.params.editID;
    const cardSet = doc(db, "FlashCards", editID);
    const data = await getDoc(cardSet);
    if (!data.exists()) {
      res.status(404).send("Card Set not found");
    } else {
      res.status(200).send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateCardSet = async (req, res) => {
  try {
    const editID = req.params.editID;
    const cardSet = doc(db, "FlashCards", editID);
    await updateDoc(cardSet, req.body);
    res.status(200).send("Card Set updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteCardSet = async (req, res) => {
  try {
    const editID = req.params.editID;
    await deleteDoc(doc(db, "FlashCards", editID));
    res.status(200).send("Card Set deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
