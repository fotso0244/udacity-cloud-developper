import express from 'express';
require('dotenv').config({ path: './envar.env' });
import bodyParser from 'body-parser';
import { IndexRouter } from './controllers/v0/index.router';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  /**************************************************************************** */

  //! END @TODO1
  //CORS Should be restricted
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/', IndexRouter)

  // Root Endpoint
  // Displays a simple message to the user
  //app.get( "/", async ( req: Request, res: Response ) => {
  //  res.send("try GET /filteredimage?image_url={{}}")
  //} );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();