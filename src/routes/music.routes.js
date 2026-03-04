const express = require('express')
const musicController = require('../controllers/music.controller')
const upload = require('multer')({ storage: multer.memoryStorage() })
const router = express.Router()

router.post('/create-music', upload.single('music'), musicController.createMusic)

router.post('/create-album', musicController.createAlbum)



module.exports = router