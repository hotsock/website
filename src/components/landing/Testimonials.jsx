import React from "react";
import Wrapper from "../global/Wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const TESTIMONIALS = [
  {
    name: "John Doe",
    title: "X's Developer",
    image: "/img/logo.svg",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    name: "John Doe",
    image: "/img/logo.svg",
    title: "X's Developer",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    name: "John Doe",
    image: "/img/logo.svg",
    title: "X's Developer",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    image: "/img/logo.svg",
    name: "John Doe",
    title: "X's Developer",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
];

function Testimonials() {
  return (
    <Wrapper>
      <section className="my-12">
        <div className="text-center">
          <h1 className="text-3xl m-0  text-center lg:text-4xl">
            Testimonials
          </h1>
          <p className="mt-4 text-xl mb-8 ">What our customers say about us</p>
        </div>
        <main>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </main>
      </section>
    </Wrapper>
  );
}

const Card = ({ name, title, image, comment }) => {
  return (
    <div className="w-full bg-pink-50 dark:bg-slate-800 rounded-xl flex flex-col items-start  text-left pt-8 pb-6 mb-12 cursor-pointer px-6">
      <p>{`" ${comment} "`}</p>
      <div className="flex flex-row items-center space-x-4">
        <img src={image} alt={name} className="w-10 h-10 rounded-full" />
        <div className="">
          <h2 className="text-base font-semibold m-0">{name}</h2>
          <h3 className="text-slate-600 text-sm m-0 font-medium">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
