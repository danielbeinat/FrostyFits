// Import Swiper React components
import { Slider } from "./Main/Slider/Slider";
import { Service } from "./Main/Service/Service";
import { Collections } from "./Main/Collections/Collections";
import { News } from "./Main/News/News";
import { Feature } from "./Main/Feature/Feature";

export const Main = () => {
  return (
    <>
      <main>
        <Slider />
        <Service />
        <Collections />
        <News />
        <Feature />
      </main>
    </>
  );
};
