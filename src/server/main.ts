import express, { Application, Request, Response, Express, NextFunction } from 'express'
import ViteExpress from "vite-express";
import 'dotenv/config' // To read CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY
import { LooseAuthProp } from '@clerk/clerk-sdk-node'
import { clerkClient, requireAuth } from '@clerk/express'
import { fileURLToPath } from 'url';
import path from 'path';

const port = process.env.PORT || 3000

const app: Application = express()

declare global {
  namespace Express {
    interface Request extends LooseAuthProp { }
  }
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__dirname", __dirname);

app.set('view engine', 'ejs');
console.log("__dirname", __dirname)
app.set('views', path.join(__dirname, 'views'));

app.get(
  '/api/admin', 
  requireAuth({ signInUrl: '/sign-in' }), 
  async (req, res) => {
    const { userId } = req.auth
    if (!userId) return res.json('no userId')
    const user = await clerkClient.users.getUser(userId)
    return res.json({ user })
  }
)

app.get('/sign-in', (req, res) => {
  // Assuming you have a template engine installed and are using a Clerk JavaScript SDK on this page
  res.render('sign-in', {
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY
  })
})


ViteExpress.listen(app as Express, port as number, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
