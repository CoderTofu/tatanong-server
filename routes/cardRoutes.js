import express from "express";

import {
  createCardSet,
  getCardSets,
  getBySearchID,
  getByEditID,
  updateCardSet,
  deleteCardSet,
} from "../controllers/cardSetControllers.js";

const router = express.Router();

router.get("/", getCardSets);
router.post("/new", createCardSet);
router.get("/cardset/:searchID", getBySearchID);
router.get("/cardset/:editID", getByEditID);
router.put("/update/:editID", updateCardSet);
router.delete("/delete/:editID", deleteCardSet);

export default router;
