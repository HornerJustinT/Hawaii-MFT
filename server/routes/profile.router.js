const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {

    const queryText = `SELECT * FROM members WHERE "id" = $1;`;

    if (req.isAuthenticated()) {
        pool.query(queryText, [req.params.id])
            .then((result) => {
                res.send(result.rows[0]);
            }).catch((error) => {
                console.log('Error in GET profile', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});


/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;