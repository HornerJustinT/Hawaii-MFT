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

router.post('/', async (req, res) => {
    //define the queries
    const member = await pool.connect();
    console.log('here is req.user.id', req.user.id);
    console.log('user',req.body);

    // if(req.body.telehealth==''){
    //     req.body.telehealth = true;
    // }

    // console.log(req.body.telehealth)

    try {
      //consolidated all the push request using async await
      //it makes a post request for each table with the set data after each has terminated
    
        await member.query('BEGIN')

      const insertMember = await member.query(
        `INSERT INTO "members" 
        ("id", "first_name", "last_name", "prefix", "age", "statement", "student", "enabled")
    VALUES($1,$2, $3, $4, $5, $6, $7, $8);`,
        [
          req.user.id,
          req.body.first_name,
          req.body.last_name,
          req.body.prefix,
          req.body.age,
          req.body.statement,
          req.body.student,
          req.body.enabled,
        ]
      );
        
        if (req.body.language_id[0]) {
            for (let language of req.body.language_id) {
                await member.query(`INSERT INTO "languages_pivot"
                ("language_id", "member_id") VALUES ($1,$2);`, [language, req.user.id]);
            }
        } else {
            await member.query(`INSERT INTO "languages_pivot"
            ("language_id", "member_id") VALUES ($1,$2);`, [11, req.user.id]);
        }

        if (req.body.island_id) {
            await member.query(`INSERT INTO "island_pivot"
            ("island_id", "member_id") VALUES ($1,$2)`, [req.body.island_id, req.user.id]);
        }else {
            await member.query(`INSERT INTO "island_pivot"
            ("island_id", "member_id") VALUES ($1,$2)`, [4, req.user.id]);
        }

        if (req.body.email) {
            await member.query(`INSERT INTO "email_table" 
            ("business", "member_id", "email") VALUES ($1,$2,$3)`, [true, req.user.id,req.body.email]);
        } 
        else {
            await member.query(`INSERT INTO "email_table" 
            ("business", "member_id", "email") VALUES ($1,$2,$3)`, [true, req.user.id,'None specified']);
        }

        if (req.body.personal_email) {
            await member.query(`INSERT INTO "email_table" 
            ("business", "member_id", "email") VALUES ($1,$2,$3)`, [false, req.user.id,req.body.personal_email]);
        }

        if (req.body.business_number){
            await member.query(`INSERT INTO "phone_table"
            ("business", "member_id","number") VALUES ($1,$2,$3)`, [true, req.user.id,req.body.business_number]);
        } 
        else {
            await member.query(`INSERT INTO "phone_table"
            ("business", "member_id","number") VALUES ($1,$2,$3)`, [true, req.user.id,'None specified']);
        }

        if (req.body.business_number) {
            await member.query(`INSERT INTO "phone_table"
            ("business", "member_id","number") VALUES ($1,$2,$3)`, [true, req.user.id,req.body.business_number]);
        }

        if (req.body.personal_number) {
            await member.query(`INSERT INTO "phone_table"
            ("business", "member_id","number") VALUES ($1,$2,$3)`, [false, req.user.id, req.body.personal_number]);
        }

        if (req.body.address_office) {
            await member.query(`INSERT INTO "address_table"
            ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_office, true, req.user.id]);
        } 
        else {
            await member.query(`INSERT INTO "address_table"
            ("address", "business", "member_id") VALUES ($1,$2,$3);`, ['None specified', true, req.user.id]);
        }

        if (req.body.address_home) {
            await member.query(`INSERT INTO "address_table"
            ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_home, false, req.user.id]);
        }

        if (req.body.address_mailing) {
            await member.query(`INSERT INTO "address_table"
            ("address", "business", "member_id") VALUES ($1,$2,$3);`, [req.body.address_mailing, false, req.user.id]);
        }

        if (req.body.insurance_type_id) {
            for (let insurance of req.body.insurance_type_id) {
                await member.query(`INSERT INTO "insurance_pivot"
                ("insurance_type_id", "member_id") VALUES ($1,$2);`, [insurance, req.user.id]);
            }
        } 
        else {
            await member.query(`INSERT INTO "insurance_pivot"
            ("insurance_type_id", "member_id") VALUES ($1,$2);`, [12, req.user.id]);
        }

        if (req.body.age_groups_served_id) {
            for (let age_group of req.body.age_groups_served_id) {
                await member.query(`INSERT INTO "age_groups_served_pivot"
                ("age_groups_served_id", "member_id") VALUES ($1,$2);`, [age_group, req.user.id]);
            }
        } 
        else {
            await member.query(`INSERT INTO "age_groups_served_pivot"
                ("age_groups_served_id", "member_id") VALUES ($1,$2);`, [1, req.user.id]);
        }

        if (req.body.client_focus_id) {
            for (let client of req.body.client_focus_id) {
                await member.query(`INSERT INTO "client_focus_pivot"
                ("client_focus_id", "member_id") VALUES ($1,$2);`, [client, req.user.id]);
            }
        } 
        else {
            await member.query(`INSERT INTO "client_focus_pivot"
                ("client_focus_id", "member_id") VALUES ($1,$2);`, [1, req.user.id]);
        }

        if (req.body.treatment_preferences_id) {
            for (let treatment of req.body.treatment_preferences_id){
                await member.query(`INSERT INTO "treatment_preferences_pivot"
                ("treatment_preferences_id","member_id") VALUES ($1,$2);`, [treatment, req.user.id]);
            }
        } 
        else {
            await member.query(`INSERT INTO "treatment_preferences_pivot"
                ("treatment_preferences_id", "member_id") VALUES ($1,$2);`, [4, req.user.id]);
        }

        if (req.body.specialty_id) {
            for (let specialty of req.body.specialty_id){
                await member.query(`INSERT INTO "specialty_pivot"
                ("specialty_id", "member_id") VALUES ($1,$2);`, [specialty, req.user.id]);
            }
        } 
        else {
            await member.query(`INSERT INTO "specialty_pivot"
                ("specialty_id", "member_id") VALUES ($1,$2);`, [65, req.user.id]);
        }

        if (req.body.session_format_id) {
            for (let session of req.body.session_format_id) {
                await member.query(`INSERT INTO "session_format_pivot"
                ("session_format_id", "member_id") VALUES ($1,$2);`, [session, req.user.id]);
            }
        } 
        else {
            await member.query(`INSERT INTO "session_format_pivot"
            ("session_format_id", "member_id") VALUES ($1,$2);`, [1, req.user.id]);
        }


        await member.query('COMMIT')
        res.sendStatus(201);
    }catch(error) {
        await member.query('ROLLBACK')
        console.log('Error in sending members info from createprofile', error);
        res.sendStatus(500);
    } finally {
        member.release()
    }
})



module.exports = router;

