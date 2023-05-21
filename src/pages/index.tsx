import { Header } from "@/components/Header/Header";
import { StoryCardProps } from "@/components/StoryCard/StoryCard";
import { mapStoryToStoryCard } from "@/helpers/common";
import { fetchStories } from "@/helpers/fetching";
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
  const stories = await fetchStories({});
  const storyCards: StoryCardProps[] = stories.map((story) => {
    return mapStoryToStoryCard(story);
  });

  return {
    props: {
      storyCards,
    },
  };
};
