import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
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
    <section className="py-20 px-6 bg-white">
      <motion.div
        className="text-center max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
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
              className="text-2xl text-purple-700 font-semibold"
            >
              🎉 Thank you for joining!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
