const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

function parseSelectData(member, result, result_name, special_name) {
    // Creates .address array to be pushed to later
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
 * GET route template
 */
router.get('/', async (req, res) => {
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN;');
        let query = `SELECT * FROM members;`;
        const members = await connection.query(query);
        console.log(members.rows)

        query = `SELECT address_table.member_id,address_table.address, address_type.title AS address_type FROM address_type
            JOIN address_table ON address_type.address_type_id=address_table.address_type_id;`
        const address = await connection.query(query)

        query = `SELECT age_groups_served_pivot.member_id, age_groups_served.title AS age_groups_served FROM age_groups_served
            JOIN age_groups_served_pivot ON age_groups_served.age_groups_served_id=age_groups_served_pivot.age_groups_served_id;`
        const age_groups_served = await connection.query(query)

        query = `SELECT client_focus_pivot.member_id, client_focus.title AS client_focus FROM client_focus
            JOIN client_focus_pivot ON client_focus.client_focus_id=client_focus_pivot.client_focus_id;;`
        const client_focus = await connection.query(query)
        
        query = `SELECT email_table.member_id,email_table.email, email_type.title AS email_type FROM email_type
            JOIN email_table ON email_table.email_type_id=email_type.email_type_id;`
        const email = await connection.query(query)

        query = `SELECT insurance_pivot.member_id, insurance_type.title AS insurance_type FROM insurance_type
            JOIN insurance_pivot ON insurance_pivot.insurance_type_id=insurance_type.insurance_type_id;`
        const insurance_type = await connection.query(query)

        query = `SELECT island_pivot.member_id, island.title AS island FROM island
        JOIN island_pivot ON island_pivot.island_id = island.island_id;`
        const island = await connection.query(query)

        query = `SELECT member_id, title AS languages FROM languages_pivot
        JOIN languages ON languages.language_id = languages_pivot.language_id;`
        const languages = await connection.query(query)
        
        query = `SELECT member_id, number, title AS number_type FROM phone_table
            JOIN phone_type ON phone_table.phone_type_id = phone_type.phone_type_id;`   
        const phone_numbers = await connection.query(query)

        query = `SELECT member_id, title AS specialty FROM specialty_pivot
            JOIN specialty ON specialty.specialty_id = specialty_pivot.specialty_id;`
        const specialty = await connection.query(query)
        
        query = `SELECT member_id, title AS treatment_preferences FROM treatment_preferences_pivot
            JOIN treatment_preferences ON treatment_preferences_pivot.treatment_preferences_id = treatment_preferences.treatment_preferences_id;`
        const treatment_preferences = await connection.query(query)

        for (let member of members.rows) {
            parseSelectData(member, address.rows, 'address', 'address_type');
            parseSelectData(member, age_groups_served.rows, 'age_groups_served');
            parseSelectData(member, client_focus.rows, 'client_focus');
            parseSelectData(member, email.rows, 'email', 'email_type');
            parseSelectData(member, insurance_type.rows, 'insurance_type');
            parseSelectData(member, island.rows, 'island');
            parseSelectData(member, languages.rows, 'languages');
            parseSelectData(member, phone_numbers.rows, 'number', 'number_type');
            parseSelectData(member, specialty.rows, 'specialty');
            parseSelectData(member, treatment_preferences.rows, 'treatment_preferences');
        }

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