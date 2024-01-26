# Student MVP Project

## Set up local files in project directory
### Set up database using files inside MVP/db
* separate local migration and seed sql from Render sql by name
* copy local sql files into /tmp directory of PostgreSQL Docker container
* create and seed local database using copied local sql files in /tmp
* create Render database sql files, which will seed the database on Render later

## Set up database on Render
### Create, seed, and connect to Render database
* connect to Render database using psql from PostgreSQL Docker container
* seed Render database using sql files
* check Render database logs to confirm that the desired data from PostgreSQL Docker container was correctly seeded

## Set up server app
### Set up server
* port
* route
* listener
