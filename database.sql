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

--INSERTS FOR SAMPLE DATA

--SUBJECT 4

INSERT INTO "user"
	("id", "username", "password")
VALUES 
    (4, 'test4','test4');
INSERT INTO "public"."members"
    ("id", "zip_code", "first_name", "last_name", "prefix", "age", "license_state", "license_expiration", "supervision_status", "fees", "credentials", "telehealth", "statement", "website", "hiamft_member_account_info", "title", "city", "license_number", "license_type")
VALUES(4, 96701, 'Romero', 'Sancho', 'Mr.', 26, 'Hawaii', '2025', 'MFT Supervisor', '200-250', 'Psychiatrist, D.O, MS, LCPC, LAC', TRUE, 'I specialize in addiction psychiatry.', 'romerosanchocounseling.com', 'New member', 'Psychiatrist', 'Aiea', '805493', 1);
INSERT INTO "public"."address_table"
    ("business", "address", "member_id")
VALUES(TRUE, '3468 Pearl Ave, Aiea, HI 96701', 4);
INSERT INTO "public"."age_groups_served_pivot"
    ("age_groups_served_id", "member_id")
VALUES(1, 4),(4, 4);
INSERT INTO "public"."client_focus_pivot"
    ("client_focus_id", "member_id")
VALUES(1, 4), (5, 4), (7, 4), (10, 4), (17, 4); 
INSERT INTO "public"."email_table"
    ("business", "email", "member_id")
VALUES(TRUE, 'romero@romerosanchocounseling.com', 4);
INSERT INTO "public"."insurance_pivot"
    ("insurance_type_id", "member_id")
VALUES(5, 4), (8, 4), (11, 4), (9, 4), (19, 4);
INSERT INTO "public"."island_pivot"
    ("island_id", "member_id")
VALUES(3, 4);
INSERT INTO "public"."languages_pivot"
    ("language_id", "member_id")
VALUES(5, 4), (2, 4);
INSERT INTO "public"."phone_table"
    ("number", "member_id", "business")
VALUES('(808) 456-0032', 4, TRUE), ('(808) 654-2001', 4, FALSE);
INSERT INTO "public"."session_format_pivot"
    ("session_format_id", "member_id")
VALUES(1, 4), (2, 4);
INSERT INTO "public"."specialty_pivot"
    ("specialty_id", "member_id")
VALUES(2, 4), (19, 4), (26, 4), (30, 4), (31, 4);
INSERT INTO "public"."treatment_preferences_pivot"
    ("treatment_preferences_id", "member_id")
VALUES (5, 4), (23, 4), (45, 4), (33, 4);

--SUBJECT 5

INSERT INTO "user"
	("id", "username", "password")
VALUES 
    (5, 'test5','test5');
INSERT INTO "public"."members"
    ("id", "zip_code", "first_name", "last_name", "prefix", "age", "license_state", "license_expiration", "supervision_status", "fees", "credentials", "telehealth", "statement", "website", "hiamft_member_account_info", "title", "city", "license_number", "license_type")
VALUES(5, 96704, 'Sandra', 'Smith', 'Mrs.', 35, 'Hawaii', '2023', 'MFT Supervisor', '150-225', 'Psychologists, psyD, MSW, LCSW, LPCC', TRUE, 'I specialize in mental disorders and adoption issues with children.', 'sandrasmithcounseling.com', 'New member', 'Psychologist', 'Captain Cook', '34556', 1);
INSERT INTO "public"."address_table"
    ("business", "address", "member_id")
VALUES(TRUE, '562 4th Ave, Captain Cook, HI 96704', 5);
INSERT INTO "public"."age_groups_served_pivot"
    ("age_groups_served_id", "member_id")
VALUES(1, 5),(3, 5);
INSERT INTO "public"."client_focus_pivot"
    ("client_focus_id", "member_id")
VALUES(1, 5), (3, 5), (9, 5), (11, 5), (15, 5); 
INSERT INTO "public"."email_table"
    ("business", "email", "member_id")
VALUES(TRUE, 'sandra@sandrasmithcounseling.com', 5);
INSERT INTO "public"."insurance_pivot"
    ("insurance_type_id", "member_id")
VALUES(6, 5), (11, 5), (13, 5), (17, 5), (22, 5);
INSERT INTO "public"."island_pivot"
    ("island_id", "member_id")
VALUES(4, 5);
INSERT INTO "public"."languages_pivot"
    ("language_id", "member_id")
VALUES(3, 5), (7, 5);
INSERT INTO "public"."phone_table"
    ("number", "member_id", "business")
VALUES('(808) 478-2032', 5, TRUE), ('(808) 896-2301', 5, FALSE);
INSERT INTO "public"."session_format_pivot"
    ("session_format_id", "member_id")
VALUES(1, 5), (4, 5);
INSERT INTO "public"."specialty_pivot"
    ("specialty_id", "member_id")
VALUES(4, 5), (11, 5), (24, 5), (28, 5), (29, 5);
INSERT INTO "public"."treatment_preferences_pivot"
    ("treatment_preferences_id", "member_id")
VALUES (6, 5), (24, 5), (32, 5), (36, 5);

--SUBJECT 6

INSERT INTO "user"
	("id", "username", "password")
VALUES 
    (6, 'test6','test6');
INSERT INTO "public"."members"
    ("id", "zip_code", "first_name", "last_name", "prefix", "age", "license_state", "license_expiration", "supervision_status", "fees", "credentials", "telehealth", "statement", "website", "hiamft_member_account_info", "title", "city", "license_number", "license_type")
VALUES(6, 96708, 'David', 'White', 'Mr.', 47, 'Hawaii', '2026', 'Supervisor', '125-175', 'Social Worker, DSW, MSW, MVF-SW, LAPSW', TRUE, 'I specialize in Social Work with Military Members and Veterans.', 'davidwhitecounseling.com', 'New member', 'Social Worker', 'Haiku', '50303', 1);
INSERT INTO "public"."address_table"
    ("business", "address", "member_id")
VALUES(TRUE, '3550 4th Hwy, Haiku, HI 96708', 6);
INSERT INTO "public"."age_groups_served_pivot"
    ("age_groups_served_id", "member_id")
VALUES(1, 6),(4, 6);
INSERT INTO "public"."client_focus_pivot"
    ("client_focus_id", "member_id")
VALUES(1, 6), (5, 6), (10, 6), (12, 6), (16, 6); 
INSERT INTO "public"."email_table"
    ("business", "email", "member_id")
VALUES(TRUE, 'david@davidwhitecounseling.com', 6);
INSERT INTO "public"."insurance_pivot"
    ("insurance_type_id", "member_id")
VALUES(17, 6), (21, 6), (22, 6), (25, 6), (28, 6);
INSERT INTO "public"."island_pivot"
    ("island_id", "member_id")
VALUES(4, 6);
INSERT INTO "public"."languages_pivot"
    ("language_id", "member_id")
VALUES(4, 6), (6, 6);
INSERT INTO "public"."phone_table"
    ("number", "member_id", "business")
VALUES('(808) 892-2252', 6, TRUE), ('(808) 902-2341', 6, FALSE);
INSERT INTO "public"."session_format_pivot"
    ("session_format_id", "member_id")
VALUES(1, 6), (2, 6);
INSERT INTO "public"."specialty_pivot"
    ("specialty_id", "member_id")
VALUES(9, 6), (22, 6), (26, 6), (46, 6), (47, 6);
INSERT INTO "public"."treatment_preferences_pivot"
    ("treatment_preferences_id", "member_id")
VALUES (8, 6), (14, 6), (24, 6), (30, 6);

--SUBJECT 7
INSERT INTO "user"
	("id", "username", "password")
VALUES 
    (7, 'test7','test');
INSERT INTO "public"."members"
    ("id", "zip_code", "first_name", "last_name", "prefix", "age", "license_state", "license_expiration", "supervision_status", "fees", "credentials", "telehealth", "statement", "website", "hiamft_member_account_info", "title", "city", "license_number", "license_type")
VALUES(7, 96761, 'Tepairu', 'Miller', 'Ms.', 40, 'Hawaii', '2025', 'No supervision status', '100-150', 'Psychologist, PhD, LP, LAMFT', FALSE, 'In my practice I focus on getting to the roots of behaviors to best understand the path forward with my clients.', 'familytherapy.com', 'Long-time member', 'Dr.', 'Lahaina', '3857163', 1);
INSERT INTO "public"."address_table"
    ("business", "address", "member_id")
VALUES(TRUE, '1221 HI-30, Lahaina, HI 96761', 7);
INSERT INTO "public"."age_groups_served_pivot"
    ("age_groups_served_id", "member_id")
VALUES(1, 7),(4, 7);
INSERT INTO "public"."client_focus_pivot"
    ("client_focus_id", "member_id")
VALUES(6, 7), (16, 7), (17, 7); 
INSERT INTO "public"."email_table"
    ("business", "email", "member_id")
VALUES(TRUE, 'tepairu@familytherapy.com', 7);
INSERT INTO "public"."insurance_pivot"
    ("insurance_type_id", "member_id")
VALUES(7, 7), (3, 7), (25, 7), (12, 7), (15, 7);
INSERT INTO "public"."island_pivot"
    ("island_id", "member_id")
VALUES(3, 7);
INSERT INTO "public"."languages_pivot"
    ("language_id", "member_id")
VALUES(11, 7), (31, 7);
INSERT INTO "public"."phone_table"
    ("number", "member_id", "business")
VALUES('(808) 667-2265', 7, TRUE), ('(808) 667-9751', 7, FALSE);
INSERT INTO "public"."session_format_pivot"
    ("session_format_id", "member_id")
VALUES(1, 7), (4, 7);
INSERT INTO "public"."specialty_pivot"
    ("specialty_id", "member_id")
VALUES(20, 7), (4, 7), (28, 7), (34, 7), (45, 7);
INSERT INTO "public"."treatment_preferences_pivot"
    ("treatment_preferences_id", "member_id")
VALUES(10, 7), (3, 7), (14, 7);

--SUBJECT 8
INSERT INTO "user"
	("id", "username", "password")
VALUES 
    (8, 'test8','test');
INSERT INTO "public"."members"
    ("id", "zip_code", "first_name", "last_name", "prefix", "age", "license_state", "license_expiration", "supervision_status", "fees", "credentials", "telehealth", "statement", "website", "hiamft_member_account_info", "title", "city", "license_number", "license_type")
VALUES(8, 96740, 'Joseph', 'Nagasaka', 'Mr.', 54, 'Hawaii', '2021', 'Supervisor', '100-150', 'MSW, Clinical Social Worker, LAMFT', TRUE, 'My goal is to help my clients tap into the knowledge, power and peace we all hold within ourselves.', 'onepeacecounseling.com', 'New member', 'Therapist', 'Kailua-Kona', '7354659', 1);
INSERT INTO "public"."address_table"
    ("business", "address", "member_id")
VALUES(TRUE, '75-1015 Henry St, Kailua-Kona, HI 96740', 8);
INSERT INTO "public"."age_groups_served_pivot"
    ("age_groups_served_id", "member_id")
VALUES(4, 8),(2, 8), (1, 8);
INSERT INTO "public"."client_focus_pivot"
    ("client_focus_id", "member_id")
VALUES(1, 8), (2, 8), (3, 8), (6, 8); 
INSERT INTO "public"."email_table"
    ("business", "email", "member_id")
VALUES(TRUE, 'joseph@onecounseling.com', 8);
INSERT INTO "public"."insurance_pivot"
    ("insurance_type_id", "member_id")
VALUES(1, 8), (5, 8), (16, 8), (6, 8), (22, 8);
INSERT INTO "public"."island_pivot"
    ("island_id", "member_id")
VALUES(4, 8);
INSERT INTO "public"."languages_pivot"
    ("language_id", "member_id")
VALUES(11, 8), (29, 8);
INSERT INTO "public"."phone_table"
    ("number", "member_id", "business")
VALUES('(808) 334-4576', 8, TRUE), ('(808) 334-7253', 8, FALSE);
INSERT INTO "public"."session_format_pivot"
    ("session_format_id", "member_id")
VALUES(1, 8);
INSERT INTO "public"."specialty_pivot"
    ("specialty_id", "member_id")
VALUES(43, 8), (36, 8), (23, 8), (34, 8);
INSERT INTO "public"."treatment_preferences_pivot"
    ("treatment_preferences_id", "member_id")
VALUES(93, 8), (35, 8), (76, 8), (53, 8);

--SUBJECT 9

INSERT INTO "user"
	("id", "username", "password")
VALUES 
    (9, 'test9','test');
INSERT INTO "public"."members"
    ("id", "zip_code", "first_name", "last_name", "prefix", "age", "license_state", "license_expiration", "supervision_status", "fees", "credentials", "telehealth", "statement", "website", "hiamft_member_account_info", "title", "city", "license_number", "license_type")
VALUES(9, 96766, 'Jane', 'Rain', 'Mrs.', 38, 'Hawaii', '2023', 'Supervisor', '125-175', 'Counselor, MA, ATR, LPCC, LAMFT', FALSE, 'I specialize in conflict-resolution work with partners and families.', 'lihuecounseling.com', 'New member', 'Therapist', 'Lihue', '5738563', 1);
INSERT INTO "public"."address_table"
    ("business", "address", "member_id")
VALUES(TRUE, '3-3300 Kuhio Hwy, Lihue, HI 96766', 9);
INSERT INTO "public"."age_groups_served_pivot"
    ("age_groups_served_id", "member_id")
VALUES(1, 9),(2, 9);
INSERT INTO "public"."client_focus_pivot"
    ("client_focus_id", "member_id")
VALUES(1, 9), (2, 9), (14, 9), (12, 9), (12, 9); 
INSERT INTO "public"."email_table"
    ("business", "email", "member_id")
VALUES(TRUE, 'janerain@lihuecounseling.com', 9);
INSERT INTO "public"."insurance_pivot"
    ("insurance_type_id", "member_id")
VALUES(4, 9), (3, 9), (17, 9), (6, 9), (25, 9);
INSERT INTO "public"."island_pivot"
    ("island_id", "member_id")
VALUES(1, 9);
INSERT INTO "public"."languages_pivot"
    ("language_id", "member_id")
VALUES(11, 9), (20, 9);
INSERT INTO "public"."phone_table"
    ("number", "member_id", "business")
VALUES('(808) 246-8375', 9, TRUE), ('(808) 246-3857', 9, FALSE);
INSERT INTO "public"."session_format_pivot"
    ("session_format_id", "member_id")
VALUES(1, 9), (4, 9);
INSERT INTO "public"."specialty_pivot"
    ("specialty_id", "member_id")
VALUES(22, 9), (11, 9), (21, 9), (23, 9), (34, 9);
INSERT INTO "public"."treatment_preferences_pivot"
    ("treatment_preferences_id", "member_id")
VALUES (75, 9), (62, 9), (43, 9), (53, 9);