# Address API Spec

## Create Address

Endpoint : POST /api/addresses

Headers :

- authorization: token

Request Body :

```json
{
  "address": "Ciledug Indah 1 Blok A12 No. 235 RT 012/RW 006, Pedurenan, Karang Tengah",
  "city": "Tangerang",
  "province": "Banten",
  "country": "Indonesia",
  "postal_code": "15158",
  "phone": "081315686317"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "<uuid_generated>",
    "address": "Ciledug Indah 1 Blok A12 No. 235 RT 012/RW 006, Pedurenan, Karang Tengah",
    "city": "Tangerang",
    "province": "Banten",
    "country": "Indonesia",
    "postal_code": "15158",
    "phone": "081315686317"
  }
}
```

Response Body (Fail) :

```json
{
  "errors": "Unauthorized"
}
```

## Get Address

Endpoint : GET /api/addresses/:address_id

Headers :

- authorization: token

Response Body (Success) :

```json
{
  "data": {
    "id": "<address_id>",
    "address": "Ciledug Indah 1 Blok A12 No. 235 RT 012/RW 006, Pedurenan, Karang Tengah",
    "city": "Tangerang",
    "province": "Banten",
    "country": "Indonesia",
    "postal_code": "15158",
    "phone": "081315686317"
  }
}
```

Response Body (Fail) :

```json
{
  "errors": "Unauthorized"
}
```

## Update Address

Endpoint : PUT /api/addresses/:address_id

Headers :

- authorization: token

Request Body :

```json
{
  "address": "Ciledug Indah 1 Blok A12 No. 235 RT 012/RW 006, Pedurenan, Karang Tengah",
  "city": "Tangerang",
  "province": "Banten",
  "country": "Indonesia",
  "postal_code": "15158",
  "phone": "081315686317"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "<address_id>",
    "address": "Ciledug Indah 1 Blok A12 No. 235 RT 012/RW 006, Pedurenan, Karang Tengah",
    "city": "Tangerang",
    "province": "Banten",
    "country": "Indonesia",
    "postal_code": "15158",
    "phone": "081315686317"
  }
}
```

Response Body (Fail) :

```json
{
  "errors": "Unauthorized"
}
```

## Remove Address

Endpoint : DELETE /api/addresses/:address_id

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

## List Addresses

Endpoint : GET /api/addresses

Headers :

- authorization: token

Response Body (Success) :

```json
{
  "data": [
    {
      "id": "<address_id>",
      "address": "Ciledug Indah 1 Blok A12 No. 235 RT 012/RW 006, Pedurenan, Karang Tengah",
      "city": "Tangerang",
      "province": "Banten",
      "country": "Indonesia",
      "postal_code": "15158",
      "phone": "081315686317"
    },
    {
      "id": "<address_id>",
      "address": "...",
      "city": "...",
      "province": "...",
      "country": "...",
      "postal_code": "...",
      "phone": "..."
    }
  ]
}
```

Response Body (Fail) :

```json
{
  "errors": "Unauthorized"
}
```
