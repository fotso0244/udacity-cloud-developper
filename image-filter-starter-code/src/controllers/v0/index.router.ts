import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';
import { AuthRouter } from './users/routes/auth.router';

const router: Router = Router();

router.use('/feed', FeedRouter);
router.use('/user', AuthRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;