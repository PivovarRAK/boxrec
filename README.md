# BoxRec
[![Build Status](https://travis-ci.org/boxing/boxrec.svg?branch=master)](https://travis-ci.org/boxing/boxrec) [![Coverage Status](https://coveralls.io/repos/github/boxing/boxrec/badge.svg?branch=master)](https://coveralls.io/github/boxing/boxrec?branch=master) [![dependencies Status](https://david-dm.org/boxing/boxrec/status.svg)](https://david-dm.org/boxing/boxrec) [![devDependencies Status](https://david-dm.org/boxing/boxrec/dev-status.svg)](https://david-dm.org/boxing/boxrec?type=dev) [![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1643/badge)](https://bestpractices.coreinfrastructure.org/projects/1643) [![npm version](https://badge.fury.io/js/boxrec.svg)](https://badge.fury.io/js/boxrec)

This project allows you to query information from [BoxRec](http://boxrec.com) and return it in JSON format.
The purpose of this project is to act as an API for BoxRec.

## Installation

This project is written in [Node](http://nodejs.org).

`yarn add boxrec -D`

or

`npm install boxrec --save-dev`

## Usage
`
const boxrec = require("boxrec");
`

## How to contribute

[Details on how to help can be found here](https://github.com/boxing/boxrec/blob/master/CONTRIBUTING.md)

## Methods (How to use)

### [login](https://boxing.github.io/boxrec/classes/boxrec.html#login)
##### logs the user into BoxRec
To use this properly, it requires a login to BoxRec.  BoxRec supplies additional information when logged in
Note: BoxRec does not support HTTPS

```javascript
boxrec.login(username, password)
.then(() => {
    // successfully logged in
})
.catch(error => {});
```

### [getPersonById](https://boxing.github.io/boxrec/classes/boxrec.html#getpersonbyid)
##### Get profile by BoxRec ID
Using the BoxRec Global ID, retrieve all information about a person.

[Output:](https://boxing.github.io/boxrec/interfaces/boxrecprofile.html)
```javascript
boxrec.getPersonById(356831)
.then(boxer => {
    console.log(boxer.name); // Gennady Golovkin
    console.log(boxer.division); // middleweight
    console.log(boxer.titlesHeld); // currently held titles [International Boxing Organization World Middleweight Title, ...];
    console.log(boxer.otherInfo); // other info that couldn't be categorized
    console.log(boxer.bouts); // list of bouts
    console.log(boxer.suspended); // will tell if boxer is currently suspended
    console.log(boxer.bouts[37].opponent.name); // Saul Alvarez
});

boxrec.getPersonById(401615, "judge"); // judge CJ Ross
```

### [getPersonByName](https://boxing.github.io/boxrec/classes/boxrec.html#getpersonbyname)
##### Search People on BoxRec by name
Returns the same object as `getPersonById`

[Output:](https://boxing.github.io/boxrec/interfaces/boxrecprofile.html)
```javascript
// by default it picks active/inactive boxers
const floyds = await boxrec.getPersonByName("Floyd", "Mayweather");
let boxer = await floyds.next();
console.log(boxer.value); // is Floyd Mayweather Sr. object

boxer = await floyds.next();
console.log(boxer.value); // is Floyd Mayweather Jr. object
```

### [search](https://boxing.github.io/boxrec/classes/boxrec.html#search)
##### Search boxers by name
Following BoxRec's form format

```javascript
boxrec.search({
    first_name: "Floyd",
    last_name: "Mayweather",
}).then(searchResults => console.log(searchResults[1]));
```    

[Output:](https://boxing.github.io/boxrec/interfaces/boxrecsearch.html)
```javascript
    {
        id: 352,
        name: 'Floyd Mayweather Jr',
        alias: 'Money / Pretty Boy',
        record: {
            draw: 0,
            loss: 0,
            win: 50
        },
        last6: ['win', 'win', 'win', 'win', 'win', 'win'],
        division: 'welterweight',
        career: [1996, 2017],
        residence: {
            id: 20388,
            town: 'Las Vegas',
            region: 'NV',
            country: 'US'
        }
    }
});
```

### [getChampions](https://boxing.github.io/boxrec/classes/boxrec.html#getchampions)
##### Returns a list of champions

[Output:](https://boxing.github.io/boxrec/classes/boxrecpagechampions.html)
```javascript
boxrec.getChampions()
.then(champions => {
    champions.getByWeightClass().heavyweight.IBF; // Anthony Joshua
});
```

### [getEventById](https://boxing.github.io/boxrec/classes/boxrec.html#geteventbyid)
##### Returns event information

```javascript
boxrec.getEventById(751017)
.then(event => console.log(event));
```

[Output:](https://boxing.github.io/boxrec/interfaces/boxrecevent.html)
```javascript
{ date: '2017-09-16',
  commission: 'Nevada Athletic Commission',
  matchmaker:
   [ { id: 422440, name: 'Alex Camponovo' },
     { id: 500179, name: 'Roberto Diaz' },
     { id: 495527, name: 'Tom Loeffler' } ],
  location:
   { location: { town: 'Las Vegas', id: 20388, region: 'Nevada', country: 'USA' },
     venue: { id: 246559, name: 'T-Mobile Arena' } },
  promoter:
   [ { id: 8253,
       company: 'Golden Boy Promotions',
       name: 'Oscar De La Hoya' },
     { id: 495527, company: 'K2 Promotions', name: 'Tom Loeffler' },
     { id: 413083, company: 'Banner Promotions', name: 'Art Pelullo' } ],
  television:
   [ 'USA HBO PPV',
     'Latin America: Canal Space',
     'Panama RPC Channel 4',
     'Australia Main Event',
     'Mexico Televisa' ],
  bouts:
   [ { firstBoxer: [Object],
       firstBoxerLast6: [Array],
       firstBoxerRecord: [Object],
       firstBoxerWeight: 160,
       secondBoxer: [Object],
       secondBoxerLast6: [Array],
       secondBoxerRecord: [Object],
       secondBoxerWeight: 160,
       titles: [Array],
       referee: [Object],
       judges: [Array],
       rating: 100,
       result: [Array],
       links: [Object],
...
```

### [getRatings](https://boxing.github.io/boxrec/classes/boxrec.html#getratings)
##### Get ratings
Following BoxRec's form format

```javascript
boxrec.getRatings({
    division: "Welterweight",
    sex: "M",
    status: "a"
}).then(ratings => console.log(ratings[1]));
```

[Output:](https://boxing.github.io/boxrec/classes/boxrecpageratings.html)
```javascript
    {
        id: 629465,
        name: 'Errol Spence Jr',
        points: 555,
        rating: 100,
        age: 28,
        record: {
            draw: 0,
            loss: 0,
            win: 23
        },
        last6: ['win', 'win', 'win', 'win', 'win', 'win'],
        stance: 'southpaw',
        residence: {
            id: 43387,
            town: 'Desoto',
            region: 'TX',
            country: 'US'
        },
        division: null
    };
```

## Documentation

[Additional documentation](https://boxing.github.io/boxrec)

## Note
Not affiliated with the website [BoxRec](http://www.boxrec.com)
