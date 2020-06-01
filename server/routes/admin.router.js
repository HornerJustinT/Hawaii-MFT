const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', async(req, res) => {
    const connection = await pool.connect();
    try {
        let query = `SELECT m.id, m.first_name, m.last_name,
            array_agg(DISTINCT license_type_pivot.license_number) AS license_number

            FROM members m
            
            JOIN license_type_pivot ON license_type_pivot.member_id = m.id
    
		    GROUP BY m.id, m.first_name, m.last_name`;
        const members = await connection.query(query);

        res.send(members.rows)

      } catch (error) {
        console.log(`Error Selecting members (admin)`, error)
        res.sendStatus(500);
      } finally {
        connection.release();
      }
});

router.get("/name/:name", async (req, res) => {
  const connection = await pool.connect();
  try {
    let query = `SELECT m.id, m.first_name, m.last_name,
            array_agg(DISTINCT license_type_pivot.license_number) AS license_number

            FROM members m
            
            JOIN license_type_pivot ON license_type_pivot.member_id = m.id

            WHERE LOWER(m.first_name) LIKE $1 OR LOWER(m.last_name) LIKE $1
		    GROUP BY m.id, m.first_name, m.last_name`;
    const members = await connection.query(query, ['%' + req.params.name.toLowerCase() + '%']);

    res.send(members.rows);
  } catch (error) {
    console.log(`Error Selecting members (admin)`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});


module.exports = router;