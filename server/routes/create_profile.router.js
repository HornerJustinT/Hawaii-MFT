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
//will get the islands option data from the database
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
//will get the specialty option data from the database
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
//will get the insurance option data from the database
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
//will get the license type option data from the database
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
//will get the treatment option data from the database
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
//will get the client groups option data from the database
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
//will get the age groups
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

//will get the session format option data from the database
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
    const member = await pool.connect();
    console.log(req.body)
    if(req.body.telehealth==''){
        req.body.telehealth = true;
    }
    console.log(req.body.telehealth)
    try {
      //consolidated all the push request using async await
      //it makes a post request for each table with the set data aftet each has terminated
    
        await member.query('BEGIN')
      const insertMember = await  member.query(
          
        `INSERT INTO "members" 
        ("id","zip_code","first_name", "last_name", "prefix", "age","license_state", "license_expiration", "hiamft_member_account_info", "supervision_status","fees", 
        "credentials", "telehealth", "statement", "website", "title", "city", "license_number", "license_type")
    VALUES($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14,$15,$16,$17,$18,$19);`, [req.body.user,req.body.zip_code, req.body.first_name,  req.body.last_name, req.body.prefix, req.body.age, req.body.license_state, req.body.license_expiration, 
            req.body.hiamft_member_account_info, req.body.supervision_status,req.body.fees, req.body.credentials, req.body.telehealth, req.body.statement, req.body.website, req.body.title, req.body.city, req.body.license_number, req.body.license_type]);
        
        if (req.body.language_id[0]) {
            for (let language of req.body.language_id) {
                await member.query(`INSERT INTO "languages_pivot"
                ("language_id", "member_id") VALUES ($1,$2);`, [language,req.body.user]);
            }
        } else {
            await member.query(`INSERT INTO "languages_pivot"
            ("language_id", "member_id") VALUES ($1,$2);`, [11 ,req.body.user]);
        }

        if (req.body.island_id) {
            await member.query(`INSERT INTO "island_pivot"
            ("island_id", "member_id") VALUES ($1,$2)`, [req.body.island_id, req.body.user]);
        } else {
            await member.query(`INSERT INTO "island_pivot"
            ("island_id", "member_id") VALUES ($1,$2)`, [4, req.body.user]);
        }

        if (req.body.email) {
            await member.query(`INSERT INTO "email_table" 
            ("business", "member_id", "email") VALUES ($1,$2,$3)`, [true ,req.body.user,req.body.email]);
        } else {
            await member.query(`INSERT INTO "email_table" 
            ("business", "member_id", "email") VALUES ($1,$2,$3)`, [true ,req.body.user,'N/A']);
        }

        if (req.body.personal_email) {
            await member.query(`INSERT INTO "email_table" 
            ("business", "member_id", "email") VALUES ($1,$2,$3)`, [false,req.body.user,req.body.personal_email]);
        }

        if (req.body.business_number){
            await member.query(`INSERT INTO "phone_table"
            ("business", "member_id","number") VALUES ($1,$2,$3)`, [true,req.body.user,req.body.business_number]);
        } else {
            await member.query(`INSERT INTO "phone_table"
            ("business", "member_id","number") VALUES ($1,$2,$3)`, [true,req.body.user,'N/A']);
        }

        if (req.body.personal_number) {
            await member.query(`INSERT INTO "phone_table"
            ("business", "member_id","number") VALUES ($1,$2,$3)`, [true,req.body.user,req.body.personal_number]);
        }

        if (req.body.address_office) {
            await member.query(`INSERT INTO "address_table"
            ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_office,true,req.body.user]);
        } else {
            await member.query(`INSERT INTO "address_table"
            ("address", "business", "member_id") VALUES ($1,$2,$3);`, ['N/A',true,req.body.user]);
        }

        if (req.body.address_home) {
            await member.query(`INSERT INTO "address_table"
            ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_home,false,req.body.user]);
        }

        if (req.body.address_mailing) {
            await member.query(`INSERT INTO "address_table"
            ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_mailing,false,req.body.user]);
        }

        if (req.body.insurance_type_id[0]) {
            for (let insurance of req.body.insurance_type_id) {
                await member.query(`INSERT INTO "insurance_pivot"
                ("insurance_type_id", "member_id") VALUES ($1,$2);`, [insurance,req.body.user]);
            }
        } else {
            await member.query(`INSERT INTO "insurance_pivot"
            ("insurance_type_id", "member_id") VALUES ($1,$2);`, [26, req.body.user]);
        }

        if (req.body.age_groups_served_id[0]) {
            for (let age_group of req.body.age_groups_served_id) {
                await member.query(`INSERT INTO "age_groups_served_pivot"
                ("age_groups_served_id", "member_id") VALUES ($1,$2);`, [age_group, req.body.user]);
            }
        } else {
            await member.query(`INSERT INTO "age_groups_served_pivot"
                ("age_groups_served_id", "member_id") VALUES ($1,$2);`, [1, req.body.user]);
        }

        if (req.body.client_focus_id[0]) {
            for (let client of req.body.client_focus_id) {
                await member.query(`INSERT INTO "client_focus_pivot"
                ("client_focus_id", "member_id") VALUES ($1,$2);`, [client, req.body.user]);
            }
        } else {
            await member.query(`INSERT INTO "client_focus_pivot"
                ("client_focus_id", "member_id") VALUES ($1,$2);`, [1, req.body.user]);
        }

        if (req.body.treatment_preferences_id[0]) {
            for (let treatment of req.body.treatment_preferences_id){
                await member.query(`INSERT INTO "treatment_preferences_pivot"
                ("treatment_preferences_id","member_id") VALUES ($1,$2);`, [treatment, req.body.user]);
            }
        } else {
            await member.query(`INSERT INTO "treatment_preferences_pivot"
                ("treatment_preferences_id", "member_id") VALUES ($1,$2);`, [2, req.body.user]);
        }

        if (req.body.specialty_id[0]) {
            for (let specialty of req.body.specialty_id){
                await member.query(`INSERT INTO "specialty_pivot"
                ("specialty_id", "member_id") VALUES ($1,$2);`, [specialty, req.body.user]);
            }
        } else {
            await member.query(`INSERT INTO "specialty_pivot"
                ("specialty_id", "member_id") VALUES ($1,$2);`, [65, req.body.user]);
        }

        if (req.body.session_format_id[0]) {
            for (let session of req.body.session_format_id) {
                await member.query(`INSERT INTO "session_format_pivot"
                ("session_format_id", "member_id") VALUES ($1,$2);`, [session, req.body.user]);
            }
        } else {
            await member.query(`INSERT INTO "session_format_pivot"
            ("session_format_id", "member_id") VALUES ($1,$2);`, [1, req.body.user]);
        }


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

