# Syronahealth Management API
> **NOTE:** All data in this documentation is a fake data.

---

## GET
`staff olny` **Get all companies** [/api/v1/companies](#GET-apiv1companies)<br/>
`staff and business` **Get all engagements** [/api/v1/companies/{id}](#GET-apiv1companiesid)<br/>
`staff and business` **Get users interests** [/api/v1/companies/{id}/users-engagements](#GET-apiv1idusers-engagements)<br/>
`staff and business` **Get all companies** [/api/v1/companies/{id}/users-interests](#GET-apiv1idusers-interests)<br/>
`staff and business` **Get users health conditions** [/api/v1/companies/{id}/users-health/conditions](#GET-apiv1idusers-health-conditions)<br/>
`staff and business` **Get users gender count** [/api/v1/companies/{id}/employees-gender](#GET-apiv1idemployees-gender)<br/>

## POST
`staff olny` **Create new company (Employer User)** [/api/v1/companies](#POST-apiv1companies)<br/>
`staff olny` **Upload a csv file include list of users to be added to the company** [/api/v1/companies/{id}/users](#POST-apiv1companiesidusers)<br/>

## PATCH (uncompleted)
`staff olny` **Update company data (Employer User)** [/api/v1/companies/{id}](#PATCH-apiv1companiesid)<br/>


---
This API have two roles, Staff user and Business user, and each of them have some permissions to access this API

| **Role** | **Slug** | **Description** |
| :--- | :--- | :--- |
| Staff | `isStaff` | An administrative user. Users with this role can manage system-wide settings as well as he can add Employers and employees and access all data for these users. |
| Business | `isBusiness` |  A non-administrative user role. Users with this role can access data for just one company. |

User have the following structure 

```js
{
  id                  : integer
  username            : string
  email               : string
  firstName           : string
  lastName            : string
  gender              : string
  coins               : integer
  isActive            : boolean // represents if this account is verified
  isStaff             : boolean // represents if this account is used by Syronahealth team member
  isBusiness          : boolean // represents if this account is used bu an Employer user
  isDeleted           : boolean // represents if this account is deleted one
}
```
--- 

#### To access this API, you need to be registered in our **Auth0** Application to get an access token.

## Headers:

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| Authorization | required | **Bearer <Access_Token>** | An access token with **`Bearer`** prefix |

--- 

## Comapny Router:
Company have the following structure

```js
{
  id                  : integer
  name                : string 
  uniqueCode          : char(6)
  subscriptionType    : char(3) // 1 for lite, 2 for premium 
  allowedEmployees    : integer
  coins               : integer
  registeredEmployees : integer
}
```

---

## GET `/api/v1/companies`

Get all companies data

### Response:
```json
// No companies 
// 200 OK
{
  "message": "success",
  "data": []
}
```

```json
// There is a companies
// 200 OK
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Plambee",
      "uniqueCode": "a5b1e1",
      "subscriptionType": "1  ",
      "allowedEmployees": 100,
      "coins": 6359,
      "registeredEmployees": 11,
      "timestamp": "2022-08-30T08:50:37.545Z",
      "updated": "2022-08-30T08:50:37.545Z"
    },
    {
      "id": 2,
      "name": "Wordpedia",
      "uniqueCode": "47d45f",
      "subscriptionType": "2  ",
      "allowedEmployees": 200,
      "coins": 9245,
      "registeredEmployees": 8,
      "timestamp": "2022-08-30T08:50:37.545Z",
      "updated": "2022-08-30T08:50:37.545Z"
    },
    {
      "id": 3,
      "name": "Jaxworks",
      "uniqueCode": "afaed4",
      "subscriptionType": "1  ",
      "allowedEmployees": 797,
      "coins": 7487,
      "registeredEmployees": 460,
      "timestamp": "2022-08-30T08:50:37.545Z",
      "updated": "2022-08-30T08:50:37.545Z"
    },
    {
      "id": 4,
      "name": "Gabtune",
      "uniqueCode": "39681a",
      "subscriptionType": "2  ",
      "allowedEmployees": 700,
      "coins": 7945,
      "registeredEmployees": 492,
      "timestamp": "2022-08-30T08:50:37.545Z",
      "updated": "2022-08-30T08:50:37.545Z"
    }
  ]
}
```

```json
// Error 
// 500 INTERNAL SERVER ERROR 
{
  "message": "An error occurs"
}
```

---

## GET `/api/v1/companies/{id}`

### Parameters:

Get specific company data

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| id | required | number | **ID** for the comapny to retrive |

**id = 1**

### Response:
```json
// No company with this id
// 400 BAD REQUEST
{
  "message": "There is no company with id 1"
}
```

```json
// There is a company with id 1
// 200 OK
{
  "message": "success",
  "data": {
    "id": 1,
    "name": "Plambee",
    "uniqueCode": "a5b1e1",
    "subscriptionType": "1  ",
    "allowedEmployees": 100,
    "coins": 6359,
    "registeredEmployees": 11,
    "timestamp": "2022-08-30T08:50:37.545Z",
    "updated": "2022-08-30T08:50:37.545Z"
  }
}
```

```json
// Error 
// 500
{
  "message": "An error occurs"
}
```

---

## GET `/api/v1/{id}/users-engagements`

Get users engagements for a company

### Parameters:

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| id | required | number | **ID** for the comapny to retrive |

**id = 1**

### Response:
```json
// There is no company with id 1
// 400 BAD REQUEST
{
  "message": "There is no company with id 1"
}
```

```json
// There is a company with id 1
// 200 OK

// No engagements
{
  "message": "success",
  "data": {
    "company": {
      "id": 1,
      "totalEngagements": [
        {
          "percentage": 0,
          "label": "Others"
        }
      ]
    }
  }
}
```
```json
// There is a company with id 1
// 200 OK

// There is an engagements
{
  "message": "success",
  "data": {
    "company": {
      "id": 1,
      "totalEngagements": [
        {
          "percentage": 16.411378555798688,
          "label": "Added A Note"
        },
        {
          "percentage": 15.317286652078774,
          "label": "Commented On A Blog"
        },
        {
          "percentage": 11.37855579868709,
          "label": "Booked Consultation"
        },
        {
          "percentage": 56.892778993435456,
          "label": "Others"
        }
      ]
    }
  }
}
```

```json
// Error 
// 500
{
  "message": "An error occurs"
}
```

---

## GET `/api/v1/{id}/users-interests`

Get users interests for a company

### Parameters:

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| id | required | number | **ID** for the comapny to retrive |

**id = 1**

### Response:
```json
// There is no company with id 1
// 400 BAD REQUEST
{
  "message": "There is no company with id 1"
}
```

```json
// There is a company with id 1
// 200 OK

// No interests
{
  "message": "success",
  "data": {
    "company": {
      "id": 1,
      "totalInterests": [
        {
          "percentage": 0,
          "label": "Others"
        }
      ]
    }
  }
}
```
```json
// There is a company with id 1
// 200 OK

// There is an interests
{
  "message": "success",
  "data": {
    "company": {
      "id": 1,
      "totalInterests": [
        {
          "percentage": 10.256410256410255,
          "label": "Pregnancy"
        },
        {
          "percentage": 7.6923076923076925,
          "label": "Wellbeing"
        },
        {
          "percentage": 7.6923076923076925,
          "label": "Sexual Health"
        },
        {
          "percentage": 74.35897435897435,
          "label": "Others"
        }
      ]
    }
  }
}
```

```json
// Error 
// 500
{
  "message": "An error occurs"
}
```

---

## GET `/api/v1/{id}/users-health-conditions`

Get users health conditions for a company

### Parameters:

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| id | required | number | **ID** for the comapny to retrive |

**id = 1**

### Response:
```json
// There is no company with id 1
// 400 BAD REQUEST
{
  "message": "There is no company with id 1"
}
```

```json
// There is a company with id 1
// 200 OK

// No health conditions
{
  "message": "success",
  "data": {
    "company": {
      "id": 1,
      "topThreeHealthConditions": [],
      "allHealthConditions": []
    }
  }
}
```
```json
// There is a company with id 1
// 200 OK

// There is a health conditions
{
  "message": "success",
  "data": {
    "company": {
      "id": 1,
      "topThreeHealthConditions": [
        {
          "percentage": 19.047619047619047,
          "label": "Hair Loss"
        },
        {
          "percentage": 14.285714285714285,
          "label": "Stress"
        },
        {
          "percentage": 14.285714285714285,
          "label": "Depression"
        }
      ],
      "allHealthConditions": [
        {
          "percentage": 19.047619047619047,
          "label": "Hair Loss"
        },
        {
          "percentage": 14.285714285714285,
          "label": "Stress"
        },
        {
          "percentage": 14.285714285714285,
          "label": "Depression"
        },
        {
          "percentage": 9.523809523809524,
          "label": "High Blood Pressure"
        },
        {
          "percentage": 9.523809523809524,
          "label": "High Cholesterol"
        },
        {
          "percentage": 9.523809523809524,
          "label": "Alzheimer's Disease"
        },
        {
          "percentage": 4.761904761904762,
          "label": "Leukemia"
        },
        {
          "percentage": 4.761904761904762,
          "label": "Heart Disease"
        },
        {
          "percentage": 4.761904761904762,
          "label": "Infertility"
        },
        {
          "percentage": 4.761904761904762,
          "label": "Chronic Obstructive Pulmonary Disease (copd)"
        },
        {
          "percentage": 4.761904761904762,
          "label": "Endo"
        }
      ]
    }
  }
}
```

```json
// Error 
// 500
{
  "message": "An error occurs"
}
```

---

## GET `/api/v1/{id}/employees-gender`

Get users gender count for a company

### Parameters:

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| id | required | number | **ID** for the comapny to retrive |

**id = 1**

### Response:
```json
// There is no company with id 1
// 400 BAD REQUEST
{
  "message": "There is no company with id 1"
}
```

```json
// There is a company with id 1
// 200 OK

{
  "message": "success",
  "data": {
    "company": {
      "id": 2,
      "employeesGender": [
        {
          "count": 23,
          "label": "Female"
        },
        {
          "count": 40,
          "label": "Male"
        },
        {
          "count": 4,
          "label": "Transfemale"
        },
        {
          "count": 0,
          "label": "Transmale"
        },
        {
          "count": 2,
          "label": "None Or Agender"
        },
        {
          "count": 6,
          "label": "Others"
        },
        {
          "count": 3,
          "label": "Prefer Not To Say"
        }
      ],
      "employeesCount": 78
    }
  }
}
```

```json
// Error 
// 500
{
  "message": "An error occurs"
}
```

---
---

## POST `/api/v1/companies`

Create new company with employer user

### Body:

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| name | required | string | The name of the company |
| subscriptionType | required | int | Subscription type for the company: 1 for lite, 2 for premium |
| email | required | string | Email or list of emails for employer users in the company. To add list of emails, add comma (,) between them. e.g.: `a@gmail.com, b@gmail.com` |
| coins | not required | int | Number of coins that will added as a bouns coins to invited emails |
| allowedEmployees | not required | int | Number of allowed employees in the company |




### Response:
```json
// Company created successfully
// 200 OK
{
  "message": "success"
}
```

```json
// Error 
// 500 INTERNAL SERVER ERROR 
{
  "message": "An error occurs"
}
```
---

## POST `/api/v1/companies/{id}/users`

Add employees to the company
* This endpoint allow admin to upload the csv file to the folder named uploads-development in **`development`** environment and to AWS S3 bucket in the **`production`** environment

### Form:

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| users | required | csv | CSV file with users data to be added to the company |


### Response:
```json
// Upload csv file completed successfully
// 200 OK
{
  "message": "success",
  "status": "Uploading successful",
  "users": 10
}
```

```json
// Error while uploading
// 400 BAD REQUEST
{
  "status": "Uploading unsuccessful",
  "issues": 10,
  "problemIn": [
    "eehrat0@studiopress.com is already a user (Line 2, Row 1)",
    "kbretelle1@ucoz.ru is already a user (Line 3, Row 1)",
    "owaddy2@cbslocal.com is already a user (Line 4, Row 1)",
    "hbattany3@shutterfly.com is already a user (Line 5, Row 1)",
    "jstubbs4@census.gov is already a user (Line 6, Row 1)",
    "sharse5@zdnet.com is already a user (Line 7, Row 1)",
    "htitcumb6@ovh.net is already a user (Line 8, Row 1)",
    "lstollen7@tripadvisor.com is already a user (Line 9, Row 1)",
    "aharower8@quantcast.com is already a user (Line 10, Row 1)",
    "hkilby9@zimbio.com is already a user (Line 11, Row 1)"
  ]
}
```

```json
// Not a csv file
// 400 BAD REQUEST
{
  "message": "Please add a CSV file"
}
```

```json
// Error 
// 500 INTERNAL SERVER ERROR 
{
  "message": "An error occurs"
}
```
---
---

## PATCH `/api/v1/companies/{id}`

Update company data

### Body:

| **Name** | **Required** | **Format** | **Description** |
| :--- | :--- | :--- | :--- |
| name | required | string | The name of the company |
| subscriptionType | not required | int | Subscription type for the company: 1 for lite, 2 for premium |
| email | not required | string | Email or list of emails for employer users in the company. To add list of emails, add comma (,) between them. e.g.: `a@gmail.com, b@gmail.com` |
| coins | not required | int | Number of coins that will added as a bouns coins to invited emails |
| allowedEmployees | not required | int | Number of allowed employees in the company |




### Response:
```json
// Company created successfully
// 200 OK
{
  "message": "success"
}
```

```json
// Error 
// 500 INTERNAL SERVER ERROR 
{
  "message": "An error occurs"
}
```
---
