# ![Laravel App](logo.png)

> ### Example Laravel codebase containing real world examples (CRUD) that adheres to the spec and API.

This repo is functionality complete — PRs and issues welcome!

----------

# Getting started

Install all the dependencies using composer

    composer install

Make the required configuration changes in the .env file

    please change information of database.

Generate a new application key

    php artisan key:generate

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000

**Make sure you set the correct database connection information before running the migrations** [Environment variables](#environment-variables)

    php artisan migrate
    php artisan serve

The api can be accessed at [http://localhost:8000/api](http://localhost:8000/api).

## Environment variables

- `.env` - Environment variables can be set in this file

***Note*** : You can quickly set the database information and other variables in this file and have the application fully working.

----------

# Testing API

Run the laravel development server

    php artisan serve

The api can now be accessed at

    http://localhost:8000/api
