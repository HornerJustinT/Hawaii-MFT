const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


const criteria = [
  "specialty",
  "insurance",
  "treatment_preferences",
  "languages",
  "ages_served",
  "client_focus",
  "session_format",
  "supervision_status",
  "license_type"
];


/**
 * GET search route
 */
router.get('/', async (req, res) => {
    const connection = await pool.connect();
    try {
		const parameters = [];
		let paramCount = 1;
		let where = false;
        const startQuery = `SELECT m.*, license_type.title AS license_title,
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
			JOIN treatment_preferences ON treatment_preferences.treatment_preferences_id = treatment_preferences_pivot.treatment_preferences_id`;

		const endQuery = `\nGROUP BY m.id, license_type.title, m.zip_code, m.first_name, m.last_name, m.prefix, m.age, m.license_state,
			m.license_expiration, m.hiamft_member_account_info, m.supervision_Status, m.fees, m.credentials,
			m.telehealth, m.statement, m.website, m.title, m.city, m.license_number, m.license_type;`;

		let whereQuery = ''

		if (req.query.name) {
			if (!where){
				whereQuery += `\nWHERE `
				where = true;
			} else {
				whereQuery += `\nAND `;
			}
			whereQuery += `(LOWER(m.first_name) LIKE $${paramCount} 
							OR LOWER(m.last_name) LIKE $${paramCount}
							OR LOWER(CONCAT_WS( ' ', m.first_name, m.last_name )) LIKE $${paramCount})`;
			parameters.push("%" + req.query.name.toLowerCase() + "%");
			paramCount++;
		}

		if (req.query.zip) {
			if (!where) {
				whereQuery += `\nWHERE `;
				where = true;
			} else {
				whereQuery += `\nAND `;
			}
			whereQuery += `(CAST(m.zip_code AS VARCHAR) LIKE $${paramCount}
			OR LOWER(m.city) LIKE $${paramCount}
			OR LOWER(m.island) LIKE $${paramCount})`;
			parameters.push("%" + req.query.zip.toLowerCase() + "%");
			paramCount++;
		}

		if (req.query.license_number) {
			if (!where) {
				whereQuery += `\nWHERE `;
				where = true;
			} else {
				whereQuery += `\nAND `;
			}
			whereQuery += `(CAST(m.license_number AS VARCHAR) LIKE $${paramCount})`;
			parameters.push("%" + req.query.license_number.toLowerCase() + "%");
			paramCount++;
		}

		if (req.query.id) {
			if (!where) {
				whereQuery += `\nWHERE `;
				where = true;
			} else {
				whereQuery += `\nAND `;
			}
			whereQuery += `(CAST(m.id AS VARCHAR) LIKE $${paramCount})`;
			parameters.push("%" + req.query.id.toLowerCase() + "%");
			paramCount++;
		}

		for (let parse of criteria) {
			if (req.query[parse]) {
				if (!where) {
					whereQuery += `\nWHERE `;
					where = true;
				} else {
					whereQuery += `\nAND `;
				}

				if (parse === "ages_served") {
					whereQuery += `LOWER(age_groups_served.title LIKE LOWER($${paramCount})`;
				} else if (parse === "LOWER(insurance") {
                 whereQuery += `LOWER(insurance_type.title LIKE LOWER($${paramCount})`;
               } else if (parse === "supervision_status") {
                 whereQuery += `LOWER(m.supervision_status LIKE LOWER($${paramCount})`;
               } else {
                 whereQuery += `LOWER(${parse}.title) LIKE LOWER($${paramCount})`;
               }

				parameters.push("%" + req.query[parse] + "%");
				paramCount++;
			}
		}

		if (req.query.telehealth) {
			if (!where) {
				whereQuery += `\nWHERE `;
				where = true;
			} else {
				whereQuery += `\nAND `;
			}

			whereQuery += `m.telehealth = true`;
		}

		let query = startQuery + whereQuery + endQuery;

        const members = await connection.query(query, parameters);
        res.send(members.rows)

      } catch (error) {
        console.log(`Error Selecting members`, error)
        res.sendStatus(500);
      } finally {
        connection.release();
      }
});

module.exports = router;