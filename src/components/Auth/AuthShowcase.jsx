import { Link } from "react-router-dom";
import {
  sneakerImageOne,
  hoodieImage,
  ballImage,
  watchImage,
} from "../../assets/index";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function AuthShowcase() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
  }

  const moveX = useSpring(useTransform(mouseX, [0, 800], [-30, 30]), {
    stiffness: 120,
    damping: 20,
  });

  const moveY = useSpring(useTransform(mouseY, [0, 900], [-30, 30]), {
    stiffness: 120,
    damping: 20,
  });

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative hidden overflow-hidden bg-foreground text-background lg:block"
    >
      <div className="absolute -left-40 -top-40 size-155 rounded-full bg-royal blur-[140px] opacity-[0.25]"></div>

      <div className="absolute -bottom-52 -right-32 size-160 rounded-full bg-emerald blur-[160px] opacity-[0.2]"></div>

      <div
        className="absolute inset-0 opacity-40 size-full
bg-[repeating-linear-gradient(-15deg,transparent_0px,transparent_100px,rgba(255,255,255,0.15)_101px,transparent_102px)]"
      />

      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute left-1/2 top-1/3 size-105 -translate-x-1/2 rounded-full border border-background"></div>
        <div className="absolute left-1/2 top-1/3 size-75 -translate-x-1/2 rounded-full border border-background"></div>
        <div className="absolute left-1/2 top-1/3 size-45 -translate-x-1/2 rounded-full border border-background"></div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-[0.06] mask-[linear-gradient(to_top,black,transparent)]"
        style={{
          background:
            "radial-gradient(60% 80% at 30% 100%, var(--background), transparent), radial-gradient(50% 70% at 80% 100%, var(--background), transparent)",
        }}
      ></div>

      <motion.div
        style={{
          x: moveX,
          y: moveY,
        }}
        className="pointer-events-none absolute top-[14%] left-[8%] size-37.5 -rotate-8 translate-x-2 translate-y-[-0.15px] opacity-100"
      >
        <div className="size-full animate-bounce [animation-duration:8s]">
          <div className="relative size-full">
            <div className="absolute inset-0 rounded-3xl bg-background/5 backdrop-blur-md ring-1 ring-background/10 shadow-2xl"></div>
            <img
              src={sneakerImageOne}
              alt="Sneaker"
              className="relative size-full rounded-3xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{
          x: moveX,
          y: moveY,
        }}
        className="pointer-events-none absolute top-[28%] right-[12%] rotate-10 opacity-100 size-27.5 translate-x-0.75"
      >
        <div className="size-full animate-bounce [animation-duration:10s]">
          <div className="relative size-full">
            <div className="absolute inset-0 rounded-3xl bg-background/5 backdrop-blur-md ring-1 ring-background/10 shadow-2xl"></div>
            <img
              src={ballImage}
              alt="Footbal"
              className="relative size-full rounded-3xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{
          x: moveX,
          y: moveY,
        }}
        className="pointer-events-none absolute bottom-[26%] left-[18%] rotate-10 size-30 opacity-100 translate-x-[1.5px]"
      >
        <div className="size-full animate-bounce [animation-duration:11s]">
          <div className="relative size-full">
            <div className="absolute inset-0 rounded-3xl bg-background/5 backdrop-blur-md ring-1 ring-background/10 shadow-2xl"></div>

            <img
              src={watchImage}
              alt="Sport watch"
              className="relative size-full rounded-3xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{
          x: moveX,
          y: moveY,
        }}
        className="pointer-events-none absolute bottom-[10%] right-[8%] size-40 -rotate-6 opacity-100 translate-x-[2.5]"
      >
        <div className="size-full animate-bounce [animation-duration:9s]">
          <div className="relative size-full">
            <div className="absolute inset-0 rounded-3xl bg-background/5 backdrop-blur-md ring-1 ring-background/10 shadow-2xl"></div>

            <img
              src={hoodieImage}
              alt="Hoodie"
              className="relative size-full rounded-3xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14 animate-fade-in">
        <Link
          className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight text-background"
          to="/"
        >
          <span className=" flex items-center justify-center size-9 rounded-xl bg-background text-foreground">
            <span className="text-sm font-black">A</span>
          </span>
          ATHLIX
        </Link>

        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-background/60">
            The ATHLIX club
          </p>

          <h2 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight xl:text-6xl">
            Built for athletes.
            <br />
            Designed for champions.
          </h2>

          <p className="mt-6 max-w-md text-base text-background/70">
            Join thousands of athletes discovering premium footwear, apparel and
            equipment engineered for performance.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-background/50">
          <span>© 2026 ATHLIX</span>

          <span className="flex items-center gap-6">
            <span>Performance</span>
            <span>Precision</span>
            <span>Progress</span>
          </span>
        </div>
      </div>
    </div>
  );
}
