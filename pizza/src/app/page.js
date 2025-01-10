import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu"
import SectionHeader from "@/components/layout/SectionHeaders";
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 ">
        <SectionHeader subHeader={'Our Story'} mainHeader={'About us'}/>
        <div className=" text-gray-500 max-w-md  mx-auto mt-4 flex flex-col gap-4">
            <p className="">
              lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.

            </p>
            <p className="">
              lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
            <p>
               lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
        </div>
      </section>

      <section className="text-center my-8">
        <SectionHeader subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
        <div className="mt-8">
           <a  className="text-4xl underline text-gray-500" href="tel:+91 8668609621">+91 8668609621</a>
        </div>
      </section>
     
    </>
  );
}
