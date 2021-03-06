const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
// GET ROUTE for specific members gets all the info on a single person based on the param id
router.get('/:id', async (req, res) => {
    const connection = await pool.connect();

    try {
         let query = `SELECT m.*, 
			array_agg(DISTINCT languages.title) AS languages,
			array_agg(DISTINCT age_groups_served.title) AS ages_served,
			array_agg(DISTINCT client_focus.title) AS client_focus,
			array_agg(DISTINCT insurance_type.title) AS insurance,
			array_agg(DISTINCT island.title) AS island,
			array_agg(DISTINCT session_format.title) AS session_format,
			array_agg(DISTINCT specialty.title) AS specialty,
			array_agg(DISTINCT treatment_preferences.title) AS treatment_preferences,
			ARRAY(SELECT DISTINCT phone_table.number FROM phone_table WHERE phone_table.business = true AND phone_table.member_id = m.id) AS phone,
			ARRAY(SELECT DISTINCT address_table.address FROM address_table WHERE address_table.business = true AND address_table.member_id = m.id) AS address,
			ARRAY(SELECT DISTINCT email_table.email FROM email_table WHERE email_table.business = true AND email_table.member_id = m.id) AS email
			FROM members m
			
			JOIN languages_pivot ON languages_pivot.member_id = m.id
			JOIN languages ON languages.language_id = languages_pivot.language_id
			
			JOIN age_groups_served_pivot ON age_groups_served_pivot.member_id = m.id
			JOIN age_groups_served ON age_groups_served.age_groups_served_id = age_groups_served_pivot.age_groups_served_id
			
			JOIN client_focus_pivot ON client_focus_pivot.member_id = m.id
			JOIN client_focus ON client_focus.client_focus_id = client_focus_pivot.client_focus_id
			
			JOIN insurance_pivot ON insurance_pivot.member_id = m.id
			JOIN insurance_type ON insurance_type.insurance_type_id = insurance_pivot.insurance_type_id
			
			JOIN island_pivot ON island_pivot.member_id = m.id
			JOIN island ON island.island_id = island_pivot.island_id
			
      JOIN license_type ON license_type.license_type_id = m.license_type

			JOIN session_format_pivot ON session_format_pivot.member_id = m.id
			JOIN session_format ON session_format.session_format_id = session_format_pivot.session_format_id
			
			JOIN specialty_pivot ON specialty_pivot.member_id = m.id
			JOIN specialty ON specialty.specialty_id = specialty_pivot.specialty_id
			
			JOIN treatment_preferences_pivot ON treatment_preferences_pivot.member_id = m.id
			JOIN treatment_preferences ON treatment_preferences.treatment_preferences_id = treatment_preferences_pivot.treatment_preferences_id		
        
            WHERE id = $1
			GROUP BY m.id, m.zip_code, m.first_name, m.last_name, m.prefix, m.age, m.license_state, m.license_type, m.license_number,
			m.license_expiration, m.hiamft_member_account_info, m.supervision_Status, m.fees, m.credentials, island.title,
      m.telehealth, m.statement, m.website, m.title, m.city, m.license_number, m.license_type, m.enabled;`;
      

        const members = await connection.query(query, [req.params.id]);
        res.send(members.rows)

      } catch (error) {
        console.log(`Error Selecting members`, error)
        res.sendStatus(500);
      } finally {
        connection.release();
      }
});
/**
 * PUT route
 */
router.put('/', rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();

  try {
        await connection.query("BEGIN;");
        const memberQuery = `UPDATE "members" 
        SET ("prefix", "first_name", "last_name", "title", "age", 
            "statement",
            "license_state", 
            "license_expiration", "hiamft_member_account_info", 
            "supervision_status","fees", "credentials","telehealth", 
             "license_number", "license_type")
        = 
            ($1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13, 
            $14, $15)
        WHERE id = $16;`;

        //declaring variables for language queries
        const languages = req.body.languagesEdit;
        const languageQuery = `INSERT INTO "languages_pivot" ("language_id", "member_id") VALUES ($1, $2)`;
        const languageDeleteQuery = `DELETE FROM languages_pivot WHERE member_id = $1;`;


        await connection.query(memberQuery, [
          req.body.prefix,
          req.body.firstName,
          req.body.lastName,
          req.body.title,
          req.body.age,
          req.body.statement,
          req.body.licenseState,
          req.body.licenseExpiration,
          req.body.hiamftMemberInfo,
          req.body.supervisionStatus,
          req.body.fees,
          req.body.credentials,
          req.body.telehealth,
          req.body.licenseNumber,
          req.body.licenseType,
          req.body.id,
        ]);
        //Languages PUT & DELETE Queries
        await connection.query(languageDeleteQuery, [req.body.id]);

        for (let i = 0; i < languages.length; i++) {
          await connection.query(languageQuery, [languages[i], req.body.id]);
        }

        await connection.query("COMMIT;");
        res.sendStatus(200);
      }
  catch (error) {
    console.log(`Error on transaction`, error);
    await connection.query('ROLLBACK;');
    res.sendStatus(500);
  }
  finally {
    connection.release();
  }
})

router.put("/contact", rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN;");
    const memberQuery = `UPDATE "members" 
        SET ("city", "zip_code",
            "website")
        = 
            ($1, $2, $3)
        WHERE id = $4;`;


    //declaring variables for island queries
    const island = req.body.islandEdit;
    const islandQuery = `INSERT INTO "island_pivot" ("island_id", "member_id") VALUES ($1, $2)`;
    const islandDeleteQuery = `DELETE FROM island_pivot WHERE member_id = $1;`;

    //declaring variables for phone queries
    const phone = req.body.phone;
    const phoneQuery = `INSERT INTO "phone_table" ("number", "member_id", "business") VALUES ($1, $2, $3)`;
    const phoneDeleteQuery = `DELETE FROM phone_table WHERE member_id = $1;`;

    const email = req.body.email;
    const emailQuery = `INSERT INTO "email_table" ("email", "member_id", "business") VALUES ($1, $2, $3)`;
    const emailDeleteQuery = `DELETE FROM email_table WHERE member_id = $1;`;

    const address = req.body.address;
    const addressQuery = `INSERT INTO "address_table" ("address", "member_id", "business") VALUES ($1, $2, $3)`;
    const addressDeleteQuery = `DELETE FROM address_table WHERE member_id = $1;`;

    await connection.query(memberQuery, [
      req.body.city,
      req.body.zipCode,
      req.body.website,
      req.body.id,
    ]);

    //Islands PUT & DELETE queries
    let queryIsland = null;
    if (Array.isArray(island)) {
      queryIsland = island[0];
    }
    await connection.query(islandDeleteQuery, [req.body.id]);
    await connection.query(islandQuery, [queryIsland || island, req.body.id]);

    // Phone PUT & DELETE
    await connection.query(phoneDeleteQuery, [req.body.id]);
    await connection.query(phoneQuery, [phone, req.body.id, "TRUE"]);

    //Email PUT & DELETE
    let queryEmail = null;
    if (Array.isArray(email)) {
      queryEmail = email[0];
    }
    await connection.query(emailDeleteQuery, [req.user.id]);
    await connection.query(emailQuery, [queryEmail || email, req.user.id, 'TRUE']);
    
    //Address PUT & DELETE
    let queryAddress = null;
    if (Array.isArray(address)) {
      queryAddress = address[0];
    }
    await connection.query(addressDeleteQuery, [req.user.id]);
    await connection.query(addressQuery, [queryAddress || address, req.user.id, 'TRUE']);

    await connection.query("COMMIT;");
    res.sendStatus(200);
  } catch (error) {
    console.log(`Error on contract transaction`, error);
    await connection.query("ROLLBACK;");
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.put("/practice", rejectUnauthenticated, async (req, res) => {
  // const connection = await pool.connect();

  // try {
  //   await connection.query("BEGIN;");
  //   const memberQuery = `UPDATE "members" 
  //       SET ("city", "zip_code",
  //           "website")
  //       = 
  //           ($1, $2, $3)
  //       WHERE id = $4;`;

  //   //declaring variables for island queries
  //   const island = req.body.islandEdit;
  //   const islandQuery = `INSERT INTO "island_pivot" ("island_id", "member_id") VALUES ($1, $2)`;
  //   const islandDeleteQuery = `DELETE FROM island_pivot WHERE member_id = $1;`;

    //declaring variables for phone queries
    // const phone = req.body.phone;
    // const phoneQuery = `INSERT INTO "phone_table" ("number", "member_id", "business") VALUES ($1, $2, $3)`;
    // const phoneDeleteQuery = `DELETE FROM phone_table WHERE member_id = $1;`;

    // const email = req.body.email;
    // const emailQuery = `INSERT INTO "email_table" ("email", "member_id", "business") VALUES ($1, $2, $3)`;
    // const emailDeleteQuery = `DELETE FROM email_table WHERE member_id = $1;`;

    // const address = req.body.address;
    // const addressQuery = `INSERT INTO "address_table" ("address", "member_id", "business") VALUES ($1, $2, $3)`;
    // const addressDeleteQuery = `DELETE FROM address_table WHERE member_id = $1;`;

    // await connection.query(memberQuery, [
    //   req.body.city,
    //   req.body.zipCode,
    //   req.body.website,
    //   req.body.id,
    // ]);

    // //Islands PUT & DELETE queries
    // await connection.query(islandDeleteQuery, [req.body.id]);
    // await connection.query(islandQuery, [island[0], req.body.id]);

    // Phone PUT & DELETE
    // await connection.query(phoneDeleteQuery, [req.body.id]);
    // await connection.query(phoneQuery, [phone, req.body.id, "TRUE"]);

    //   //Email PUT & DELETE
    //     await connection.query(emailDeleteQuery, [req.user.id]);
    //     await connection.query(emailQuery, [email, req.user.id, 'TRUE']);

    //     //Address PUT & DELETE
    //     await connection.query(addressDeleteQuery, [req.user.id]);
    //     await connection.query(addressQuery, [address, req.user.id, 'TRUE']);

  //   await connection.query("COMMIT;");
  //   res.sendStatus(200);
  // } catch (error) {
  //   console.log(`Error on transaction`, error);
  //   await connection.query("ROLLBACK;");
  //   res.sendStatus(500);
  // } finally {
  //   connection.release();
  // }

});

// Enabled or disabled the account based on whats given to it
router.put("/enable", rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();

  // The query itself is a pretty basic update query
  let queryText = 'UPDATE members SET enabled = $1 WHERE id = $2';
  pool.query(queryText,[req.body.enabled, req.body.id]).then(result => {
    // Sends the "OK" to the client
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('error updating members', error);
    res.sendStatus(500);
  });
});


module.exports = router;