import express from "express";
import {createNote, deleteNote, getParticularNote, getUserNotes, updatePost} from "../controllers/notes.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// READ
router.get("/:userId", verifyToken, getUserNotes);
router.get("/search/:id", verifyToken, getParticularNote);

// // WRITE
router.post("/submit", verifyToken, createNote)

// // UPDATE
router.put("/update/:id", verifyToken, updatePost);

// DELETE
router.delete("/:id", verifyToken, deleteNote);


export default router;