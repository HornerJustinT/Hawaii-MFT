CREATE TABLE "members" (
	"username" VARCHAR(20) NOT NULL UNIQUE,
	"password" VARCHAR(20) NOT NULL,
	"id" SERIAL PRIMARY KEY,
	"zip_code" INT,
	"first_name" VARCHAR(20) NOT NULL,
	"last_name" VARCHAR(20) NOT NULL,
	"prefix" VARCHAR(20),
	"age" INT,
	"license_state" VARCHAR(50),
	"license_expiration" VARCHAR(50),
	"hiamft_member_account_info" VARCHAR(20),
	"supervision_status" VARCHAR(255),
	"fees" VARCHAR(255)	
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
	"session_format" SERIAL PRIMARY KEY,
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


CREATE TABLE "phone_type" (
	"phone_type_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "phone_table"(
	"number" INT NOT NULL,
	"member_id" INT NOT NULL,
	"phone_type_id" INT NOT NULL,
	FOREIGN KEY ("phone_type_id") REFERENCES "phone_type"("phone_type_id"),
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
	
	
CREATE TABLE "address_type" (
	"address_type_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "address_table"(
	"address_type_id" INT NOT NULL,
	"address" VARCHAR(255) NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("address_type_id") REFERENCES "address_type"("address_type_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));


CREATE TABLE "speciality" (
	"speciality_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "speciality_pivot"(
	"speciality_id" INT NOT NULL,
	"member_id" INT NOT NULL,
	FOREIGN KEY ("speciality_id") REFERENCES "speciality"("speciality_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));


CREATE TABLE "email_type" (
	"email_type_id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL
);

CREATE TABLE "email_table"(
	"email_type_id" INT NOT NULL,
	"email" VARCHAR(255),
	"member_id" INT NOT NULL,
	FOREIGN KEY ("email_type_id") REFERENCES "email_type"("email_type_id"),
	FOREIGN KEY ("member_id") REFERENCES "members"("id"));