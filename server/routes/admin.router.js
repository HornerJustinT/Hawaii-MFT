const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', async(req, res) => {
    const connection = await pool.connect();
    try {
        let query = `SELECT m.id, m.first_name, m.last_name, m.license_number, license_type.title

            FROM members m
            JOIN license_type on m.license_type = license_type.license_type_id;`;
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
    let query = `SELECT m.id, m.first_name, m.last_name, m.license_number, license_type.title

            FROM members m
            JOIN license_type on m.license_type = license_type.license_type_id

            WHERE LOWER(m.first_name) LIKE $1 OR LOWER(m.last_name) LIKE $1`;
    const members = await connection.query(query, ['%' + req.params.name.toLowerCase() + '%']);

    res.send(members.rows);
  } catch (error) {
    console.log(`Error Selecting members by name (admin)`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.get("/id/:id", async (req, res) => {
  const connection = await pool.connect();
  try {
    let query = `SELECT m.id, m.first_name, m.last_name, m.license_number, license_type.title

            FROM members m
            JOIN license_type on m.license_type = license_type.license_type_id

            WHERE CAST(m.id AS VARCHAR) LIKE $1`;
    const members = await connection.query(query, ["%" + req.params.id + '%']);

    res.send(members.rows);
  } catch (error) {
    console.log(`Error Selecting members by id (admin)`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.get("/license/:license", async (req, res) => {
  const connection = await pool.connect();
  try {
    let query = `SELECT m.id, m.first_name, m.last_name, m.license_number, license_type.title

            FROM members m
            JOIN license_type on m.license_type = license_type.license_type_id
            WHERE m.license_number LIKE $1;`;
    const members = await connection.query(query, [
      "%" + req.params.license + "%",
    ]);

    res.send(members.rows);
  } catch (error) {
    console.log(`Error Selecting members by id (admin)`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.get("/type/:type", async (req, res) => {
  const connection = await pool.connect();
  try {
    let query = `SELECT m.id, m.first_name, m.last_name, m.license_number, license_type.title

            FROM members m
            JOIN license_type on m.license_type = license_type.license_type_id
            WHERE LOWER(license_type.title) LIKE $1;`;
    const members = await connection.query(query, [
      "%" + req.params.type.toLowerCase() + "%",
    ]);

    res.send(members.rows);
  } catch (error) {
    console.log(`Error Selecting members by id (admin)`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

module.exports = router;