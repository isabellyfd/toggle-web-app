# Toggle API 
This server aims to provide an interface within the web application / iOS Framework to the data base, making error handling easier and lessen the coupling. 

The endpoints are described bellow.

## Create User 

`POST /v1/toggle-service/create-user/`

#### Body
```
{
	"email": "email@test1.com",
	"password": "passw0rd!"
}
```

## Create Application 

`POST /v1/toggle-service/create-application/`

#### Body
```
{
	"applicationId": "${SOME APPLICATION ID}",
	"toggleName": "${TOGGLE NAME}",
	"toggleValue": false
}
```

## All Toggles For User

`GET /v1/toggle-service/my-apps/:userId`


## Update Toggle For Application 

`POST /v1/toggle-service/toggle/update`

#### Body
```
{
	"applicationId": "${SOME APPLICATION ID}",
	"toggleId": "${SOME TOGGLE ID}",
	"toggleName": "${TOGGLE NAME}",
	"toggleValue": true
}
```

