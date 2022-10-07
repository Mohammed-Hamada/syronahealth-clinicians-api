# Deployment Instructions 
### 1. Clone the repository to your machine.
### 2. Create an AWS S3 bucket to store the csv files.
### 3. Create an Auth0 tenant and Create an Application for the API.
* This application should be an API.
![](https://i.imgur.com/DZaatUV.png)
* The identifier is the `audience` that recieve the token. (The API domain).
![](https://i.imgur.com/B2PDwKZ.png)


### 4. Set the list of `Environment Variables` into your deployment service.

#### The list of env vars contains this list of variables:
* **DATABASE VARS**
`DATABASE_URL`=`<Your database URL>`

* **AUTH0_API VARS**
`AUTH0_DOMAIN`=`<Auth0 tenant domain>`
`AUTH0_AUDIENCE`=`The intended recipients of the token. This is typically the resource server (API, in the dashboard)`

![](https://i.imgur.com/j0fHArP.png)

* **AUTH0_MANAGEMENT_API VARS**
Until now, the Auth0 Management API is not used in the API, but the configuration and is alreadey implemented in this folder <br/>**`./src/middlewares/auth`**
`CLIENT_ID`=`Clinet id to Auth0 Management API. (Auth0 Management API, in the dashboard)`
`CLIENT_SECRET`=`Clinet secret to Auth0 Management API. (Auth0 Management API, in the dashboard)`
`GRANT_TYPE`=`client_credentials`
![](https://i.imgur.com/sgmG7BM.png)

* **AWS VARS** 
`AWS_ACCESS_KEY_ID`=`<Access key id of AWS account>`
`AWS_SECRET_ACCESS_KEY`=`<Secret access key of AWS account>`
`AWS_SYRONAHEALTH_UPLOAD_BUCKET`=`<Name of AWS S3 bucket that used to store csv files>`
`AWS_REGION`=`<AWS S3 region>`

## The API can now accept tokens from the react app.

### IMPORTANT: Users with the is_staff flag can only be added from the database.
