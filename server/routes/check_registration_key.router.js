const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('made it to server with', req.params.id);
    const queryText = `SELECT * FROM "registration" WHERE registration_key = $1;`

    pool.query(queryText, [req.params.id])
        .then((result) => res.send(result.rows))
        .catch(() => res.sendStatus(500));
});

module.exports = router;


// router.get('/session', (req, res) => {
  
//     const queryText = `SELECT * FROM "session_format";`;
//         pool.query(queryText)
//             .then((result) => {
//                 res.send(result.rows);
//             }).catch((error) => {
//                 console.log('Error in getting session format', error);
//                 res.sendStatus(500);
//             });
// });
