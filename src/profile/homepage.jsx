import { motion } from "framer-motion";

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            {/* Logo & Heading */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-center"
            >
                <h1 className="text-5xl font-extrabold">Welcome to ShopEase</h1>
                <p className="text-lg mt-2 text-gray-300">
                    Your one-stop shop for everything trendy!
                </p>
            </motion.div>

            {/* Animated Shopping Image */}
            {/* <motion.img
                src="https://source.unsplash.com/600x400/?shopping"
                alt="Shopping"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-6 rounded-lg shadow-lg"
            /> */}

            {/* Call-to-Action Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 transition"
                onClick={() => (window.location.hash = "#products")}
            >
                Shop Now
            </motion.button>
        </div>
    );
}
