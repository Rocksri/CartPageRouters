import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true); // Trigger animation on page load
    }, []);

    const handleClick = () => {
        setAnimate(false); // Reset animation
        setTimeout(() => setAnimate(true), 100); // Restart animation
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <motion.div
                key={animate} // Forces re-render when animation state changes
                className="p-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    clipPath: animate
                        ? "polygon(40% 0, 75% 30%, 35% 30%, 35% 44%, 75% 44%, 75% 75%, 35% 75%, 100% 100%, 20% 85%, 20% 66%, 60% 65%, 60% 55%, 20% 55%, 20% 20%, 55% 20%, 30% 0)"
                        : "polygon(0 65%, 21% 15%, 70% 0, 100% 50%, 63% 20%, 100% 75%, 47% 31%, 100% 100%, 32% 45%, 75% 100%, 20% 59%, 50% 100%)",
                    backgroundColor: animate ? "#5c4033" : "#8B4513",
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {/* <h1 className="text-4xl font-bold text-center">Welcome Home</h1> */}
            </motion.div>

            <nav className="mt-10">
                <ul className="flex space-x-6">
                    <li>
                        <button
                            onClick={handleClick}
                            className="text-lg font-semibold px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                        >
                            Home
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
