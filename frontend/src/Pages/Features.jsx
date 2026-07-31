import {
  ListTodo,
  Calendar,
  Clock,
  Target,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: <ListTodo size={36} />,
    title: "Manage Daily Tasks",
    description:
      "Create, edit, update, and delete your daily tasks with a clean and intuitive interface.",
  },
  {
    icon: <Calendar size={36} />,
    title: "Date-wise Planning",
    description:
      "Organize your tasks by date and keep track of your daily schedule effortlessly.",
  },
  {
    icon: <Clock size={36} />,
    title: "Save Time",
    description:
      "Plan your day efficiently and never miss important work or deadlines.",
  },
  {
    icon: <Target size={36} />,
    title: "Stay Focused",
    description:
      "Prioritize important tasks and complete them one by one without distractions.",
  },
  {
    icon: <ShieldCheck size={36} />,
    title: "Secure Account",
    description:
      "Your todos are protected with secure authentication, ensuring your data remains private.",
  },
  {
    icon: <Smartphone size={36} />,
    title: "Responsive Design",
    description:
      "Enjoy a seamless experience across desktop, tablet, and mobile devices.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-700">
            Powerful Features
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to organize your work, stay productive, and
            accomplish your goals—all in one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 mt-14 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-500 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition duration-300">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;