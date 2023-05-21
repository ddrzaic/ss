// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  addFavorite,
  checkToken,
  deleteFavorite,
  fetchFavorites,
} from "@/helpers/fetching";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  favorites: number[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = parseInt(req.query.userId as string);
  let storyId = null;
  let jwt = null;

  switch (req.method) {
    case "GET":
      const favorites = await fetchFavorites(userId);
      res.status(200).json({ favorites });
      break;
    case "POST":
      try {
        storyId = parseInt(req.body.storyId as string);
        jwt = req.body.jwt as string;

        const isAuthorized = await checkToken(userId, jwt);

        if (!isAuthorized) {
          res.status(401).end();
          return;
        }

        if (storyId) {
          await addFavorite(userId, storyId);
          res.status(200).end();
        } else {
          res.status(400).end();
        }
      } catch (err) {
        console.log(err);
        res.status(400).end();
      }

      break;
    case "DELETE":
      try {
        storyId = parseInt(req.query.storyId as string);
        jwt = req.query.jwt as string;

        const isAuthorized = await checkToken(userId, jwt);

        if (!isAuthorized) {
          res.status(401).end();
          return;
        }

        if (storyId) {
          await deleteFavorite(userId, storyId);
          res.status(200).end();
        } else {
          res.status(400).end();
        }
      } catch (err) {
        console.log(err);
        res.status(400).end();
      }

      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}
