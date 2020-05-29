const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', async (req, res) => {
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN;');
        let query = `SELECT m.*, 
	array_agg(DISTINCT languages.title) AS languages,
	array_agg(DISTINCT age_groups_served.title) AS ages_served,
	array_agg(DISTINCT client_focus.title) AS client_focus,
	array_agg(DISTINCT insurance_type.title) AS insurance,
	array_agg(DISTINCT island.title) AS island,
	array_agg(DISTINCT license_type.title) AS license_type,
	array_agg(DISTINCT session_format.title) AS session_format,
	array_agg(DISTINCT specialty.title) AS specialty,
	array_agg(DISTINCT treatment_preferences.title) AS treatment_preferences,
	ARRAY(SELECT DISTINCT phone_table.number FROM phone_table WHERE phone_table.business = true AND phone_table.member_id = m.id) AS phone

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
	
	JOIN license_type_pivot ON license_type_pivot.member_id = m.id
	JOIN license_type ON license_type.license_type_id = license_type_pivot.license_type_id
	
	JOIN session_format_pivot ON session_format_pivot.member_id = m.id
	JOIN session_format ON session_format.session_format_id = session_format_pivot.session_format_id
	
	JOIN specialty_pivot ON specialty_pivot.member_id = m.id
	JOIN specialty ON specialty.specialty_id = specialty_pivot.specialty_id
	
	JOIN treatment_preferences_pivot ON treatment_preferences_pivot.member_id = m.id
	JOIN treatment_preferences ON treatment_preferences.treatment_preferences_id = treatment_preferences_pivot.treatment_preferences_id		
		
		GROUP BY m.id, m.zip_code, m.first_name, m.last_name, m.prefix, m.age, m.license_state, m.license_expiration, m.hiamft_member_account_info, m.supervision_Status, m.fees;`;
        const members = await connection.query(query);

        await connection.query('COMMIT;');

        res.send(members.rows)

      } catch (error) {
        console.log(`Error Selecting members`, error)
        await connection.query('ROLLBACK;');
        res.sendStatus(500);
      } finally {
        connection.release();
      }
});


module.exports = router;