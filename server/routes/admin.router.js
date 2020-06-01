const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN;');
        let query = `SELECT m.id, m.first_name, m.last_name,
            array_agg(DISTINCT license_type_pivot.license_number) AS license_number

            FROM members m
            
            JOIN license_type_pivot ON license_type_pivot.member_id = m.id
    
		    GROUP BY m.id, m.first_name, m.last_name`;
        const members = await connection.query(query);

        await connection.query('COMMIT;');

        res.send(members.rows)

      } catch (error) {
        console.log(`Error Selecting members (admin)`, error)
        await connection.query('ROLLBACK;');
        res.sendStatus(500);
      } finally {
        connection.release();
      }
});


module.exports = router;