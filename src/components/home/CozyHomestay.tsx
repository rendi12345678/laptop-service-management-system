"use client"
import Image from 'next/image';
import BaseContainer from "@/components/BaseContainer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample data for multiple homestays
const homestays = [
  {
    title: "Bulan Bali",
    description: "Located a 15-minute walk from Monkey Forest Ubud, Bulan Bali Homestay offers a peaceful and comfortable retreat with easy access to local attractions and nature.",
    images: [
      "/images/bulan-bali.jpg",
      "/images/bulan-bali-2.jpg",
      "/images/bulan-bali-3.jpg",
    ],
    details: {
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
    },
  },
  {
    title: "Tranquil Haven",
    description: "Experience tranquility in the heart of Bali at Tranquil Haven, surrounded by lush greenery and peaceful views.",
    images: [
      "/images/tranquil-haven.jpg",
      "/images/tranquil-haven-2.jpg",
    ],
    details: {
      guests: 3,
      bedrooms: 1,
      bathrooms: 1,
    },
  },
];

const CozyHomestay = () => {
  return (
    <BaseContainer>
      <h2 className="mb-5 max-w-[18ch]">Relax and Unwind in Our Cozy Homestay</h2>
      <Carousel className="w-full max-w-lg mx-auto">
        <CarouselContent>
          {homestays.map((homestay, index) => (
            <CarouselItem key={index}>
              <div className="space-y-6">
                {/* Display only the first image */}
                <div className="relative h-64 w-full mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={homestay.images[0]} // Only the first image
                    alt={`${homestay.title} Image`}
                    layout="fill"
                    className="object-cover rounded-lg"
                  />
                </div>
                {/* Homestay Description and Details */}
                <div className="space-y-4">
                  <h3>{homestay.title}</h3>
                  <p className="line-clamp-2 text-gray-600">{homestay.description}</p>
                  <span className="block h-[1.6px] w-full bg-muted-foreground opacity-20 my-4"></span>
                  <ul className="list-none list-inside flex gap-4 text-gray-500">
                    <li>{homestay.details.guests} Guests</li>
                    <li>{homestay.details.bedrooms} Bedrooms</li>
                    <li>{homestay.details.bathrooms} Bathrooms</li>
                  </ul>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Controls */}
        <div className="hidden md:block">
          <CarouselPrevious />
        </div>
        <div className="hidden md:block">
          <CarouselNext />
        </div>
      </Carousel>
    </BaseContainer>
  );
};

export default CozyHomestay;
