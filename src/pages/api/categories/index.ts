import { fetchCategories } from "@/helpers/fetching";
import { Category } from "@/types/common";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  categories: Category[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories: Category[] = await fetchCategories();
  res.status(200).json({ categories });
}
