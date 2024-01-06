import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
    {
        userId: {
            type: String, 
            required: true,
        },
        firstName: {
            type: String, 
            required: true,
        }, 
        lastName: {
            type: String, 
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    }, {timestamps: true}
);

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;