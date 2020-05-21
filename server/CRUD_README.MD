# Server API

## Get product info
  * GET `/api/products/:id`

**Path Parameters:**
  * `id` product id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "id": "Number",
      "name": "String",
      "collectionName": "String",
      "reviewCount": "String",
      "reviewAverage": "String",
      "colors": [
        {
          "id": "Number",
          "name": "String",
          "listPrice": "Number",
          "salePrice": "Number",
          "inventory": [
            {
              "size": "String",
              "quantity": "Number"
            }, ...
          ]
        }, ...
      ]
    }
```

## Add product
  * POST `/api/products`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "id": "Number",
      "name": "String",
      "collectionName": "String",
      "reviewCount": "String",
      "reviewAverage": "String",
      "colors": [
        {
          "id": "Number",
          "name": "String",
          "listPrice": "Number",
          "salePrice": "Number",
          "inventory": [
            {
              "size": "String",
              "quantity": "Number"
            }, ...
          ],
          "images": [
            "String", ...
          ]
        }, ...
      ]
    }
```

## Update product info
  * PATCH `/api/product/:id`

**Path Parameters:**
  * `id` product id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```json
    {
      "id": "Number",
      "name": "String",
      "collectionName": "String",
      "reviewCount": "String",
      "reviewAverage": "String"
    }
```

## Delete product
  * DELETE `/api/products/:id`

**Path Parameters:**
  * `id` product id


## Get product info
  * GET `/api/products/:id/colors/:id`

**Path Parameters:**
  * `id` product id, color id

**Success Status Code:** `200`

**Returns:** JSON

```json
    {
      "id": "Number",
      "name": "String",
      "listPrice": "Number",
      "salePrice": "Number",
      "inventory": [
        {
          "size": "String",
          "quantity": "Number"
        }, ...
      ],
      "images": [
        "String", ...
      ]
    }
```

## Add product color
  * POST `/api/products/:id/colors`

**Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "id": "Number",
      "name": "String",
      "listPrice": "Number",
      "salePrice": "Number",
      "inventory": [
        {
          "size": "String",
          "quantity": "Number"
        }, ...
      ],
      "images": [
        "String", ...
      ]
    }
```

## Update color info
  * PATCH `/api/products/:id/colors/:id`

**Path Parameters:**
  * `id` product id, color id

**Success Status Code:** `204`

**Request Body**: Expects JSON with any of the following keys (include only keys to be updated)

```
```json
    {
      "id": "Number",
      "name": "String",
      "listPrice": "Number",
      "salePrice": "Number",
      "images": [
        "String", ...
      ]
    }
```

## Delete color
* DELETE `/api/products/:id/colors/:id`

**Path Parameters:**
  * `id` product id, color id

**Success Status Code:** `204`

## Add size
  * POST `/api/products/:id/colors/:id`
  **Success Status Code:** `201`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "size": "String",
      "quantity": "Number"
    }
```

## Update size quantity
  * PUT `/api/products/:id/colors/:id`
  **Success Status Code:** `204`

**Request Body**: Expects JSON with the following keys.

```json
    {
      "size": "String",
      "quantity": "Number"
    }
```