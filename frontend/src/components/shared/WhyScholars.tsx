import {
  BookOpen,
  ClipboardCheck,
  Globe,
  Laptop,
  MessageCircle,
  Music,
} from "lucide-react";

const features = [
  {
    title: "Japanese ooooo Method of Education",
    description:
      "For the first time in Pithoragarh, The Scholar’s Academy introduces a Japanese model based on stimulating children's brains according to developmental age.",
    icon: Globe,
  },
  {
    title: "Introduction to Vedic Culture & Education",
    description:
      "We blend the best of Vedic wisdom with modern education to build character, values and clarity.",
    icon: BookOpen,
  },
  {
    title: "Online Smart Classes",
    description:
      "Interactive smart classes that leave behind rote textbook learning and make concepts come alive.",
    icon: Laptop,
  },
  {
    title: "Communication & Personality Development",
    description:
      "Grooming not just learners, but confident leaders for tomorrow through communication and soft skills.",
    icon: MessageCircle,
  },
  {
    title: "Music, Dance & Cooking",
    description:
      "Expanding horizons beyond academics and nurturing practical hobbies, interests and talents.",
    icon: Music,
  },
  {
    title: "Daily Tracking & Reporting",
    description:
      "A structured daily tracking system for every single student — because feedback fuels improvement.",
    icon: ClipboardCheck,
  },
];

export function WhyScholars() {
  return (
    <section className="bg-white py-12 sm:py-16" id="about-us">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Why The Scholar’s Academy
          </h2>
          <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-indigo-500 via-slate-400 to-amber-400"></div>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A school experience where modern pedagogy, culture, technology and
            personal attention come together.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-100 bg-slate-50/80 p-5 shadow-sm hover:shadow-lg hover:border-indigo-100 transition transform hover:-translate-y-1"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
