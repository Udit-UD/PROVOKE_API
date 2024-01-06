import User from "../models/user.js";
import Notes from "../models/Notes.js";

// CREATE

export const createNote = async (req, res) => {
    try{
        const {userId, title, content} = req.body;
        const user = await User.findById(userId);
        const newNote = new Notes({
            userId,
            firstName: user.firstName, 
            lastName: user.lastName, 
            title,
            content
        })
        await newNote.save();
        const Note = await Notes.find(); 
        res.status(200).json("Note Successfully Created");
    }
    catch(err){
        res.status(409).json({error: err.message});
    }
}

// READ
export const getParticularNote = async (req, res) => {
    try{    
        const {id} = req.params;
        const Note = await Notes.findById(id);
        res.status(200).json(Note);
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
}

export const getUserNotes = async(req, res) => {
    try{
        const { userId } = req.params;
        const Note = await Notes.find({ userId });
        res.status(200).json(Note);
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
}

// UPDATE
export const updatePost = async(req, res) => {
    try{
        const {id} = req.params;
        const { title, content } = req.body;
        const existingNote = await Notes.findById(id);
        if(!existingNote){
            return res.status(404).json({error: "Note not found!"});
        }
        const authenticatedUserId = req.user.id;

        if (existingNote.userId.toString() !== authenticatedUserId) {
            return res.status(403).json({ error: "Permission denied. You are not the owner of this note." });
        }
        existingNote.title = title || existingNote.title;
        existingNote.content = content || existingNote.content;
        const updatedNote = await existingNote.save();

        res.status(200).json(updatedNote);
    }
    catch(e){
        res.status(501).json({error: e.message});
    }
}

export const deleteNote = async( req, res) => {
    try{
        const {id} = req.params;
        const existingNote = await Notes.findById(id);
    
        if(!existingNote) {
            return res.status(404).json({error: "Note not found"});
        }
        const authenticatedUserId = req.user.id;
        if (existingNote.userId.toString() !== authenticatedUserId) {
            return res.status(403).json({ error: "Permission denied. You are not the owner of this note." });
        }
        await Notes.deleteOne({ _id: id });
    
        res.status(200).json({message: "Deletion done successfully!"});
    }

    catch(e){
        res.status(501).json({error: e.message});
    }
    
}