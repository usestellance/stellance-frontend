'use client";';
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Cards from "./Cards";
import { aboutStellance } from "../../../../utils/contents";

const SplideSlider = () => {
  return (
    <div className="w-full mx-auto py-6">
      <Splide
        options={{
          type: "loop",
          perPage: 2,
          perMove: 1,
          gap: 32,
          arrows: false,
          autoplay: true,
          pauseOnHover: true,
          // padding: "10px",
          breakpoints: {
            700: {
              perPage: 1,
            },
          },
        }}
        aria-label="My Favorite Images"
      >
        {aboutStellance.map((c, i) => (
          <SplideSlide key={i}>
            <Cards
              description={c.description}
              title={c.title}
              gradient={c.gradient}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SplideSlider;
