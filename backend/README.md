
# Guesty FS Challenge - BE

This is the backend service from Guesty's FS challenge.
This service gets a list of definitions and generates from them a list of schedules.

## Installation

Install dependencies with [npm](https://www.npmjs.com/).

```bash
npm install
```

## Usage

Run in development with nodemon
```bash
npm run dev
```
Run in production with node
```bash
npm run start
```

## API
Basic REST API in order to authenticate add a "token" header to your request with the value of "1".

**GET** /job/all    

**RESPONSE**
```js
{
 [jobId:number]: {
   [timestamp:number]: {
      jobId: number;
      recipientsList: Recipient[];
      body: string;
      recurrence: string;
      timezone: string;
      created_at: number;
      end_date: number;
      last_updated: number;
      last_triggred: number;
      isEnabled: boolean;
      schedule_date: number;
      done: boolean;
   };
  } 
 }  
}
```
<hr />  

**GET** */job/timeframe/:from/:to*   
 
**Parameters**  
| Name | Type | Description |  
| ---- | ---- | ----------- |  
| from| number | Start date in unix timestamp  |
| to| number | End date in unix timestamp  |

**Response** - status 200
The response of this method is the same as */job/all* just in the range.
<hr />    
**POST**  */job/trigger/:jobId/:timestamp*  

| Name | Type | Description |  
| ---- | ---- | ----------- |  
| jobId | number | Id of the definition  |
| timestamp| number | The unix representation for the job's schedule_date  |

**Response** - status 200
```javascript
Job #{jobId} triggered successfully at {trigger_time}
```
  
  <hr />
  
**POST**  */job/add*    

**Request body example**
```javascript
{
	"recipientsList": [{
		"recipientId": 1,
		"email": "my@email.com"
		}
	],
	"body": "My api added email",
	"recurrence": "* * * * *",
	"timezone": "he/IL",
	"created_at": 1629294770139,
	"last_triggred": 0,
	"last_updated": 1629294854247,
	"isEnabled": true
}
```
**Response** - status 200
```javascript
Job #{jobId} has been added successfully
```
<hr  />

**PUT**  */job/disable/:jobId/:timestamp*    
| Name | Type | Description |  
| ---- | ---- | ----------- |  
| jobId | number | Id of the definition  |
| timestamp| number | The unix representation for the job's schedule_date  |


**Response** - status 200
```javascript
Job #{jobId} has been disabled successfully
```

<hr />

**PUT**  */job/enable/:jobId/:timestamp*    
| Name | Type | Description |  
| ---- | ---- | ----------- |  
| jobId | number | Id of the definition  |
| timestamp| number | The unix representation for the job's schedule_date  |


**Response** - status 200
```javascript
Job #{jobId} has been enabled successfully
```

