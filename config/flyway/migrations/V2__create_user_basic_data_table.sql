-- V1__create_user_basic_data_table.sql

-- Ensure user_id and app_id have unique constraints in emailpassword_users
-- Uncomment one of the following two blocks as needed:

-- Option 1: Set user_id and app_id as a combined primary key
-- ALTER TABLE emailpassword_users
-- ADD PRIMARY KEY (user_id, app_id);

-- Option 2: Add unique constraints to user_id and app_id
-- ALTER TABLE emailpassword_users
-- ADD CONSTRAINT unique_user_id_app_id UNIQUE (user_id, app_id);

-- Create the user_basic_data table
CREATE TABLE user_basic_data (
    user_id BPCHAR(36) NOT NULL,
    app_id VARCHAR(64) NOT NULL DEFAULT 'public',
    firstname VARCHAR(128),
    lastname VARCHAR(128),
    username VARCHAR(128),
    PRIMARY KEY (user_id, app_id),
    CONSTRAINT fk_user_app
        FOREIGN KEY (user_id, app_id)
        REFERENCES emailpassword_users (user_id, app_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Add a unique constraint on the username column to ensure each username is unique
ALTER TABLE user_basic_data
ADD CONSTRAINT unique_username UNIQUE (username);
