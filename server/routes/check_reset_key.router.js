const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "password_reset" WHERE key = $1;`;

    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result)
        })
        .catch(() => res.sendStatus(500));
});

module.exports = router;
