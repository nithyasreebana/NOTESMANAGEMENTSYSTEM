const Note = require("../models/notes");

async function handleCreateNotes(req, res){
     try{
          const {title, content, tags} = req.body;
          if(!title || !content){
               return res.status(400).json({
                    message: "Title and content are required"
               });
          }

          const userId = req.user.id;
          const note = await Note.create({
               title,
               content,
               tags,
               userId
          });

          return res.status(201).json({
               message: "Note Created Successfully",
               note
          });
     } catch(err){
          return res.status(500).json({
               message: "Error while creating notes",
          })
     }
}

async function handleGetAllNotes(req, res){
     try{
          const userId = req.user.id;
          const notes = await Note.find({
               userId,
               deleted: false
          });

          return res.status(200).json({
               message: "Notes Fetched Successfully",
               notes
          })
     } catch(err){
          return res.status(500).json({
               message: "Error while reteriving the notes"
          });
     }
}

async function handleGetSpecificNote(req, res){
     try{
          const noteId = req.params.id;
          const userId = req.user.id;

          const notes = await Note.findOne({
               _id: noteId,
               userId
          });

          if(!notes){
               return res.status(400).json({
                    message: "User doesn't contain the notes"
               })
          }

          return res.status(200).json({
               message: "Fetch Successfull",
               notes
          });
     } catch(err){
          return res.status(500).json({
               message: "Cannot get Notes Due to error",
               error: err.message
          });

     }
}

async function handleCompleteUpdate(req, res){
     try{
          const noteId = req.params.id;
          const userId = req.user.id;
          const {title, content, tags} = req.body;

          const note = await Note.findOneAndUpdate(
               {
                    _id: noteId,
                    userId
               }, 
               {
                    title,
                    content, 
                    tags,
               },
               {
                    returnDocument: "after"
               }
          )

          if(!note){
               return res.status(404).json({
                    message: "Note not found"
               });
          }

          return res.status(200).json({
               message: "Note updated Successfully",
               note
          })

     } catch(err){
          return res.status(500).json({
               message: "Error updating the notes",
               error: err.message
          })
     }
}

async function handleSearchNotes(req, res){
     try{
          const query = req.query.query;
          const userId = req.user.id;
          console.log(query);
          console.log(typeof userId);
          
          const notes = await Note.find({
               userId,
               title:{
                    $regex: query,
                    $options: "i"
               }
          });
          return res.status(200).json({
               message:"Notes fetched successfully",
               notes
          })
     } 
     catch(err){
          res.status(500).json({
               message:"Error while searching the notes",
               error: err.message
          })
     }
}

async function handleGetNotesByTag(req, res){
     try{
          const tag = req.params.tag;
          const userId = req.user.id;

          const notes = await Note.find({
               userId,
               tags:{
                    $regex: tag,
                    $options: "i"
               }
          });

          return res.status(200).json({
               message: "Notes fetched successfully",
               notes
          })
     }
     catch(err){
          return res.status(500).json({
               message:"Notes with tag not found",
               error: err.message
          })
     }
}

async function handlePinNotes(req, res){
     try{
          const noteId = req.params.id;
          const userId = req.user.id;
          const note = await Note.findOne({
               _id: noteId,
               userId
          });

          if(!note){
               return res.status(404).json({
                    message: "Notes not found"
               });
          }

          note.pinned = !note.pinned;
          await note.save();

          return res.status(200).json({
               message: "Notes Pinned successfully",
               note
          });
     }
     catch(err){
          return res.status(500).json({
               message: "Error while pinning the notes",
               error: err.message
          })
     }
}

async function handleArchiveNotes(req, res){
     try{
          const noteId = req.params.id;
          const userId = req.user.id;

          const note = await Note.findOne({
               _id: noteId,
               userId
          })

          if(!note){
               return res.status(404).json({
                    message: "Note not found"
               });
          }

          note.archived = !note.archived;
          await note.save();

          return res.status(200).json({
               message: "Note Archived Successfully",
               note
          })
     }
     catch(err){
          return res.status(500).json({
               message: "Error while archiving the notes",
               error: err.message
          })
     }
}

async function handleGetArchivedNotes(req, res){
     try{
          const userId = req.user.id;

          const note = await Note.find({
               userId,
               archived: true
          })

          if(!note){
               return res.status(400).json({
                    message: "No archived notes",
               });
          }

          return res.status(200).json({
               message: "Archived notes fetched successfully",
               note
          })
     }
     catch(err){
          return res.status(500).json({
               message: "Error while fetching archived notes",
               error: err.message
          });
     }
}

async function handleGetPinnedNotes(req, res){
     try{
          const userId = req.user.id;

          const note = await Note.find({
               userId, 
               pinned: true
          });

          if(!note){
               return res.status(404).json({
                    message: "No Pinned notes"
               });
          }

          return res.status(200).json({
               message: "Pinned Notes fetched successfully",
               note
          })
     }
     catch(err){
          return res.status(500).json({
               message: "Error while fetching pinned notes",
               error: err.message
          })
     }
}

async function handleSoftDelete(req, res){
     try{
          const noteId = req.params.id;
          const userId = req.user.id;

          const note = await Note.findOne({
               _id: noteId,
               userId
          });
          if(!note){
               return res.status(404).json({
                    message: "Note not found"
               });
          }

          note.deleted =  !note.deleted;
          await note.save();
          return res.status(200).json({
               message: "Note deleted successfully",
          });
     } 
     catch(err){
          return res.status(500).json({
               message: "Error while deleting notes",
               error: err.message
          });
     }
}

async function handleGetTrashNotes(req, res){
     try{
          const noteId = req.params.id;
          const userId = req.user.id;

          const notes = await Note.find({
               userId,
               deleted: true
          });

          return res.status(200).json({
               messageP: "Trash notes fetched successfully",
               notes
          });
     }
     catch(err){
          return res.status(500).json({
               message: "Error while fetcching trash notes",
               error: err.message
          });
     }
}

async function handleRestoreNote(req, res){
     try{
          const noteId = req.params.id;
          const userId = req.user.id;
          const note = await Note.findOne({
               _id: noteId,
               userId
          });
          
          if(!note){
               return res.status(404).json({
                    message: "Note not found"
               });
          }

          note.deleted = false;
          await note.save();

          return res.status(200).json({
               message: "Note restored successfully",
               note
          })
     }
     catch(err){
          return res.status(500).json({
               message: "Error while restoring note",
               error: err.message
          })
     }
}

module.exports = {
     handleCreateNotes,
     handleGetAllNotes,
     handleGetSpecificNote,
     handleCompleteUpdate,
     handleSearchNotes,
     handleGetNotesByTag,
     handlePinNotes,
     handleArchiveNotes,
     handleGetArchivedNotes,
     handleGetPinnedNotes,
     handleSoftDelete,
     handleGetTrashNotes,
     handleRestoreNote
}