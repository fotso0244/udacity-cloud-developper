import { Router, Request, Response } from 'express';
import { requireAuth } from '../../users/routes/auth.router';
import {cropImage} from '../../../../process_images/cropImage';
import {resizeImage} from '../../../../process_images/resizeImage';
import {deleteLocalFiles} from '../../../../util/util';

const router: Router = Router();

// Get all feed items
router.get( "/", async ( req, res ) => {
    res.send( "try GET /filteredimage?image_url={{}}" );
  } );
//router.get('/', async (req: Request, res: Response) => {
    
   // res.send("Welcome on this project");
//});

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  router.get( "/filteredimage", 
          requireAuth,
          async ( req: Request, res: Response ) => {
    let { image_url } = req.query;
    if ( !image_url ) {
      return res.status(400)
                .send(`image url is required`);
    }
//try to filter the image
const imgresize = await resizeImage(image_url);
const imgfilter = await cropImage(imgresize);
//test if error
if(!imgfilter) {
  return res.status(422)
                .send(`cannot process image_url`);
}
//send resulting file in response and delete local files on finish
    return res.status(200)
              .sendFile(imgfilter, function (err) {
                if(!err) {
                  deleteLocalFiles([imgresize, imgfilter])
                }
              });
  } );


export const FeedRouter: Router = router;