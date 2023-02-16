# RoomEASE

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A class project requiring us to build a full-stack application using Node and Express.js, with Sequelize connecting to a MySQL backend.
NPM installed dependencies:

-   dotenv
-   express
-   express-handlebars
-   mysql2
-   path
-   sequelize
-   nodemailer
-   nodemailer-expres-handlebars
    <br>\(\*see package.json for more details.)

This project is intended for users to use for their household. They are able to create an account and a home on sign up and give a home name and zip code for their friends to join their same home. This essentially allows users to coordinate within their homes who is in it, show tasks that need to get done, events that can be attended, and debts/favors that need to be repaid in one easy dashboard their respective pages.

### User Story

```
AS A person that lives in a house with multiple people
I WANT an app that can allow us to coordinate tasks, debts, and events with my household
SO THAT I can organize, create, delete, update the my user data, tasks, debts, and events as needed and in one place.
```

### Acceptance Criteria

```
GIVEN I am a new user to Roomease

WHEN I go to the landing page of the site
THEN I am presented with a form to log in or alternatively click on another button to create an account.

WHEN I am creating a new account
THEN I will fill out the required information of my email, first name, and password.

WHEN I hit the next button on the account
THEN I am taken to an additional sign up page to verify if I would like to join an existing home or create a new home.

WHEN I input an inappropriate value to a field
THEN I will receive an error that gives me a reason why my input does not work.

WHEN I have created the home or joined an existing home
THEN I am taken to the home dashboard to see snippets of who my roomies are, what my assigned tasks are, what my upcoming events are, who do I owe and what.

WHEN I click on the roomies page
THEN I am shown a list of all of the roomates in the house and all of their related Tasks, UOM, and Events underneath.

WHEN I click on the tasks page
THEN I am shown all of the tasks and who they are assigned to with options of editing the task, or deleting the task.

WHEN I click on the ‘+’ button on the tasks page
THEN a modal opens where I fill out a form for what the task is and which roomie to assign it to if I desire.

WHEN I click on the edit button
THEN I am able to edit the task and who is assigned to the task

WHEN I click on the delete button
THEN I am able to remove the task and its assignee from the page and db

WHEN I click on the Events page
THEN I am shown a list of all the events and who they are assigned to

WHEN I click on the ‘+’ button on the events page
THEN a modal opens where I fill out a form for what the event is, when the event is, and which roomies are attending.

WHEN I click on the edit button on the events page
THEN I am able to edit what the event is, when the event is, and who is attending the event

WHEN I click on the delete button on the events page
THEN I am able to remove the event from the page and db.

WHEN I click on the U Owe Me page
THEN I am shown a list of all of the U Owe Me’s: Who owes what to whom

WHEN I click on the ‘+’ button on the UOM page
THEN a modal opens where I fill out a form for what is owed from my roomie and who is the roomie that owes me and I am able to submit that new UOM to the database.

WHEN I click on the edit button on the UOM page
THEN I am able to edit what is owed to me, how much they owe me, and who owes me.

WHEN I click on the delete button on the UOM page
THEN I am able to remove the event from the page and db.

WHEN I click on the Settings page
THEN I am shown a section to change my account information.

WHEN I submit data to update the fields in the Settings page
THEN that data should update in the database.
```

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [License](#license)
-   [Credits](#credits)

## Installation

To install, download the files found in the root directory of github. Create a `.env` file with `DB_NAME`, `DB_USER`, and `DB_PW` fields to connect to your MySQL database. You will also need to set up `EMAIL_HOST`, `EMAIL_USERNAME`, `EMAIL_PASSWORD`, and `EMAIL_PORT` to be able to send out notification emails using Nodemailer. Finally, `SESSION_SECRET` needs to be set up when defining your session object in `./index.js`. Run `npm install` in the root directory once downloaded to install required dependencies.

## Usage

Once installed, users can test functionality with Insomnia, Postman, or another API endpoint tester, or build and connect front end functionality. The deployed website can be found here for [RoomEASE](https://roomease.herokuapp.com/).

### GIF walkthrough of website

![usage image](https://github.com/maximusDecimalusMeridius/roomease/blob/dev/public/images/roomeaseusage.gif?raw=true)

## License

MIT License - Please refer to the LICENSE in the repo.

[Copyright 2010 The Josefin Sans Project Authors](https://github.com/ThomasJockin/JosefinSansFont-master), with Reserved Font Name "Josefin Sans".
This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is available with a FAQ at: http://scripts.sil.org/OFL

## Credits

Authors: [Aly Geiger](https://github.com/KawaiKimono), [Clarice Tran](https://github.com/claricetran), [Andy Gaudy](https://github.com/maximusDecimalusMeridius)

Thanks to [Experte](https://www.experte.com/logo-maker#/) - for their free logo maker.

For any questions, please feel free to reach out to one of us!
