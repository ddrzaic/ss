// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchStories } from "@/helpers/fetching";
import { Filters, Story } from "@/types/common";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  stories: Story[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req;

  const name = query.name as string;
  const category = query.category ? (query.category as string) : undefined;

  const filters: Filters = {};

  if (name) {
    filters.name = name;
  }

  if (category) {
    filters.category = {
      id: parseInt(category),
      label: category,
    };
  }

  const stories = await fetchStories(filters);

  res.status(200).json({ stories });
}
