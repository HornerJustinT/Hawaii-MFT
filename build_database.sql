-- builds original database frame
 CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" boolean DEFAULT false
);
CREATE TABLE "registration" (
	"id" SERIAL PRIMARY KEY,
	"registration_key" bigint UNIQUE NOT NULL,
	"used" BOOLEAN
	);
CREATE TABLE "members" (
	"id" INT NOT NULL UNIQUE,
	"zip_code" INT,
	"zip_code_personal" INT,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"prefix" VARCHAR(20),
	"age" INT,
	"license_state" VARCHAR(50),
	"license_expiration" VARCHAR(50),
	"hiamft_member_account_info" VARCHAR(255),
	"supervision_status" VARCHAR(255),
	"fees" VARCHAR(255),
    "credentials" TEXT,
    "telehealth" BOOLEAN,
    "statement" VARCHAR(10000),
    "website" TEXT, 
    "title" TEXT,
    "city" TEXT,
    "city_personal" TEXT,
    "license_number" TEXT,
    "license_type" VARCHAR(255),
    "enabled" boolean DEFAULT true,
    "student" boolean DEFAULT false,
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
	"number" VARCHAR(255) NOT NULL,
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

CREATE TABLE password_reset (
    id BIGINT PRIMARY KEY,
    username text
);

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
    ('Women’s Issues'),
    ('N/A');

INSERT INTO "treatment_preferences" 
    ("title")
VALUES    
    ('Acceptance and Commitment (ACT)'),
    ('AEDP'),
    ('Adlerian'),
    ('Any'),
    ('Applied Behavioral Analysis'),
    ('Art Therapy'),
    ('Attachment-based'),
    ('Behavioral'),
    ('Biofeedback/Neurofeedback'),
    ('Biopsychosocial'),
    ('Brainspotting'),
    ('Christian Counseling'),
    ('Clinical Supervision and Licensed Supervisors - Coaching'),
    ('Cognitive-Behavioral Therapy (CBT)'),
    ('Cognitive Processing (CPT)'),
    ('Compassion Focused'),
    ('Culturally Sensitive'),
    ('Dance/Movement Therapy'),
    ('Developmental'),
    ('Dialectical Behavior Therapy (DBT)'),
    ('Eclectic'),
    ('EMDR'),
    ('Emotionally Focused'),
    ('Existential'),
    ('Existential/Humanistic'),
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
    ('Neuropsychology'),
    ('Parent-Child Interaction (PCIT)'),
    ('Person-Centered'),
    ('Play Therapy'),
    ('Positive Psychology'),
    ('Prolonged Exposure Therapy'),
    ('Psychoanalytic'),
    ('Psychobiological Approach Couple Therapy'),
    ('Psychodynamic'),
    ('Psychoeducational'),
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
    (2,'Oahu'),
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
	("username", "password")
VALUES 
    ('admin','$2a$10$43nSyq9Y.vpLwwmwaJAhzeOj/PbcFvZLcKmEC4DM/8cmNeUpOHE4S');

INSERT INTO "public"."members"
    ("id", "zip_code", "first_name", "last_name", "license_state",  "statement")
VALUES

    (1, 96701, 'Admin', 'Admin','Hawaii',  'This is the admin account.');

UPDATE "public"."user" SET "admin"=TRUE WHERE "id"=1;