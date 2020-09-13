CREATE DATABASE foodfy;

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int,
  "title" text NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "information" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "file_id" int
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int,
  "file_id" int
);

CREATE TABLE "users"
(
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "reset_token" text,
  "reset_token_expires" text,
  "is_admin" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);


-- foreign key
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");
ALTER TABLE "recipe_files" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id");

ALTER TABLE "recipes" ADD COLUMN user_id int;
ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");


-- create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW
();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- auto updated_at recipes
CREATE TRIGGER trigger_set_timestamp
BEFORE
UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp
();

-- auto updated_at user
CREATE TRIGGER trigger_set_timestamp
BEFORE
UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp
();


--express-session

CREATE TABLE "session"
(
  "sid" varchar NOT NULL
  COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp
  (6) NOT NULL
)
  WITH
  (OIDS=FALSE);
  ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid")
  NOT DEFERRABLE INITIALLY IMMEDIATE;

  
--CASCADE EFFECT WHEN DELETE USER AND PRODUCT

ALTER TABLE "recipes"
DROP CONSTRAINT	recipes_user_id_fkey	
,
ADD CONSTRAINT recipes_user_id_fkey	
FOREIGN KEY
("user_id")
REFERENCES "users"
("id")
ON
DELETE CASCADE;

ALTER TABLE "recipe_files"
DROP CONSTRAINT recipe_files_recipe_id_fkey
,
ADD CONSTRAINT recipe_files_recipe_id_fkey
FOREIGN KEY
("recipe_id")
REFERENCES "recipes"
("id")
ON
DELETE CASCADE;

ALTER TABLE "recipe_files"
DROP CONSTRAINT	recipe_files_file_id_fkey
,
ADD CONSTRAINT recipe_files_file_id_fkey
FOREIGN KEY
("file_id")
REFERENCES "files"
("id")
ON
DELETE CASCADE;


ALTER TABLE "chefs"
DROP CONSTRAINT	chefs_file_id_fkey
,
ADD CONSTRAINT chefs_file_id_fkey
FOREIGN KEY
("file_id")
REFERENCES "files"
("id")
ON
DELETE CASCADE;