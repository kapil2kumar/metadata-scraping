# metadata-scraping

*METADATA SCRAPING FROM A GIVEN WEB PAGE URL*

You’re required to scrape an input URL and parse its metadata. If the page has OG parameters set exclusively, then you must return all the OG parameters. If they are not set, you
must parse the webpage to get relevant details such as title, description, images etc.

Details on OGP ( Open Graph Parameters ) can be found at: http://ogp.me/

## Installation

Installing this project is simple, run the following commands:

```console
$ npm install
$ node server.js or npm start
```
## Dependency
$ Node version must be >= 7 

## NPM Module
1. express
2. express-swagger-generator
3. morgan and winston ## for logging
4. node-cache ##for caching
5. node-fetch
6. page-metadata-parser
7. domino

Open in Browser
. http://localhost:3000/
. http://localhost:3000/api-docs