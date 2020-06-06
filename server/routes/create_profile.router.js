const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/languages', (req, res) => {
  
    const queryText = `SELECT * FROM "languages";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting languages', error);
                res.sendStatus(500);
            });
   
});

router.get('/islands', (req, res) => {
  
    const queryText = `SELECT * FROM "island";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting islands', error);
                res.sendStatus(500);
            });
   
});

router.get('/specialty', (req, res) => {
  
    const queryText = `SELECT * FROM "specialty";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting specialty', error);
                res.sendStatus(500);
            });
   
});

router.get('/insurance', (req, res) => {
  
    const queryText = `SELECT * FROM "insurance_type";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting insurance taken', error);
                res.sendStatus(500);
            });
   
});

router.get('/license', (req, res) => {
  
    const queryText = `SELECT * FROM "license_type";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting license type', error);
                res.sendStatus(500);
            });
   
});

router.get('/treatment', (req, res) => {
  
    const queryText = `SELECT * FROM "treatment_preferences";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting treatment approaches', error);
                res.sendStatus(500);
            });
   
});

router.get('/demographics', (req, res) => {
  
    const queryText = `SELECT * FROM "client_focus";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting demographics', error);
                res.sendStatus(500);
            });
   
});

router.get('/age', (req, res) => {
  
    const queryText = `SELECT * FROM "age_groups_served";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting age groups served', error);
                res.sendStatus(500);
            });
   
});

router.get('/session', (req, res) => {
  
    const queryText = `SELECT * FROM "session_format";`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in getting session format', error);
                res.sendStatus(500);
            });
   
});


/**
// Handles POST request with new member data
 */

router.post('/', rejectUnauthenticated, async (req, res) => {
    //define the queries
    console.log('this what is in req.body', req.body)
    const member = await pool.connect();
    try {
      
        await member.query('BEGIN')
      const insertMember = await  member.query(`INSERT INTO "members" 
        ("id","zip_code","first_name", "last_name", "prefix", "age","license_state", "license_expiration", "hiamft_member_account_info", "supervision_status","fees", 
        "credentials", "telehealth", "statement", "website", "title", "city", "license_number", "license_type")
    VALUES($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14,$15,$16,$17,$18,$19);`, [req.user.id,req.body.zip_code, req.body.first_name,  req.body.last_name, req.body.prefix, req.body.age, req.body.license_state, req.body.license_expiration, 
            req.body.hiamft_member_account_info, req.body.supervision_status,req.body.fees, req.body.credentials, req.body.telehealth, req.body.statement, req.body.website, req.body.title, req.body.city, req.body.license_number, req.body.license_type_id]);
        const insertLanguages = await member.query(`INSERT INTO "languages_pivot"
        ("language_id", "member_id") VALUES ($1,$2);`, [req.body.language_id,req.user.id]);
        const insertIsland = await member.query(`INSERT INTO "island_pivot"
        ("island_id", "member_id") VALUES ($1,$2)`, [req.body.island_id, req.user.id]);
        const insertEmail = await member.query(`INSERT INTO "email_table" 
        ("business", "member_id", "email") VALUES ($1,$2,$3)`, [true ,req.user.id,req.body.email]);
        const insertPersonalEmail = await member.query(`INSERT INTO "email_table" 
        ("business", "member_id", "email") VALUES ($1,$2,$3)`, [false,req.user.id,req.body.personal_email]);
        const insertBusinessNumber = await member.query(`INSERT INTO "phone_table"
        ("business", "member_id","number") VALUES ($1,$2,$3)`, [true,req.user.id,req.body.business_number]);
        const insertPersonalNumber = await member.query(`INSERT INTO "phone_table"
        ("business", "member_id","number") VALUES ($1,$2,$3)`, [true,req.user.id,req.body.personal_number]);
        const insertAddressOffice = await member.query(`INSERT INTO "address_table"
        ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_office,true,req.user.id]);
        const insertAddressHome = await member.query(`INSERT INTO "address_table"
        ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_home,false,req.user.id]);
        const insertAddressMailing = await member.query(`INSERT INTO "address_table"
        ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_mailing,false,req.user.id]);
        const insertInsuranceType = await member.query(`INSERT INTO "insurance_pivot"
        ("insurance_type_id", "member_id") VALUES ($1,$2);`, [req.body.insurance_type_id, req.user.id]);
        const insertAgeGroupServed = await member.query(`INSERT INTO "age_groups_served_pivot"
        ("age_groups_served_id", "member_id") VALUES ($1,$2);`, [req.body.age_groups_served_id, req.user.id]);
        const insertClientFocus = await member.query(`INSERT INTO "client_focus_pivot"
        ("client_focus_id", "member_id") VALUES ($1,$2);`, [req.body.client_focus_id, req.user.id]);
        const insertTreatmentApproach = await member.query(`INSERT INTO "treatment_preferences_pivot"
        ("treatment_preferences_id","member_id") VALUES ($1,$2);`, [req.body.treatment_preferences_id, req.user.id]);
        const insertSpecialization = await member.query(`INSERT INTO "specialty_pivot"
        ("specialty_id", "member_id") VALUES ($1,$2);`, [req.body.specialty_id, req.user.id]);
        const insertSessionFormat = await member.query(`INSERT INTO "session_format_pivot"
        ("session_format_id", "member_id") VALUES ($1,$2);`, [req.body.session_format_id, req.user.id]);
        
        await member.query('COMMIT')
        res.sendStatus(201);
    }catch(error) {
        await member.query('ROLLBACK')
        console.log('Error in sending members info from createprofile, contactinfo anf practiceinfo', error);
        res.sendStatus(500);
    } finally {
        member.release()
    }
})



module.exports = router;

