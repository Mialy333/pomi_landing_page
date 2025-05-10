import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(
        "https://pomi-landing-page-server.onrender.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email }),
        }
      );

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Error submitting form.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 text-gray-800 font-sans scroll-smooth">
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          {...fadeInUp}
          className="text-5xl font-bold text-indigo-700 mb-4"
        >
          Meet <span className="text-purple-600">Pomiya</span> 🐾
        </motion.h1>
        <motion.p
          {...fadeInUp}
          className="text-xl max-w-2xl text-gray-700 mb-8"
        >
          Your gamified financial buddy that makes money management fun, smart,
          and super Gen Z-friendly.
        </motion.p>
        <motion.img
          {...fadeInUp}
          src="/level1.png"
          alt="Pomiya"
          className="w-64"
        />
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-white">
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            The Problem
          </h2>
          <p className="text-lg text-gray-600">
            80% of students feel anxious about money. Budgeting apps are boring,
            complex, or hard to stick to.
          </p>
        </motion.div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6 bg-purple-50">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">
            Our Solution
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Pomiya transforms personal finance into a fun quest-based adventure.
            Grow your kawaii pet by completing real financial tasks.
          </p>
          <img
            src="/level1.png"
            alt="Pomiya Illustration"
            className="w-48 mx-auto"
          />
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <motion.div {...fadeInUp} className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-700 text-center mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center text-gray-700">
            <motion.div {...fadeInUp}>
              <div className="text-4xl">📱</div>
              <p className="mt-2">Sign up with your wallet</p>
            </motion.div>
            <motion.div {...fadeInUp}>
              <div className="text-4xl">🐾</div>
              <p className="mt-2">Pick your Finagotchi</p>
            </motion.div>
            <motion.div {...fadeInUp}>
              <div className="text-4xl">🎯</div>
              <p className="mt-2">Complete quests</p>
            </motion.div>
            <motion.div {...fadeInUp}>
              <div className="text-4xl">🏆</div>
              <p className="mt-2">Earn XP & rewards</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Value */}
      <section className="py-20 px-6 bg-purple-100">
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">
            Why It Works
          </h2>
          <div className="flex flex-wrap justify-center gap-8 text-lg text-gray-700">
            <div>🎮 Gamified Learning</div>
            <div>🔗 Web3 Wallet (Solana)</div>
            <div>🧠 AI Financial Coach</div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <motion.div {...fadeInUp} className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            Ready to raise your Finagotchi?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Join our beta now and start your financial adventure.
          </p>

          <AnimatePresence>
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row justify-center items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="p-3 rounded-xl border border-gray-300 w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  🚀 Join Beta
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="thankyou"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl text-purple-700 font-semibold mt-6"
              >
                🎉 Thank you for joining!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
