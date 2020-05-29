const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

function parseSelectData(member, result, result_name, special_name) {
    // Creates empty array to be pushed to later
    member[result_name] = [];
    for (let item of result) {
        if (item.member_id === member.id) {
            if (special_name){
                member[result_name].push({ [result_name]: item[result_name], type: item[special_name] })
            } else {
                member[result_name].push(item[result_name])
            }

        }
    }
}

/**
 * GET search route
 */
router.get('/', async (req, res) => {
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN;');
        let query = `SELECT m.*, 
                        CASE WHEN count(languages) = 0 THEN ARRAY[]::json[] ELSE array_agg(languages.languages) END AS languages,
                        CASE WHEN count(addresses) = 0 THEN ARRAY[]::json[] ELSE array_agg(addresses.addresses) END AS addresses,
                        CASE WHEN count(ages_served) = 0 THEN ARRAY[]::json[] ELSE array_agg(ages_served.ages_served) END AS ages_served,
                        CASE WHEN count(client_focus) = 0 THEN ARRAY[]::json[] ELSE array_agg(client_focus.client_focus) END AS client_focus,
                        CASE WHEN count(emails) = 0 THEN ARRAY[]::json[] ELSE array_agg(emails.emails) END AS emails,
                        CASE WHEN count(insurance) = 0 THEN ARRAY[]::json[] ELSE array_agg(insurance.insurance) END AS insurance,
                        CASE WHEN count(island) = 0 THEN ARRAY[]::json[] ELSE array_agg(island.island) END AS island,
                        CASE WHEN count(license) = 0 THEN ARRAY[]::json[] ELSE array_agg(license.license) END AS license,
                        CASE WHEN count(phone_numbers) = 0 THEN ARRAY[]::json[] ELSE array_agg(phone_numbers.phone_numbers) END AS phone_numbers,
                        CASE WHEN count(session_format) = 0 THEN ARRAY[]::json[] ELSE array_agg(session_format.session_format) END AS session_format,
                        CASE WHEN count(specialty) = 0 THEN ARRAY[]::json[] ELSE array_agg(specialty.specialty) END AS specialty,
                        CASE WHEN count(treatment_preferences) = 0 THEN ARRAY[]::json[] ELSE array_agg(treatment_preferences.treatment_preferences) END AS treatment_preferences
                        FROM members m
                        
                        LEFT OUTER JOIN
                        (
                            SELECT languages_pivot.member_id, json_build_object('language', languages.title) as languages
                            FROM languages_pivot
                            JOIN languages ON languages_pivot.language_id = languages.language_id
                        ) languages
                            ON m.id = languages.member_id
                            
                        LEFT OUTER JOIN
                        (
                            SELECT address_table.member_id, json_build_object('type', address_type.title, 'address', address_table.address) as addresses
                            FROM address_table
                            JOIN address_type ON address_table.address_type_id = address_type.address_type_id
                        ) addresses
                            ON m.id = addresses.member_id
                        
                        LEFT OUTER JOIN
                        (
                            SELECT age_groups_served_pivot.member_id, json_build_object('age_group', age_groups_served.title) as ages_served
                            FROM age_groups_served_pivot
                            JOIN age_groups_served ON age_groups_served.age_groups_served_id = age_groups_served_pivot.age_groups_served_id
                        ) ages_served
                            ON m.id = ages_served.member_id
                        
                        LEFT OUTER JOIN
                        (
                            SELECT client_focus_pivot.member_id, json_build_object('focus', client_focus.title) as client_focus
                            FROM client_focus_pivot
                            JOIN client_focus ON client_focus.client_focus_id = client_focus_pivot.client_focus_id
                        ) client_focus
                            ON m.id = client_focus.member_id
                        
                        LEFT OUTER JOIN
                        (
                            SELECT email_table.member_id, json_build_object('email', email_table.email, 'type', email_type.title) as emails
                            FROM email_table
                            JOIN email_type ON email_type.email_type_id = email_table.email_type_id
                        ) emails
                            ON m.id = emails.member_id
                            
                        LEFT OUTER JOIN
                        (
                            SELECT insurance_pivot.member_id, json_build_object( 'insurance', insurance_type.title ) as insurance
                            FROM insurance_pivot
                            JOIN insurance_type ON insurance_type.insurance_type_id = insurance_pivot.insurance_type_id
                        ) insurance
                            ON m.id = insurance.member_id
                        
                        LEFT OUTER JOIN
                        (
                            SELECT island_pivot.member_id, json_build_object( 'island', island.title ) as island
                            FROM island_pivot
                            JOIN island ON island.island_id = island_pivot.island_id
                        ) island
                            ON m.id = island.member_id
                            
                        LEFT OUTER JOIN
                        (
                            SELECT license_type_pivot.member_id, json_build_object( 'license', license_type.title ) as license
                            FROM license_type_pivot
                            JOIN license_type ON license_type.license_type_id = license_type_pivot.license_type_id
                        ) license
                            ON m.id = license.member_id
                            
                        LEFT OUTER JOIN
                        (
                            SELECT phone_table.member_id, json_build_object( 'number', phone_table.number, 'type', phone_type.title) as phone_numbers
                            FROM phone_table
                            JOIN phone_type ON phone_type.phone_type_id = phone_table.phone_type_id
                        ) phone_numbers
                            ON m.id = phone_numbers.member_id
                        
                        LEFT OUTER JOIN
                        (
                            SELECT session_format_pivot.member_id, json_build_object( 'session_format', session_format.title ) as session_format
                            FROM session_format_pivot
                            JOIN session_format ON session_format_pivot.session_format_id = session_format.session_format_id
                        ) session_format
                            ON m.id = session_format.member_id
                        
                        LEFT OUTER JOIN
                        (
                            SELECT specialty_pivot.member_id, json_build_object( 'specialty', specialty.title ) as specialty
                            FROM specialty_pivot
                            JOIN specialty ON specialty.specialty_id = specialty_pivot.specialty_id
                        ) specialty
                            ON m.id = specialty.member_id

                        LEFT OUTER JOIN
                        (
                            SELECT treatment_preferences_pivot.member_id, json_build_object( 'treatment', treatment_preferences.title ) as treatment_preferences
                            FROM treatment_preferences_pivot
                            JOIN treatment_preferences ON treatment_preferences.treatment_preferences_id = treatment_preferences_pivot.treatment_preferences_id
                        ) treatment_preferences
                            ON m.id = treatment_preferences.member_id
                            
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