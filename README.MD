# Module \#4

##POSTGRESQL AND LAYERED ARCHITECTURE

### Using App

To use the app pls create `.env` file containing the following fields.
```
PORT=_YOUR_APP_PORT_
DB_NAME=_DB_NAME_
DB_URL=_DB_URL_
DB_PORT=_DB_PORT_
DB_USER=_DB_USER_
DB_PASSWORD=_DB_USER_PASSWORD_
```

### SQL script

The SQL script (SQL Queries) creates a table with test data.
The `id` field is filled in automatically.

```
create table users (
  	user_id serial primary key,
 	login varchar(50) unique not null,
	password varchar(50) not null,
 	age int not null
);

insert into users(login, password, age)
values
  	('test1', 'testPassword1', 10),
  	('test2', 'testPassword2', 12),
  	('test3', 'testPassword3', 11);
```
