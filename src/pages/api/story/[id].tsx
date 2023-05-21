import { fetchStory } from "@/helpers/fetching";
import { Story } from "@/types/common";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  story?: Story;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { id } = req.query;
    const storyId = parseInt(id as string);
    const story = await fetchStory(storyId);

    res.status(200).json({ story });
  } catch (error) {
    res.status(500).json({ error });
  }
}
