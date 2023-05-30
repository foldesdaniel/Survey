# Survey

This web application is used to make, delete and modify surveys, and also to fill out them.

## Sites

### Main page (Survey)

Includes static text.

### Registration

The following data is required:

- name (required)
- email (required)
- password (required)

### Login

The following data is required:

- email (required)
- password (required)

### New survey

You have to be logged in.
You have to make surveys in a "code" format (write on the textarea):

- the first row is the title
- every page starts with a new line
- every page's first row contains it's name, and below are the questions

Every question can be answere with a simple text answer (text input is enough).

After saving the survey, the REST API automatically append the survey to the currently logged in user and generates an unique id (`hash`), which can be used later to access the survey.

### My surveys

You have to be logged in.
You can see your surveys on this page, and make modifications like:

- delete,
- modify,
- copy link to access the survey,
- to see it's answers.

### Survey

You can fill out any existing survey, but you have to login first!

### Answers

You have to be logged in.
You can choose from the survey list and check it's answers.

### Profile

You have to be logged in.
User's data will be displayed:

- Name
- Email
- Number of the surveys

## REST API

Három three services will be running:

- `users`
- `surveys`
- `results`

You can try them out with POSTMAN (or other app if you would like):

- [auth](https://api.postman.com/collections/15151253-4cf57ab5-49d7-4350-af18-9e3c7b29626a?access_key=PMAT-01H0JMHKRYB30J9BFQAMQ2PDR2)
- [surveys](https://api.postman.com/collections/15151253-faa17ed9-b3d4-4e85-b681-52fe8dbfde37?access_key=PMAT-01H0JMK0RGT8BH9CQY6CGF8ZW6)
- [results](https://api.postman.com/collections/15151253-b3e753b2-42d0-4946-b312-999bb75002d4?access_key=PMAT-01H0JMKX3741T69NKZXD9ABX6Z)

## Database

Saved data is stored in `rest-api.sqlite` file.
