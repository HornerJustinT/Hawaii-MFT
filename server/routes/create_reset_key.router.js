const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/:id', (req, res) => {  
    const queryText = `INSERT INTO "password_reset" ("key") VALUES ($1);`;
    pool.query(queryText, [req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      });
  });
  


module.exports = router;

