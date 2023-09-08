# student_system_backend
A simple system for student registration

In order to run this application, clone this application and install packages.

Install package by running command
`npm install`

Make sure **.env** file is created in order to run backend

The variables required in **.env** are:
```console
DB_URI = //url for mongo db
JWT_SECRET = helloworld
JWT_EXPIRE = 60m
PORT = 4000
```

After this, program can be started by running command
```console
npm run dev
```

The frontend for this application is available on: https://github.com/imma0010/student_system_frontend

Make sure to register user before registering student.

Also make sure that the role of the user is admin, because only admin has authority to create, retrieve, update and delete student