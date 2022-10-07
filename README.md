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
* **DATABASE VARS**<br/>
`DATABASE_URL`=`<Your database URL>`<br/>

* **AUTH0_API VARS**<br/>
`AUTH0_DOMAIN`=`<Auth0 tenant domain>`<br/>
`AUTH0_AUDIENCE`=`<The intended recipients of the token. This is typically the resource server (API, in the dashboard)>`<br/>
![](https://i.imgur.com/j0fHArP.png)

* **AUTH0_MANAGEMENT_API VARS**<br/>
Until now, the Auth0 Management API is not used in the API, but the configuration is alreadey implemented in this folder **`./src/middlewares/auth`**<br/>
`CLIENT_ID`=`<Clinet id to Auth0 Management API. (Auth0 Management API, in the dashboard)>`<br/>
`CLIENT_SECRET`=`<Clinet secret to Auth0 Management API. (Auth0 Management API, in the dashboard)>`<br/>
`GRANT_TYPE`=`client_credentials`<br/>
![](https://i.imgur.com/sgmG7BM.png)

* **AWS VARS** <br/>
`AWS_ACCESS_KEY_ID`=`<Access key id of AWS account>`<br/>
`AWS_SECRET_ACCESS_KEY`=`<Secret access key of AWS account>`<br/>
`AWS_SYRONAHEALTH_UPLOAD_BUCKET`=`<Name of AWS S3 bucket that used to store csv files>`<br/>
`AWS_REGION`=`<AWS S3 region>`<br/>

## The API can now accept tokens from the react app.

### IMPORTANT: Users with the `is_staff` flag can only be added from the database.
