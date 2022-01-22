import express from 'express';
import { readdir } from 'fs/promises';

const router = express.Router();

let songs;
let source;

try {
    songs = await readdir('./public/songs/');
    songs.filter((file) => {
        file != '.' && file != '..';
    });
} catch (err) {
    console.error(err);
}

console.log(`songs found: ${songs}`);

/* redirect to random song index */
router.get('/', (req, res) => {
    let index = Math.floor(Math.random() * songs.length);
    res.redirect(index);
});

/* plays song at indicated modulus index */
router
    .route('/:id(\\d+)')
    .get((req, res) => {
        source = songs[req.index];    
        res.render('song', { cache: true, source: '../static/songs/' + source });
        console.log(`Playing number ${req.params.id}`);
    })

/* get track ID by modulus */
router.param('id', (req, res, next, id) => {
    req.index = ((id % songs.length) + songs.length) % songs.length; // get modulus of num of songs
    next(); // run response
})

export default router;