import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu"
import SectionHeader from "@/components/layout/SectionHeaders";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 " id="about">
        <SectionHeader subHeader={'Our Story'} mainHeader={'About us'}/>
        <div className=" text-gray-500 max-w-3xl  mx-auto mt-4 flex flex-col gap-4">
            <p className="">
            Welcome to FUSION FEAST, where flavors come alive! We bring you a delightful fusion of taste, ambiance, and hospitality, crafting a dining experience like no other. Our menu is carefully curated with fresh ingredients, bold spices, and creative culinary techniques to satisfy every craving.
            Step into a warm and inviting space, where the aroma of sizzling dishes fills the air, and every meal is made with passion. Whether you're here for a quick bite, a family gathering, or a cozy dinner, we promise delicious flavors and unforgettable moments.
            Indulge in a variety of dishes, from rich and creamy pastas to zesty wraps, sizzling burgers, and crispy delights. Every bite is a burst of flavor, bringing you comfort and joy. Join us and experience the magic of great food!

            </p>
            <p className="">
            From indulgent pastas and sizzling pizzas to hearty burgers and refreshing beverages, we serve a variety of mouthwatering delights. The cozy ambiance, paired with our warm hospitality, makes every visit a memorable experience.
            </p>
            <p>
            Whether you're dining with friends, family, or enjoying a solo treat, we promise an unforgettable culinary journey. Come savor the flavors, enjoy the vibe, and let every meal be a celebration of taste!
             </p>
        </div>
      </section>

      <section className="text-center my-8" id="contact">
        <SectionHeader subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
        <div className="mt-8">
           <a  className="text-4xl underline text-gray-500" href="tel:+91 8668609621">+91 8668609621</a>
        </div>
      </section>
     
    </>
  );
}
