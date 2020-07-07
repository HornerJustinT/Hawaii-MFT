const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This is a list of possible querys that are
// all basically the same to search through.
// using an array like this simplifies code later
// into a for loop instead of a lot of if statements in a row.
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
	// Allows us to use SQL much nicer.
	const connection = await pool.connect();

    try {
		// Creating variables for use later
		const parameters = [];
		let paramCount = 1;

		// This is the start of the query before the 'WHERE' part would happen
		// Its basically just a lot of things to select and JOIN
		const startQuery = `SELECT m.*,"user".username as username ,license_type.title AS license_title,
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
			JOIN "user" on "user".id = m.id
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

		// This is the end part of the query for after the 'WHERE'
		// portion of a query.
		const endQuery = `\nGROUP BY m.id, license_type.title, m.zip_code, m.zip_code_personal, m.first_name, m.last_name, m.prefix, m.age, m.license_state,
			m.license_expiration, m.hiamft_member_account_info, m.supervision_Status, m.fees, m.credentials,
			m.telehealth, m.statement, m.website, m.title, m.city, m.city_personal, m.license_number, m.license_type, m.enabled,"user".username, m.student;`;

		// This is the 'WHERE' part of the query. It's the only one
		// that uses let instead of const because it's very likely to
		// change. If it doesnt change however the SQL still works and
		// simply returns all results instead.
		// This is used on the advanced search and admin pages as soon
		// as the page loads to give you a list of all users on load.
		let whereQuery = "";

		// If the query exists then we need to add the SQL to the
		// whereQuery variable.
		if (!req.query.admin) {
			if (!parameters[0]) {
				whereQuery += `\nWHERE `;
			} else {
				whereQuery += `\nAND `;
			}

			// Wrapping the zip_code in CAST() turns the int type
			// variable into a string we can use in the search.
			// Without using CAST this would error because 'LIKE'
			// doesnt work with int variables.
			whereQuery += `m.enabled = $${paramCount}`;
			parameters.push(true);
			paramCount++;
		}
	
		if (req.query.name) {
		// This determines if its the first one of if its adding
		// to another query thats already been loaded.
			if (!parameters[0]) {
				// If first start the SQL WHERE with a 'WHERE' statement.

				// \n is used to add a new line preventing possible conflicts
				// with other parts of the query by ensuring they are on
				// different lines.
				whereQuery += `\nWHERE `;
			} else {
				// If not first it needs to add an 'AND' to the SQL
				whereQuery += `\nAND `;
			}
			// This is adding the SQL itself to the whereQuery variable.

			// The variable paramCount is being used to ensure that the
			// $1, $2, $3, etc parts of the SQL are added properly to
			// the SQL and correctly match the parameters.
			whereQuery += `(LOWER(m.first_name) LIKE LOWER($${paramCount}) 
				OR LOWER(m.last_name) LIKE LOWER($${paramCount})
				OR LOWER(CONCAT_WS( ' ', m.first_name, m.last_name )) LIKE LOWER($${paramCount}))`;

			// Wrapping everything in LOWER() ensures that the search
			// isn't case sensitive. Without this it would mean someone
			// searching john wouldnt find John because they forgot to
			// capitalize the first letter.

			// This pushes the value of the query to the parameters array.
			// % is added to both sides to allow the query to use 'LIKE'
			// and search through all parts of the word not just the beginning
			// or the end.
			parameters.push("%" + req.query.name + "%");

			// Adds to paramcount to keep future params correct.
			paramCount++;
		}

		// The SQL can vary based on the query being used, however
		// the basic idea remains.
		if (req.query.zip) {
			if (!parameters[0]) {
				whereQuery += `\nWHERE `;
			} else {
				whereQuery += `\nAND `;
			}

			// Wrapping the zip_code in CAST() turns the int type
			// variable into a string we can use in the search. 
			// Without using CAST this would error because 'LIKE'
			// doesnt work with int variables.
			whereQuery += `(LOWER(CAST(m.zip_code AS VARCHAR)) LIKE LOWER($${paramCount})
				OR LOWER(m.city) LIKE LOWER($${paramCount})
				OR LOWER(island.title) LIKE LOWER($${paramCount}))`;
			parameters.push("%" + req.query.zip + "%");
			paramCount++;
		}

		if (req.query.license_number) {
			if (!parameters[0]) {
				whereQuery += `\nWHERE `;
			} else {
				whereQuery += `\nAND `;
			}
			whereQuery += `(LOWER(CAST(m.license_number AS VARCHAR)) LIKE LOWER($${paramCount}))`;
			parameters.push("%" + req.query.license_number + "%");
			paramCount++;
		}

		if (req.query.id) {
			if (!parameters[0]) {
				whereQuery += `\nWHERE `;
			} else {
				whereQuery += `\nAND `;
			}
			whereQuery += `(LOWER(CAST(m.id AS VARCHAR)) LIKE LOWER($${paramCount}))`;
			parameters.push("%" + req.query.id + "%");
			paramCount++;
		}

		// This loops through the criteria array thats hard coded
		// at the top of the file and basically runs the previous
		// events but with a larger group (with small changes).
		for (let parse of criteria) {

			// Checks that the query exists.
			if (req.query[parse]) {
				if (!parameters[0]) {
					whereQuery += `\nWHERE `;
				} else {
					whereQuery += `\nAND `;
				}

				// Some queries have different table names to the
				// name of the query. This fixes that issue by manually
				// setting those instead of automating it.
				if (parse === "ages_served") {
					whereQuery += `LOWER(age_groups_served.title) LIKE LOWER($${paramCount})`;
				} else if (parse === "insurance") {
					whereQuery += `LOWER(insurance_type.title) LIKE LOWER($${paramCount})`;
				} else if (parse === "supervision_status") {
					// This one isnt a table name change but is instead on the member table
					// The search is simple enough however there was no reason to give
					// it its own section above.
					whereQuery += `LOWER(m.supervision_status) LIKE LOWER($${paramCount})`;
				} else {
					// If it doesnt need a special table name it automatically sets
					// the name to be the same as the query name.
					whereQuery += `LOWER(${parse}.title) LIKE LOWER($${paramCount})`;
				}

				parameters.push("%" + req.query[parse] + "%");
				paramCount++;
			}
		}

		// Telehealth is boolean either true or false.
		// This both checks if its there AND if its listed as true
		// because an undefined variable and a variable that is false
		// both will not pass an 'if' like this.
		if (req.query.telehealth) {
			if (!parameters[0]) {
				whereQuery += `\nWHERE `;
			} else {
				whereQuery += `\nAND `;
			}

			// Since it is true this is all thats needed.
			whereQuery += `m.telehealth = true`;

			// There is no need to edit parameters for this one
		}

		// This stitches the final query together
		let query = startQuery + whereQuery + endQuery;

		// Sends the query to the database
		const members = await connection.query(query, parameters);

		// Returns the search results to the page
		res.send(members.rows);
	} catch (error) {
		console.log(`Error Selecting members advanced router`, error)
		res.sendStatus(500);
	} finally {
		connection.release();
	}
});

module.exports = router;