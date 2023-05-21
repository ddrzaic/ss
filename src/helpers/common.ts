import { StoryCardProps } from "@/components/StoryCard/StoryCard";
import { DateTime, Filters, Story } from "@/types/common";

export const mapStoryToStoryCard = (story: Story): StoryCardProps => {
  return {
    id: story.id,
    title: story.title,
    content: story.shortened,
    category: story.category.label,
    author: story.author,
    date: story.date,
    isFavorite: story.isFavorite,
  };
};

export const formatDateTime = (timestamp: string): DateTime => {
  const date = new Date(timestamp);
  // add 2 hours to the date object
  date.setHours(date.getHours() + 2);

  const formattedDate = date.toLocaleDateString("hr-HR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("hr-HR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export function setCookie(
  cname: string,
  cvalue: string | number,
  exdays: number
) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname: string, cookies?: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(cookies ?? document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
