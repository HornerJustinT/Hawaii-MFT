const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/:id', (req, res) => {  
    console.log(req.params.id)
    const queryText =  `INSERT INTO "registration" ("registration_key", "used") VALUES ($1, false);`
    pool.query(queryText, [req.params.id])
      .then(() => res.sendStatus(201))
      .catch((err) => {
        console.log(err)
        res.sendStatus(500)
      });
  });
  


module.exports = router;

