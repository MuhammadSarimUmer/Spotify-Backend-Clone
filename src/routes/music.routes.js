const express = require('express')
const musicController = require('../controllers/music.controller')
const upload = require('multer')({ storage: multer.memoryStorage() })
const authMiddleware = require('../middlewares/auth.middleware')
const musicMiddleware = require('../middlewares/music.middleware')
const router = express.Router()

router.post('/create-music', authMiddleware.artistMiddleware, upload.single('music'), musicController.createMusic)

router.post('/create-album', authMiddleware.artistMiddleware, musicController.createAlbum)

router.get('/', musicMiddleware.artistMiddleware, musicController.getAllMusic)



module.exports = router