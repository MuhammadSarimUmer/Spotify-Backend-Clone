const musicModel = require('../models/music.model')
const uploadFile = require('../services/storage.service')
const albumModel = require('../models/album.model')

const jwt = require('jsonwebtoken')

async function createMusic(req, res) {





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
        artist: req.user.id
    })

}


async function createAlbum(req, res) {


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
        artist: req.user.id
    })
}


async function getAllMusic(req, res) {
    const musics = await musicModel.find().populate('artist', 'username email')
    res.status(200).json({
        message: "Musics",
        musics
    })




}
module.exports = { createMusic, createAlbum, getAllMusic }