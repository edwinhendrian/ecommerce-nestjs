# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "email": "edwinhendrian23@gmail.com",
  "name": "Edwin Hendrian",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "email": "edwinhendrian23@gmail.com",
    "name": "Edwin Hendrian"
  }
}
```

Response Body (Fail) :

```json
{
  "errors": "Email already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "email": "edwinhendrian23@gmail.com",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "email": "edwinhendrian23@gmail.com",
    "name": "Edwin Hendrian",
    "token": "<session_id_generated>"
  }
}
```

Response Body (Fail) :

```json
{
  "errors": "Email or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :

- authorization: token

Response Body (Success) :

```json
{
  "data": {
    "email": "edwinhendrian23@gmail.com",
    "name": "Edwin Hendrian"
  }
}
```

Response Body (Fail) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :

- authorization: token

Request Body :

```json
{
  "name": "Edwin Hendrian", // optional
  "password": "rahasia" // optional
}
```

Response Body (Success) :

```json
{
  "data": {
    "email": "edwinhendrian23@gmail.com",
    "name": "Edwin Hendrian"
  }
}
```

Response Body (Fail) :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :

- authorization: token

Response Body (Success) :

```json
{
  "data": true
}
```

Response Body (Fail) :

```json
{
  "errors": "Unauthorized"
}
```
