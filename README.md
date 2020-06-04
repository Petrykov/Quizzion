# Project HBO-IT Corp

## Api description

### Base URL: localhost:3000/api

### Log In (Quiz master)

> /user/login [POST]

### Headers

- `Content-Type application/json`
- `X-CSRFTokentoken`
- `X-Database lab`

Request

- `username string`
- `password string(md5hash)`

### Response

```
{
    "uh": string,
    "username": string,
    "email": string,
    "firstname": string,
    "middlename": string,
    "lastname": string,
    "token": string
}
```

### Log out (Quiz master)

> /user/logout [DELETE]

### Headers

- `Content-Type application/json`
- `X-CSRFTokentoken`
- `X-Database lab`

Request

- `token string`

### Response

```
log out successfully!
```

---