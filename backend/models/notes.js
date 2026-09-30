const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
     title:{
          type: String,
          required: true,
          trim: true
     },
     content:{
          type: String,
          required: true
     },
     userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
     },
     tags: [{
          type: String
     }],
     pinned:{
          type: Boolean,
          default: false 
     },
     archived:{
          type: Boolean,
          default: false 
     },
     deleted:{
          type: Boolean,
          default: false 
     },
},{timestamps: true});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;