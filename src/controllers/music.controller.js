const musicModel = require('../models/music.model')
const uploadFile = require('../services/storage.service')
const jwt = require('jsonwebtoken')

async function createMusic(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== "artist") {
            return res.status(401).json({ message: "Unauthorized" })
        }



        const { title } = req.body
        const file = req.file

        const result = await uploadFile(file.buffer.toString("base64"))

        const music = await musicModel.create({
            uri: result.url,
            title,
            author: decoded.id
        })
        res.status(201).json({
            message: "Music Created",
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        })

    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }



}

async function createAlbum(req, res) {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role !== "artist") {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const { title, musics } = req.body
        const artist = decoded.id
        const album = await albumModel.create({
            title,
            musics,
            artist
        })
        res.status(201).json({
            message: "Album Created",
            id: album._id,
            title: album.title,
            musics: album.musics,
            artist: album.artist
        })
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }

}

module.exports = { createMusic, createAlbum }