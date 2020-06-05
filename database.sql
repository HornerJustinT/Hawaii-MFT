-- builds original database frame
 CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "members" (
	"id" INT NOT NULL UNIQUE,
	"zip_code" INT,
	"first_name" VARCHAR(20) NOT NULL,
	"last_name" VARCHAR(20) NOT NULL,
	"prefix" VARCHAR(20),
	"age" INT,
	"license_state" VARCHAR(50),
	"license_expiration" VARCHAR(50),
	"hiamft_member_account_info" VARCHAR(20),
	"supervision_status" VARCHAR(255),
	"fees" VARCHAR(255),
    "credentials" TEXT,
    "telehealth" BOOLEAN,
    "statement" VARCHAR(255),
    "website" TEXT, 
    "title" TEXT,
    "city" TEXT,
    "license_number" TEXT,
    "license_type" INTEGER,
	FOREIGN KEY ("id") REFERENCES "user"("id")
);

CREATE TABLE "insurance_type" (
	"insurance_type_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "insurance_pivot"(
	"insurance_type_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("insurance_type_id") REFERENCES "insurance_type"("insurance_type_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));


CREATE TABLE "license_type" (
	"license_type_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "license_type_pivot"(
	"license_type_id" INT NOT NULL,
	"member_id" INT NOT NULL,
    "license_number" VARCHAR(255),
	FOREIGN KEY ("license_type_id") REFERENCES "license_type"("license_type_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));


CREATE TABLE "languages" (
	"language_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "languages_pivot"(
	"language_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("language_id") REFERENCES "languages"("language_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));


CREATE TABLE "age_groups_served" (
	"age_groups_served_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "age_groups_served_pivot"(
	"age_groups_served_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("age_groups_served_id") REFERENCES "age_groups_served"("age_groups_served_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));
	

CREATE TABLE "treatment_preferences" (
	"treatment_preferences_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "treatment_preferences_pivot"(
	"treatment_preferences_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("treatment_preferences_id") REFERENCES "treatment_preferences"("treatment_preferences_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));
	
	
CREATE TABLE "session_format" (
	"session_format_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "session_format_pivot"(
	"session_format_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("session_format_id") REFERENCES "session_format"("session_format_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));

CREATE TABLE "client_focus" (
	"client_focus_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "client_focus_pivot"(
	"client_focus_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("client_focus_id") REFERENCES "client_focus"("client_focus_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));


CREATE TABLE "phone_table"(
	"number" VARCHAR(20) NOT NULL,
	"member_id" INT NOT NULL,
	"business" BOOLEAN,
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));
	
	
CREATE TABLE "island" (
	"island_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "island_pivot"(
	"island_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("island_id") REFERENCES "island"("island_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));
	
	
CREATE TABLE "address_table"(
	"business" BOOLEAN NOT NULL,
	"address" VARCHAR(255) NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));


CREATE TABLE "specialty" (
	"specialty_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "specialty_pivot"(
	"specialty_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("specialty_id") REFERENCES "specialty"("specialty_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));

CREATE TABLE "email_table"(
	"business" BOOLEAN NOT NULL,
	"email" VARCHAR(255),
	"member_id" INT NOT NULL,
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));
-- Everything below is temporary data for our tables
INSERT INTO "languages" 
    ("title")
VALUES
    ('ASL'),
    ('Arabic'),
    ('Armenian'),
    ('Bosnian'),
    ('Cantonese'),
    ('Croatian'),
    ('Dutch'),
    ('Farsi'),
    ('Filipino'),
    ('French'),
    ('English'),
    ('German'),
    ('Greek'),
    ('Gujarati'),
    ('Hebrew'),
    ('Hindi'),
    ('Hungarian'),
    ('Italian'),
    ('Japanese'),
    ('Korean'),
    ('Mandarin'),
    ('Polish'),
    ('Portuguese'),
    ('Punjabi'),
    ('Romanian'),
    ('Russian'),
    ('Serbian'),
    ('Sinhalese'),
    ('Spanish'),
    ('Swedish'),
    ('Tagalog'),
    ('Turkish'),
    ('Ukrainian'),
    ('Urdu'),
    ('Vietnamese'),
    ('Yiddish');
    
INSERT INTO "insurance_type" 
    ("title")
VALUES
    ('Aetna'),
    ('AlohaCare'),
    ('Beacon'),
    ('Blue Cross'),
    ('Blue Shield'),
    ('BlueCross and BlueShield'),
    ('Cigna'),
    ('Hawaii Medical Assurance Association'),
    ('Hawaii Medical Services Association'),
    ('Humana'),
    ('Kaiser'),
    ('(Out-of-Network)'),
    ('Magellan'),
    ('Medicaid'),
    ('Medicare'),
    ('MHN'),
    ('Military OneSource'),
    ('MultiPlan'),
    ('Ohana Health Plan'),
    ('Optum'),
    ('TRICARE'),
    ('TriWest'),
    ('UnitedHealthcare'),
    ('University Health Alliance'),
    ('WellCare');
INSERT INTO "specialty" 
    ("title")
VALUES
    ('ADHD'),
    ('Addictions'),
    ('Adjustment Disorder'),
    ('Adoption Issues'),
    ('Adult Children of Alcoholics'),
    ('Aging'),
    ('Alcoholism'),
    ('Alzheimer’s Disease'),
    ('Anger Management'),
    ('Anxiety Disorders/Phobias'),
    ('Asperger’s Syndrome'),
    ('Autism'),
    ('Bipolar Disorder'),
    ('Body Dysmorphic Disorder'),
    ('Brain Injury'),
    ('Child Abuse'),
    ('Chronic Physical Illness'),
    ('Co-Dependency'),
    ('Cognitive Disorders'),
    ('Communication Disorders'),
    ('Conduct Disorder'),
    ('Crisis'),
    ('Depression'),
    ('Dissociative Disorders'),
    ('Divorce/Dissolution'),
    ('Domestic Violence'),
    ('Dually Diagnosed Individuals'),
    ('Eating Disorders'),
    ('Ethnic/Cultural Issues'),
    ('Family Conflict'),
    ('Gay/Lesbian Issues'),
    ('Gender Identity'),
    ('Grief/Loss'),
    ('HIV/AIDS Related Issues'),
    ('Hoarding'),
    ('Impaired Professionals'),
    ('Impulse Control Disorders'),
    ('Infertility Issues'),
    ('Infidelity'),
    ('Learning Disabilities'),
    ('Life Transitions'),
    ('Men’s Issues'),
    ('No Speciality (pre-licensed)'),
    ('OCD'),
    ('Oppositional Defiant Disorder'),
    ('PTSD'),
    ('Pain Management'),
    ('Personal Growth'),
    ('Personality Disorders'),
    ('Physical Disabilities'),
    ('Relationship Issues'),
    ('Schizophrenia'),
    ('Self-Esteem'),
    ('Sexual Abuse'),
    ('Sexual Dysfunction'),
    ('Sleep Disorders'),
    ('Smoking Cessation'),
    ('Somatoform Disorders'),
    ('Spirituality'),
    ('Stress Management'),
    ('Substance Abuse'),
    ('Terminal Illness / End-of-Life'),
    ('Tourette’s Disorder'),
    ('Women’s Issues');

INSERT INTO "treatment_preferences" 
    ("title")
VALUES
    ('Adlerian'),
    ('Any'),
    ('Art Therapy'),
    ('Behavioral'),
    ('Biofeedback/Neurofeedback'),
    ('Biopsychosocial'),
    ('Christian'),
    ('Cognitive/Cognitive Behavioral'),
    ('DBT (Dialectical Behavior Therapy)'),
    ('Dance/Movement Therapy'),
    ('Developmental'),
    ('EMDR'),
    ('Eclectic'),
    ('Emotionally Focused'),
    ('Existential/Humanistic'),
    ('Family Systems'),
    ('Feminist'),
    ('Gestalt'),
    ('Hypnotherapy'),
    ('Integrative'),
    ('Interpersonal'),
    ('Multicultural'),
    ('Music Therapy'),
    ('Narrative'),
    ('Neuropsychology'),
    ('Play Therapy'),
    ('Psychoeducational'),
    ('Solution-Focused Brief Therapy'),
    ('Somatic'),
    ('Acceptance and Commitment (ACT)'),
    ('Adlerian'),
    ('AEDP'),
    ('Applied Behavioral Analysis'),
    ('Art Therapy'),
    ('Attachment-based'),
    ('Biofeedback'),
    ('Brainspotting'),
    ('Christian Counseling'),
    ('Clinical Supervision and Licensed Supervisors - Coaching'),
    ('Cognitive Behavioral (CBT)'),
    ('Cognitive Processing (CPT)'),
    ('Compassion Focused'),
    ('Culturally Sensitive'),
    ('Dance/Movement Therapy'),
    ('Dialectical (DBT)'),
    ('Eclectic'),
    ('EMDR'),
    ('Emotionally Focused'),
    ('Existential'),
    ('Experiential Therapy'),
    ('Exposure Response Prevention'),
    ('Expressive Arts'),
    ('Family / Marital'),
    ('Family Systems'),
    ('Feminist'),
    ('Forensic Psychology'),
    ('Gestalt'),
    ('Gottman Method'),
    ('Humanistic'),
    ('Hypnotherapy'),
    ('Imago'),
    ('Integrative'),
    ('Internal Family Systems (IFS)'),
    ('Interpersonal'),
    ('Intervention'),
    ('Jungian'),
    ('Mindfulness-Based (MBCT)'),
    ('Motivational Interviewing'),
    ('Multicultural'),
    ('Music Therapy'),
    ('Narrative'),
    ('Neuro-Linguistic'),
    ('Neurofeedback'),
    ('Parent-Child Interaction (PCIT)'),
    ('Person-Centered'),
    ('Play Therapy'),
    ('Positive Psychology'),
    ('Prolonged Exposure Therapy'),
    ('Psychoanalytic'),
    ('Psychobiological Approach Couple Therapy'),
    ('Psychodynamic'),
    ('Psychological Testing and Evaluation'),
    ('Rational Emotive Behavior (REBT)'),
    ('Reality Therapy'),
    ('Relational'),
    ('Sandplay'),
    ('Schema Therapy'),
    ('Solution Focused Brief (SFBT)'),
    ('Somatic'),
    ('Strength-Based'),
    ('Structural Family Therapy'),
    ('Transpersonal'),
    ('Trauma Focused');

INSERT INTO "age_groups_served" 
    ("title")
VALUES
    ('Any'),
    ('Children'),
    ('Adolescents'),
    ('Adults'),
    ('Elders');
INSERT INTO "client_focus" 
    ("title")
VALUES
    ('Any'),
    ('African American'),
    ('Asian American'),
    ('Buddhist'),
    ('Christian'),
    ('Gay/Lesbian/Bisexual/Transgender'),
    ('Hindu'),
    ('Jewish'),
    ('Latino American'),
    ('Latter-day Saints/Mormon'),
    ('Middle Eastern'),
    ('Military/Veterans'),
    ('Muslim'),
    ('Native American'),
    ('Pacific Islander'),
    ('People with Disabilities'),
    ('Women/Feminist');
INSERT INTO "island"
	("island_id", "title")
VALUES
	(1,'Kauai'),
    (2,'Ohau'),
    (3,'Maui'),
    (4,'Hawaii Island'),
    (5,'Lanai'),
    (6,'Molokai');
INSERT INTO "license_type"
	("license_type_id", "title")
VALUES
    (1,'LMFT'),
    (2,'LMHC'),
    (3,'LP'),
    (4,'LCSW'),
    (5,'LSW'),
    (6,'LPC'),
    (7,'LPCC'),
    (8,'Student'),
    (9,'Pre-Licensed(but no longer a student)');
INSERT INTO "session_format"
	("session_format_id", "title")
VALUES
	(1,'Any'),
    (2,'Individual'),
    (3,'Couples'),
    (4,'Family'),
    (5,'Group');

	
	
	
-- insert new user info
INSERT INTO "user"
	("id", "username", "password")
VALUES 
    (1, 'test','test'),
    (2, 'test','test'),
    (3, 'test','test');

INSERT INTO "public"."members"
    ("id", "zip_code", "first_name", "last_name", "prefix", "age", "license_state", "license_expiration", "supervision_status", "fees", "credentials", "telehealth", "statement", "website", "hiamft_member_account_info", "title", "city", "license_number", "license_type")
VALUES
    (1, 96701, 'John', 'Barosa', 'Mr.', 34, 'Hawaii', '2022', 'Supervisor', '65-80', 'MFT, PhD', true, 'I love all types of people and feel the world should be more connected even when we have to distance like we do now.', 'SocialYourDistance.com', 'Prominent user', 'Therapist', 'Honolulu', '8219293', 5),
    (2, 96804, 'Eldon', 'Barnett', 'Mr.', 50, 'Hawaii', '2024', 'None', '100', 'PhD, LMFT', false, 'I believe in a traditional form of therapy.', 'ClassicalTherapy.org', 'newer user', 'Mental Health Expert', 'Kihei', '09970054', 1),
    (3, 96734, 'Morgan', 'Cooper', 'Ms.', 42, 'Hawaii', '2021', 'MFT supervisor', '140', 'PhD, LP', false, 'I believe in a traditional form of therapy.', 'ClassicalTherapy.org', 'newer user', 'Psychiatrist', 'Hilo', '1028328', 3);

INSERT INTO "public"."address_table"
    ("business", "address", "member_id")
VALUES
    (TRUE, '920 Kaheka St Honolulu, Hawaii', 1),
    (TRUE, '2345 Ala Wai Blvd Honolulu, Hawaii', 2),
    (TRUE, '4002 Mahinahina St Lahaina, Hawaii', 3);

INSERT INTO "public"."age_groups_served_pivot"
    ("age_groups_served_id", "member_id")
VALUES(5, 1),(3, 1),(2, 1),
    (1, 2), 
    (5, 2), (2, 2);

INSERT INTO "public"."client_focus_pivot"
    ("client_focus_id", "member_id")
VALUES(4, 1), (17, 1), (11, 1),
    (1, 2), (13, 2),
    (11, 3), (2, 3), (14, 3); 

INSERT INTO "public"."email_table"
    ("business", "email", "member_id")
VALUES(TRUE, 'John.Barosa@yahoo.com', 1), 
    (TRUE, 'amiya1975@gmail.com', 2), 
    (TRUE, 'Morgan.Cooper@gmail.com', 3);

INSERT INTO "public"."insurance_pivot"
    ("insurance_type_id", "member_id")
VALUES(13, 1), (24, 1),
    (2, 2), (24, 2), (14, 2),
    (24, 3), (21, 3);

INSERT INTO "public"."island_pivot"
    ("island_id", "member_id")
VALUES(4, 1), (4, 2), (3, 3);

INSERT INTO "public"."languages_pivot"
    ("language_id", "member_id")
VALUES(11, 1), (1, 1),
(11, 2), (1, 2), (7, 2), (4, 2), 
(11, 3), (3, 3);

INSERT INTO "public"."phone_table"
    ("number", "member_id", "business")
VALUES('(573) 433-2395', 1, TRUE), ('(704) 857-6451', 1, FALSE),
('(573) 433-2395', 2, TRUE),
('(702) 876-3297', 3, TRUE);

INSERT INTO "public"."session_format_pivot"
    ("session_format_id", "member_id")
VALUES(4, 1), (5, 1),
(1, 2), (4, 3);

INSERT INTO "public"."specialty_pivot"
    ("specialty_id", "member_id")
VALUES(22, 1),
(22, 1),
(20, 2),
(2, 2),
(3, 2),
(7, 3);

INSERT INTO "public"."treatment_preferences_pivot"
    ("treatment_preferences_id", "member_id")
VALUES(17, 1), (1, 1), (1, 2), (10, 2), (8, 3);


-- sql queries for our gets
SELECT * FROM members;

SELECT address_table.member_id, address_type.title AS address_type FROM address_type
JOIN address_table ON address_type.address_type_id=address_table.address_type_id;

SELECT age_groups_served_pivot.member_id, age_groups_served.title AS age_groups_served FROM age_groups_served
JOIN age_groups_served_pivot ON age_groups_served.age_groups_served_id=age_groups_served_pivot.age_groups_served_id;

SELECT client_focus_pivot.member_id, client_focus.title AS client_focus FROM client_focus
JOIN client_focus_pivot ON client_focus.client_focus_id=client_focus_pivot.client_focus_id;

SELECT email_table.member_id,email_table.email, email_type.title AS email_type FROM email_type
JOIN email_table ON email_table.email_type_id=email_type.email_type_id;

SELECT insurance_pivot.member_id, insurance_type.title AS insurance_type FROM insurance_type
JOIN insurance_pivot ON insurance_pivot.insurance_type_id=insurance_type.insurance_type_id;

SELECT island_pivot.member_id, island.title AS island FROM island
JOIN island_pivot ON island_pivot.island_id = island.island_id;

SELECT member_id, title AS languages FROM languages_pivot
JOIN languages ON languages.language_id = languages_pivot.language_id;

SELECT member_id, number, title AS number_type FROM phone_table
JOIN phone_type ON phone_table.phone_type_id = phone_type.phone_type_id;

SELECT member_id, title AS session_format FROM session_format_pivot
JOIN session_format ON session_format_pivot.session_format_id = session_format.session_format_id;

SELECT member_id, title AS specialty FROM specialty_pivot
JOIN specialty ON specialty.specialty_id = specialty_pivot.specialty_id;

SELECT member_id, title AS treatment_preferences FROM treatment_preferences_pivot
JOIN treatment_preferences ON treatment_preferences_pivot.treatment_preferences_id = treatment_preferences.treatment_preferences_id;
