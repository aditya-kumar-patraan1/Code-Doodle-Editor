import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      type: "spring",
      bounce: 0.3,
    },
  },
};

const Features = ({ isLightMode, setisLightMode }) => {
  // Function to highlight specific words with underline and yellow color
  const highlightText = (text) => {
    const keywords = [
      "Real-Time",
      "Room ID",
      "Built-In",
      "Seamless",
      "Instantly",
      "Live",
      "Share",
    ];
    let highlightedText = text;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        isLightMode
          ? `<span class="text-yellow-500 underline font-semibold">${keyword}</span>`
          : `<span class="text-green-700 underline font-semibold">${keyword}</span>`
      );
    });

    return highlightedText;
  };

  return (
    <section
      id="features"
      className={`py-20 ${isLightMode ? "bg-white" : "bg-black"}`}
    >
      <div className="container mx-auto text-center px-4">
        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-4xl font-bold mb-12 ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Our Features
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              title: "Real-Time Code Collaboration",
              desc: "Work with teammates or friends instantly in a shared code editor. See changes live as you type, with seamless synchronization and zero delay.",
            },
            {
              title: "Room-Based Sharing",
              desc: "Create or join a session using a unique Room ID. It's simple, secure, and perfect for quick pair programming, live code reviews, or tutoring.",
            },
            {
              title: "Built-In Chat for Seamless Communication",
              desc: "Discuss code, ask questions, or coordinate changes using the integrated real-time chat. Stay on the same page while coding together.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`${
                isLightMode ? "bg-white" : "bg-gray-900 border border-green-400"
              } p-6 rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform 
hover:scale-150 hover:shadow-2xl hover:bg-slate-100 cursor-pointer
`}
              initial="offscreen"
              whileInView="onscreen"
              variants={cardVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h4
                className={`text-xl font-semibold mb-3 ${
                  isLightMode ? "text-gray-800" : "text-green-400"
                }`}
              >
                {feature.title}
              </h4>
              <p
                className="text-gray-600 text-sm"
                dangerouslySetInnerHTML={{
                  __html: highlightText(feature.desc),
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
