import { Comment, Story } from "@/types/common";
import { StoryPage as StoryPageComponent } from "@/views/Story/Story";
import { GetServerSideProps } from "next";
import React from "react";

type StoryPageProps = {
  story: Story;
};

export const StoryPage = ({ story }: StoryPageProps) => {
  return <StoryPageComponent story={story}></StoryPageComponent>;
};

export const getServerSideProps: GetServerSideProps<StoryPageProps> = async (
  context
) => {
  console.log(context.params?.id);

  const story = {
    id: 1,
    title: "Naslov Priče",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo a diam sollicitudin tempor. At volutpat diam ut venenatis tellus. Fames ac turpis egestas integer. Pellentesque habitant morbi tristique senectus et netus et malesuada. Quis hendrerit dolor magna eget est. Nisl suscipit adipiscing bibendum est ultricies. Luctus accumsan tortor posuere ac ut. Mattis pellentesque id nibh tortor id aliquet lectus. Enim neque volutpat ac tincidunt vitae semper.

    Augue lacus viverra vitae congue eu. Arcu odio ut sem nulla pharetra diam. Volutpat blandit aliquam etiam erat. Porttitor eget dolor morbi non arcu risus quis varius. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Pellentesque habitant morbi tristique senectus et netus. Justo laoreet sit amet cursus sit. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Libero justo laoreet sit amet cursus sit amet dictum sit. Senectus et netus et malesuada fames.
    
    Molestie at elementum eu facilisis sed odio morbi quis. Nunc lobortis mattis aliquam faucibus purus. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Non quam lacus suspendisse faucibus interdum. Aliquet enim tortor at auctor. Nibh tortor id aliquet lectus proin. A cras semper auctor neque vitae tempus quam. Eu mi bibendum neque egestas congue. Ut aliquam purus sit amet luctus venenatis lectus. Eget aliquet nibh praesent tristique magna sit. Pellentesque habitant morbi tristique senectus. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Mi proin sed libero enim sed faucibus turpis in eu. Convallis tellus id interdum velit laoreet id donec. Tellus orci ac auctor augue mauris augue. Semper viverra nam libero justo laoreet sit amet. Placerat vestibulum lectus mauris ultrices eros in cursus turpis. Habitant morbi tristique senectus et netus et malesuada fames.
    
    Velit scelerisque in dictum non consectetur a erat nam. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Ultrices vitae auctor eu augue. Mauris nunc congue nisi vitae suscipit. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Mauris ultrices eros in cursus turpis massa. Arcu ac tortor dignissim convallis aenean et. Tempus egestas sed sed risus.
    
    Sem et tortor consequat id porta. Iaculis nunc sed augue lacus viverra vitae congue eu. Consectetur libero id faucibus nisl tincidunt eget nullam non nisi. Faucibus pulvinar elementum integer enim neque volutpat. Cursus turpis massa tincidunt dui ut ornare lectus. Est pellentesque elit ullamcorper dignissim. Fringilla ut morbi tincidunt augue interdum velit euismod. Elementum pulvinar etiam non quam. Ultrices tincidunt arcu non sodales neque sodales ut etiam sit. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Mi proin sed libero enim sed faucibus turpis in eu. Mauris sit amet massa vitae tortor. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Nisi est sit amet facilisis magna. Ut pharetra sit amet aliquam id diam maecenas.`,
    category: {
      id: 1,
      label: "Žanr",
    },
    author: "autor",
    date: "2021-10-10",
    isFavorite: true,
    comments: [
      {
        id: 1,
        timestamp: "2021-10-10",
        content: "komentar",
      },
      {
        id: 2,
        timestamp: "2021-10-10",
        content: "komentar 2",
      },
    ],
  };

  return {
    props: {
      story,
    },
  };
};

export default StoryPage;
