import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_PATH = "/athlix-ecommerce";

const Preloader = ({ children }) => {
  const isHomePage =
    window.location.pathname === `${BASE_PATH}/` ||
    window.location.pathname === BASE_PATH;

  const [isLoading, setIsLoading] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, [isHomePage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Website */}
      <div className={isLoading ? "invisible" : "visible"}>{children}</div>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-9999 overflow-hidden bg-white"
            exit={{
              opacity: 0,
              scale: 1.01,
              transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            {/* Rising Circle */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#0e1218]"
              initial={{
                width: "280px",
                height: "140px",
                borderRadius: "280px 280px 0 0",
                scale: 1,
              }}
              animate={{
                scale: 15,
              }}
              transition={{
                duration: 1.45,
                ease: [0.76, 0, 0.24, 1],
              }}
            />

            {/* Blue Glow */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.45 0.22 265 / 0.22) 0%, transparent 70%)",
              }}
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: [0, 1, 0.85],
                scale: [0.7, 1, 1.05],
              }}
              transition={{
                duration: 0.9,
                delay: 1.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Secondary Glow */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.62 0.15 155 / 0.10) 0%, transparent 70%)",
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 1.45,
                ease: "easeOut",
              }}
            />

            {/* ATHLIX */}
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1.35,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.h1
                className="text-4xl font-semibold tracking-[0.5em] text-white sm:text-6xl"
                initial={{
                  opacity: 0,
                  y: 14,
                  scale: 0.95,
                  letterSpacing: "0.5em",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  letterSpacing: "0.3em",
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                ATHLIX
              </motion.h1>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 mt-14 h-px -translate-x-1/2 bg-white/40"
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: "4rem",
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 1.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Tagline */}
            <motion.p
              className="absolute left-1/2 top-1/2 z-20 mt-[4.8rem] -translate-x-1/2 whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.42em] text-white/55 sm:text-xs"
              initial={{
                opacity: 0,
                y: 5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 1.95,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Performance / Motion
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Preloader;
