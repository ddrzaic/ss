import { fetchComments } from "@/helpers/fetching";
import { Comment } from "@/types/common";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  comments?: Comment[];
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const storyId = Number(req.query.storyId);
    const comments: Comment[] = await fetchComments(storyId);

    res.status(200).json({ comments });
  } catch (err) {
    res.status(500).json({ error: (err as any).message });
  }
}
