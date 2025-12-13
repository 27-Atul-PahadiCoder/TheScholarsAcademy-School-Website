
export function ClubsSocieties() {
  const clubs = {
    title: "Debate Society",
    description:
      "The Debate Society encourages students to develop their critical thinking, public speaking, and argumentation skills. Members participate in local and national competitions and engage in debates on a variety of topics.",
    buttonText: "Join the Debate",
    backgroundImage: "/images/PhotoMomemts/IMG_20230811_1241322-300x225.jpg",
    galleryImages: [
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
    ],
  };

  const technologyClub = {
    title: "Technology Club",
    description:
      "The Technology Club brings together students with a passion for innovation. From coding workshops to robotics challenges, members have opportunities to explore new technologies and work on projects that combine creativity and technical skills.",
    buttonText: "Explore Technology",
    backgroundImage: "/images/PhotoMomemts/IMG_20230811_1241322-300x225.jpg",
    galleryImages: [
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
      "/images/PhotoMomemts/P1050793-scaled.jpg",
    ],
  };

  const mosaicPhotos = [
    "/images/PhotoMomemts/P1050793-scaled.jpg",
    "/images/PhotoMomemts/P1050793-300x169.jpg",
  ];

  const ProgramSection = ({
    title,
    description,
    buttonText,
    backgroundImage,
    galleryImages,
  }: any) => {
    return (
      <div className="w-full mb-20">
        {/* Hero Section */}
        <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden p-6">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex items-center justify-center px-6">
            <div className="text-center text-white max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
              <p className="mb-6 text-sm md:text-base leading-relaxed opacity-90">
                {description}
              </p>
              <button className="bg-white text-black px-8 py-2 rounded-full hover:bg-gray-200 transition-all shadow-md">
                {buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 h-[220px] md:h-[260px] lg:h-[280px] px-4">
          {galleryImages.map((image: string, index: number) => (
            <div key={index} className="relative overflow-hidden p-2">
              <img
                src={image}
                alt={`${title} gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="clubs-societies" className="py-20 bg-white">
      <div className="container max-w-5xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Clubs & Societies
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Student clubs and societies provide avenues for exploring interests,
          developing leadership skills, and building friendships. We offer a
          wide range of clubs including debate society, science club,
          environmental club, technology club, and many more. These
          organizations enrich school life and foster peer learning.
        </p>
      </div>

      {/* Program Sections */}
      <ProgramSection {...clubs} />

      {/* Modern Photo/Testimonial Mosaic (full-width) */}
      <div className="w-full mt-6 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: testimonial card with full-cover background image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md text-white">
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              alt="John Dale"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/60" />
            <div className="relative p-6 flex flex-col justify-between h-full">
              <div>
                <div className="text-xs opacity-80 mb-2">Review</div>
                <h3 className="text-3xl font-extrabold mb-3">Easy</h3>
                <p className="text-sm leading-relaxed mb-6">
                  I never thought Holiday booking is that easy, thanks for
                  Holidayout.
                </p>
              </div>
              <div className="text-sm opacity-80">John Dale</div>
            </div>
          </div>

          {/* Middle: large image with overlay quote */}
          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={mosaicPhotos[0]}
              alt="mosaic-1"
              className="w-full h-full object-cover block"
              style={{ height: 360 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute left-6 bottom-6 text-white max-w-xs">
              <h4 className="text-xl font-bold mb-2">
                "Thanks to the program, I was able to create lifelong memories"
              </h4>
              <div className="text-sm opacity-90">— Cynthia Morgan</div>
            </div>
          </div>

          {/* Right column: two stacked tiles */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <img
                src={mosaicPhotos[1]}
                alt="mosaic-2"
                className="w-full h-48 object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              <div className="absolute left-4 bottom-4 text-white">
                <h5 className="text-lg font-semibold">
                  "It's easy to make holiday even for 6 hours"
                </h5>
                <div className="text-xs opacity-90">— Steven Sunny</div>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-900 text-white p-5 shadow-md flex flex-col justify-between">
              <div className="text-xs opacity-80 mb-3">Review</div>
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Holidayout.com provided me with a wealth of information
                </h4>
                <div className="text-sm opacity-90">— John Dale</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {/* Image 1 */}
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              alt="Gallery 1"
              className="w-full h-40 rounded-lg object-cover"
            />
            {/* Image 2 */}
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              alt="Gallery 2"
              className="w-full h-40 rounded-lg object-cover"
            />
            {/* Image 3 */}
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              alt="Gallery 3"
              className="w-full h-40 rounded-lg object-cover"
            />
            {/* Image 4 */}
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              alt="Gallery 4"
              className="w-full h-40 rounded-lg object-cover"
            />
            {/* Image 5 */}
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              className="w-full h-40 rounded-lg object-cover"
            />
            {/* Image 6 */}
            <img
              src="/images/PhotoMomemts/P1050793-scaled.jpg"
              alt="Gallery 6"
              className="w-full h-40 rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      <ProgramSection {...technologyClub} />
      {/* CTA strip below mosaic */}
      <div className="mt-8 rounded-2xl bg-gray-50 border border-slate-100 p-6 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-xl font-bold text-gray-900">Want more photos?</h4>
          <p className="text-sm text-gray-600">
            Explore the full Clubs & Societies gallery for events, workshops,
            and performances.
          </p>
        </div>
        <div>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            View Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
