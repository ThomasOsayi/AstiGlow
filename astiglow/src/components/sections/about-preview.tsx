import Image from "next/image";
import Link from "next/link";
import { Button, SectionHeader } from "@/components/ui";

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-[120px] px-6 md:px-12 lg:px-20 bg-cream grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Image Side */}
      <div className="relative">
        <div className="w-full lg:w-[80%] aspect-[4/5] bg-cream-dark rounded-tr-[60px] lg:rounded-tr-[80px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&q=80"
            alt="Serene spa environment"
            fill
            className="object-cover"
          />
        </div>

        {/* Decorative border element - positioned better */}
        <div 
          className="hidden lg:block absolute -bottom-5 right-0 w-[180px] h-[180px] rounded-bl-[60px] pointer-events-none"
          style={{ border: "1px solid #C4A484" }}
        />
      </div>

      {/* Content Side */}
      <div className="lg:pl-4">
        <SectionHeader title="Meet Aster" className="mb-8" />

        <p className="text-base text-charcoal-light leading-[1.9] mb-6">
          Hi, I'm Aster, the founder of Astiglow. With over four years of
          experience in the waxing industry, I've dedicated my career to helping
          clients feel confident and comfortable in their own skin.
        </p>

        <p className="text-base text-charcoal-light leading-[1.9] mb-10">
          I specialize in using high-quality hard wax that's gentle on the skin
          and perfect for even the most sensitive areas. My goal is to create a
          clean, welcoming, and relaxing space where every client leaves feeling
          smooth, refreshed, and glowing.
        </p>

        <Link href="/about">
          <Button variant="secondary">Learn More</Button>
        </Link>
      </div>
    </section>
  );
}