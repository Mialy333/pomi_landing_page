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
    const cleanedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(
        "https://pomi-landing-page-server.onrender.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanedEmail,
            source: "landing_page",
            campaign: "beta_launch",
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
        // Track conversion
        window.gtag("event", "conversion", {
          send_to: "AW-YOUR_CONVERSION_ID",
        });
      } else {
        throw new Error(data.message || "Subscription failed");
      }
    } catch (err) {
      alert(err.message || "Error submitting form. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 text-gray-800 font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="MoneyPet" className="h-10" />
            <span className="text-xl font-bold text-purple-600">MoneyPet</span>
          </div>
          <a
            href="#beta"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Join Beta
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-16">
        <motion.h1
          {...fadeInUp}
          className="text-5xl md:text-6xl font-bold text-indigo-700 mb-4"
        >
          Meet <span className="text-purple-600">MoneyPet</span> 🐉
        </motion.h1>
        <motion.p
          {...fadeInUp}
          className="text-xl md:text-2xl max-w-3xl text-gray-700 mb-8"
        >
          The Tamagotchi that transforms your real finances into a playful
          adventure
        </motion.p>
        <motion.div
          {...fadeInUp}
          className="relative w-64 h-64 md:w-80 md:h-80"
        >
          <img
            src="/pet-evolution.gif"
            alt="MoneyPet Evolution"
            className="w-full h-full object-contain"
          />
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-purple-200">
            <span className="text-purple-600 font-medium">
              Your financial buddy
            </span>
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="mt-12">
          <a
            href="#how-it-works"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            How it works
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-white" id="problem">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4">
              Financial Stress Is Crushing Students
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              82% of students experience money anxiety, yet traditional
              budgeting apps feel like homework
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div {...fadeInUp} className="bg-indigo-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">😫</div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Budgeting Sucks
              </h3>
              <p className="text-gray-600">
                Mint and YNAB have <strong>under 10% retention</strong> among
                Gen-Z users
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-purple-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="text-xl font-semibold text-purple-700 mb-2">
                Real Consequences
              </h3>
              <p className="text-gray-600">
                Poor money habits lead to <strong>34% dropout rates</strong>{" "}
                among college students
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-indigo-50 p-6 rounded-xl">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                We Need Fun
              </h3>
              <p className="text-gray-600">
                Gen-Z spends <strong>7x more time</strong> on games than
                budgeting
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6 bg-purple-50" id="solution">
        <motion.div {...fadeInUp} className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
              Meet Your Financial Tamagotchi
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
              MoneyPet turns real financial habits into a delightful game with
              evolving NFT companions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-2xl">🐣</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    Start with Your Pet Egg
                  </h3>
                  <p className="text-gray-600">
                    Connect your bank (or start manually) to hatch your unique
                    MoneyPet
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    Real-Time Reactions
                  </h3>
                  <p className="text-gray-600">
                    Your pet gets happy when you save, sick when you overspend
                    on Uber Eats
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    Evolve & Earn
                  </h3>
                  <p className="text-gray-600">
                    Complete quests to grow your pet and unlock{" "}
                    <strong>real rewards</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/app-screenshot.png"
                alt="MoneyPet App"
                className="rounded-xl shadow-xl border-8 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-white px-4 py-2 rounded-lg shadow-md border border-purple-200">
                <span className="text-purple-600 font-medium">
                  Try the demo →
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white" id="how-it-works">
        <motion.div {...fadeInUp} className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 text-center mb-16">
            How MoneyPet Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              {...fadeInUp}
              className="text-center p-6 bg-indigo-50 rounded-xl"
            >
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">
                Connect & Hatch
              </h3>
              <p className="text-gray-600">
                Link your bank (or start manually) to hatch your unique MoneyPet
                NFT
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="text-center p-6 bg-purple-50 rounded-xl"
            >
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">
                Play & Learn
              </h3>
              <p className="text-gray-600">
                Complete daily quests like "Save €5" or "Track 3 meals"
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="text-center p-6 bg-indigo-50 rounded-xl"
            >
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">
                Evolve & Earn
              </h3>
              <p className="text-gray-600">
                Grow your pet and earn $MONEY tokens for real rewards
              </p>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Web3 Meets Financial Education
              </h3>
              <p className="text-lg mb-6">
                Your MoneyPet is an evolving NFT that proves your financial
                skills on-chain
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <span className="bg-white bg-opacity-20 p-2 rounded-lg">
                    🔗
                  </span>
                  <span>Own your financial identity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-white bg-opacity-20 p-2 rounded-lg">
                    🎁
                  </span>
                  <span>Redeem tokens for real rewards</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-white bg-opacity-20 p-2 rounded-lg">
                    👥
                  </span>
                  <span>Mentor others & earn (scholarship model)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="bg-white bg-opacity-20 p-2 rounded-lg">
                    📜
                  </span>
                  <span>POAP badges for achievements</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Traction */}
      <section className="py-20 px-6 bg-purple-100">
        <motion.div {...fadeInUp} className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12">
            Our Journey So Far
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <p className="text-gray-700">Beta Testers</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                2.5x
              </div>
              <p className="text-gray-700">More Engagement</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
              <p className="text-gray-700">University Pilots</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-2">1</div>
              <p className="text-gray-700">Award-Winning Foundation</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-6 bg-white">
        <motion.div {...fadeInUp} className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 text-center mb-16">
            Our Roadmap
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-purple-400 to-indigo-600"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <div className="relative md:grid md:grid-cols-2 gap-8">
                <div className="md:text-right md:pr-8">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    Q3 2024
                  </h3>
                  <p className="text-gray-600">Closed Beta Launch</p>
                </div>
                <div className="hidden md:block"></div>
              </div>

              <div className="relative md:grid md:grid-cols-2 gap-8">
                <div className="hidden md:block"></div>
                <div className="md:text-left md:pl-8">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Q4 2024
                  </h3>
                  <p className="text-gray-600">NFT Pets + $MONEY Token</p>
                </div>
              </div>

              <div className="relative md:grid md:grid-cols-2 gap-8">
                <div className="md:text-right md:pr-8">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    Q1 2025
                  </h3>
                  <p className="text-gray-600">Open Banking Integration</p>
                </div>
                <div className="hidden md:block"></div>
              </div>

              <div className="relative md:grid md:grid-cols-2 gap-8">
                <div className="hidden md:block"></div>
                <div className="md:text-left md:pl-8">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Q2 2025
                  </h3>
                  <p className="text-gray-600">Scholarship Program Launch</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 bg-gradient-to-br from-purple-600 to-indigo-700 text-white"
        id="beta"
      >
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our beta and be among the first to raise your MoneyPet
          </p>

          <AnimatePresence>
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="p-4 rounded-xl w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <button
                  type="submit"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition w-full sm:w-auto"
                >
                  🚀 Join Beta Waitlist
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="thankyou"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-2xl font-semibold mt-6 bg-white text-purple-600 inline-block px-6 py-3 rounded-xl"
              >
                🎉 You're on the list! Check your email soon.
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-sm opacity-80">
            Limited spots available. No spam, just early access.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <img src="/logo-white.png" alt="MoneyPet" className="h-8" />
              <span className="text-white font-bold">MoneyPet</span>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition">
                Terms
              </a>
              <a href="#" className="hover:text-white transition">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition">
                Discord
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
            © {new Date().getFullYear()} MoneyPet. Making finance fun for Gen-Z.
          </div>
        </div>
      </footer>
    </div>
  );
}
