import {
  addComment,
  checkToken,
  deleteComment,
  editComment,
} from "@/helpers/fetching";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      try {
        const { userId, storyId, content, jwt } = req.body;
        const isAuthenticated = await checkToken(userId, jwt);
        if (!isAuthenticated) {
          res.status(401).end();
          return;
        }

        console.log("userId", userId);
        console.log("storyId", storyId);
        console.log("content", content);

        await addComment(userId, storyId, content);

        res.status(200).end();
      } catch (err) {
        res.status(500).json({ error: (err as any).message });
      }
      break;
    case "PATCH":
      try {
        const { id, content, jwt, userId } = req.body;
        const isAuthenticated = await checkToken(Number(userId), jwt as string);
        if (!isAuthenticated) {
          res.status(401).end();
          return;
        }

        await editComment(Number(id), content);
        res.status(200).end();
      } catch (err) {
        res.status(500).json({ error: (err as any).message });
      }

      break;
    case "DELETE":
      try {
        const { id, jwt, userId } = req.query;
        const isAuthenticated = await checkToken(Number(userId), jwt as string);
        if (!isAuthenticated) {
          res.status(401).end();
          return;
        }

        await deleteComment(Number(id));
        res.status(200).end();
      } catch (err) {
        res.status(500).json({ error: (err as any).message });
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
