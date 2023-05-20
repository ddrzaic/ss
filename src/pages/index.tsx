import { Header } from "@/components/Header/Header";
import { StoryCardProps } from "@/components/StoryCard/StoryCard";
import { HomePage } from "@/views/Home/Home";
import { GetServerSideProps } from "next";
import Head from "next/head";

type HomePageProps = {
  storyCards: StoryCardProps[];
};

export default function Home({ storyCards }: HomePageProps) {
  return (
    <>
      <Head>
        <title>ShareStory</title>
        <meta name="description" content="Story sharing site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomePage storyCards={storyCards} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  const storyCards: StoryCardProps[] = [
    {
      id: 1,
      title: "Story 1Story 1Story 1Story 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Action",
      author: "Author 1",
      date: "2021-10-10",
      isFavorite: false,
    },
    {
      id: 2,
      title: "Story 2",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Category 2",
      author: "Author 2",
      date: "2021-10-10",
      isFavorite: true,
    },
    {
      id: 3,
      title: "Story 3",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Category 1",
      author: "Author 1",
      date: "2021-10-10",
      isFavorite: false,
    },
    {
      id: 4,
      title: "Story 4",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Category 2",
      author: "Author 2",
      date: "2021-10-10",
      isFavorite: true,
    },
    {
      id: 5,
      title: "Story 5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Category 1",
      author: "Author 1",
      date: "2021-10-10",
      isFavorite: false,
    },
    {
      id: 6,
      title: "Story 6",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Category 2",
      author: "Author 2",
      date: "2021-10-10",
      isFavorite: true,
    },
  ];

  return {
    props: {
      storyCards,
    },
  };
};
