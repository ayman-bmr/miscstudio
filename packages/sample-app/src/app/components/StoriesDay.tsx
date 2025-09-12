import { Box, Skeleton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import StoryCard from "./StoryCard";
import { useStoriesOfTheDay } from "@repo/providers/queryHooks/useStoriesOfTheDay";

const StoriesDay: React.FC = () => {
  const { data: stories, isLoading } = useStoriesOfTheDay();
  const settings = {
    infinite: false,

    responsive: [
      {
        breakpoint: 3000, // Extra large screens
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024, // Desktop
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // Tablet/Landscape phone
        settings: {
          slidesToShow:2 ,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // Portrait phone
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          className: "center",
          centerPadding: "30px",
          speed: 500,
        }
      }
    ]
  };

  if (isLoading)
    return (
      <Skeleton
        variant="rounded"
        sx={{
          display: 'block',
          width: '80%',
          paddingTop: '80%',
          height: 0,
          borderRadius: '32px',
          margin: '16px auto',
        }}
      />
    );

  return (
    <Box className="slider-container">
      <Slider {...settings}>
        {stories?.map((story: any) => (
          <Box key={story.id} sx={{ margin: 3 }}>
            <StoryCard
              title={story.title}
              id={story.id}
              description={story.description}
              coverImgUrl={story.cover_img_url}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default StoriesDay;
