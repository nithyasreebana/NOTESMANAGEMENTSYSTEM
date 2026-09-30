const express = require("express");
const router = express.Router();
const {authenticateUser} = require("../middlewares/auth");
const {handleCreateNotes, 
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
} = require("../controllers/note");

router.post("/", authenticateUser, handleCreateNotes);
router.get("/", authenticateUser, handleGetAllNotes)
router.get("/search", authenticateUser, handleSearchNotes)
router.get("/archived", authenticateUser, handleGetArchivedNotes);
router.get("/pinned", authenticateUser, handleGetPinnedNotes);
router.get("/trash", authenticateUser, handleGetTrashNotes);
router.get("/tag/:tag", authenticateUser, handleGetNotesByTag)
router.patch("/:id/pin", authenticateUser, handlePinNotes)
router.patch("/:id/archive", authenticateUser, handleArchiveNotes);
router.patch("/:id/restore", authenticateUser, handleRestoreNote);
router.get("/:id", authenticateUser, handleGetSpecificNote)
router.put("/:id", authenticateUser, handleCompleteUpdate);
router.delete("/:id", authenticateUser, handleSoftDelete);
module.exports = router;