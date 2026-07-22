"use client";

import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  Home,
  Building2,
  Package,
  Truck,
  Trash2,
  Wrench,
  MapPin,
  Warehouse,
  Phone,
  Mail,
  Menu,
  X,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Star,
  Clock,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { z } from "zod";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";

// Core site layout path references
export const logoUrl = "/photos/top tier logo.png";
export const truckBrandedUrl = "/photos/moving truck.jpg";

// Step 1 to 4 Images (Object Mapping configuration)
export const photos = {
  "01": "/photos/ee83274c-1dba-4189-b716-0fb5e5b95727.jpg",
  "02": "/photos/f9bed242-65e8-4fe0-b5c5-b5eaa88f71f5.jpg",
  "03": "/photos/8f7806a1-f603-4d42-8d01-b8e33864d916.jpg",
  "04": "/photos/2cda5e06-e8e9-4a85-823f-553db1f05d7a.jpg",
  "book": "/photos/ee83274c-1dba-4189-b716-0fb5e5b95727.jpg",
  "pack": "/photos/f9bed242-65e8-4fe0-b5c5-b5eaa88f71f5.jpg",
  "move": "/photos/8f7806a1-f603-4d42-8d01-b8e33864d916.jpg",
  "settleIn": "/photos/2cda5e06-e8e9-4a85-823f-553db1f05d7a.jpg"
};

// Gallery Images Array with structural fallback properties
export const galleryPhotos = [
  { id: "1", src: "/photos/3ba58102-9be3-4553-bcce-eb465bd646c0.jpg", url: "/photos/3ba58102-9be3-4553-bcce-eb465bd646c0.jpg", alt: "Top Tier Moving job site" },
  { id: "2", src: "/photos/21c8ccfe-5800-4b3c-8f6c-ff750b6bff17.jpg", url: "/photos/21c8ccfe-5800-4b3c-8f6c-ff750b6bff17.jpg", alt: "Top Tier Moving job site" },
  { id: "3", src: "/photos/65bac265-a5fc-4fa4-8729-996c7d0995f1.jpg", url: "/photos/65bac265-a5fc-4fa4-8729-996c7d0995f1.jpg", alt: "Top Tier Moving job site" },
  { id: "4", src: "/photos/60406409-6a7c-4ddf-9d13-ffc41adaa688.jpg", url: "/photos/60406409-6a7c-4ddf-9d13-ffc41adaa688.jpg", alt: "Top Tier Moving job site" },
  { id: "5", src: "/photos/a6bacc9c-eb42-4f9d-9e80-d0ba121b9b36.jpg", url: "/photos/a6bacc9c-eb42-4f9d-9e80-d0ba121b9b36.jpg", alt: "Top Tier Moving job site" },
  { id: "6", src: "/photos/ece4bb8d-7e17-4840-a430-3187e95d900f.jpg", url: "/photos/ece4bb8d-7e17-4840-a430-3187e95d900f.jpg", alt: "Top Tier Moving job site" }
];
/* ---------- Nav ---------- */

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Quote" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-3 group">
          <img
src="/photos/top tier logo.png"
            alt="Top Tier Moving Solutions"
            className="h-10 md:h-12 w-auto transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              <span className="relative">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:7744156411"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2"
          >
            <Phone className="h-4 w-4" />
            774-415-6411
          </a>
          <MagneticButton href="#contact" size="sm">
            Free Quote
          </MagneticButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden h-10 w-10 grid place-items-center rounded-full border border-border/60 bg-surface/60"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border/60"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-lg font-medium text-foreground/80"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="tel:7744156411"
                className="mt-2 py-2 text-lg font-medium flex items-center gap-2 text-primary"
              >
                <Phone className="h-5 w-5" />
                774-415-6411
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Magnetic Button ---------- */

function MagneticButton({
  children,
  href,
  onClick,
  size = "md",
  variant = "primary",
  type,
  disabled,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4 text-base",
  } as const;

  const base = cn(
    "relative inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-colors duration-300 will-change-transform",
    sizes[size],
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow"
      : "bg-transparent border border-border text-foreground hover:border-primary hover:text-primary",
    disabled && "opacity-60 pointer-events-none",
    className,
  );

  const inner = (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {href ? (
        <a href={href} className={base}>
          <span className="flex items-center gap-2">{children}</span>
        </a>
      ) : (
        <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={base}>
          <span className="flex items-center gap-2">{children}</span>
        </button>
      )}
    </motion.div>
  );

  return inner;
}

/* ---------- Reveal ---------- */

function Reveal({
  children,
  y = 40,
  delay = 0,
  className,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = ["TOP", "SERVICE.", "TOP", "CARE.", "TOP", "TIER."];

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-hero"
    >
      {/* Parallax bg */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src={photos.fullTruck}
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </motion.div>

      {/* Green streaks */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute h-px w-[40vw] bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-streak"
            style={{
              top: `${15 + i * 22}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${7 + i}s`,
            }}
          />
        ))}
        <motion.div
          className="absolute top-1/4 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-float-slow"
        />
        <motion.div
          className="absolute bottom-10 right-0 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-3xl animate-float-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 min-h-screen flex flex-col justify-center pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="text-eyebrow">Worcester, MA · Since day one</span>
          <span className="h-px flex-1 bg-border/50 max-w-24" />
        </motion.div>

        <h1 className="text-hero text-[clamp(3rem,10vw,10rem)] text-foreground">
          <span className="flex flex-wrap gap-x-6 gap-y-2">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 120, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.1, delay: 0.3 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "inline-block",
                  (i === 1 || i === 3) && "text-foreground/95",
                  i === 5 && "text-primary italic",
                )}
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 max-w-xl text-lg md:text-xl text-foreground/70 leading-relaxed"
        >
          A premium moving crew based in Worcester, Massachusetts. Residential,
          commercial, long-distance — handled with the care and precision your
          home deserves.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#contact" size="lg">
            Get Your Free Quote
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="tel:7744156411" size="lg" variant="ghost">
            <Phone className="h-4 w-4" />
            774-415-6411
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-foreground/40 uppercase"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Fleet band ---------- */

function FleetBand() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-10 md:mb-14 flex items-end justify-between gap-6 flex-wrap">
        <Reveal>
          <p className="text-eyebrow mb-3">Our Fleet</p>
          <h2 className="text-display text-4xl md:text-6xl">
            Our Fleet.
            <span className="block text-primary">Our Standard.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-md text-foreground/60">
            Fully branded, meticulously maintained trucks — equipped for anything
            from a studio apartment to a full commercial relocation.
          </p>
        </Reveal>
      </div>

      <Reveal y={80} className="w-full">
        <div className="relative w-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <img
<img src="/photos/moving-truck.jpg" alt="Top Tier moving truck" />
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <section id="about" className="relative py-32 md:py-48 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid md:grid-cols-12 gap-12">
        <Reveal className="md:col-span-5">
          <p className="text-eyebrow mb-6">About Top Tier</p>
          <h2 className="text-display text-4xl md:text-6xl">
            Rooted in Worcester.
            <span className="block text-primary">Trusted across Central Mass.</span>
          </h2>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg text-foreground/70 leading-relaxed">
          <Reveal delay={0.1}>
            <p>
              We started Top Tier because we saw a gap in how moving companies
              treat people's most valuable things. So we built one that doesn't cut
              corners — a small, trained crew that shows up early, packs like it's
              their own house, and communicates every step of the way.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              Every mover on the truck has <span className="text-foreground font-semibold">2+ years of hands-on experience</span>.
              We're fully equipped, fully insured, and dispatched from Worcester
              across all of Central Massachusetts and New England.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-border/60">
              {[
                { label: "Available", value: "24/7" },
                { label: "Star Rated", value: "5.0" },
                { label: "Fully Insured", value: "✓" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-foreground/50">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

const SERVICES = [
  {
    icon: Home,
    title: "Residential Moving",
    copy: "Apartments, condos, single-families, walk-ups — treated with the same white-glove standard.",
image: "/photos/21c8ccfe-5800-4b3c-8f6c-ff750b6bff17.jpg",
  },
  {
    icon: Building2,
    title: "Commercial Moving",
    copy: "Offices, retail, medical — after-hours and weekend moves to keep your business running.",
image: "/photos/2cda5e06-e8e9-4a85-823f-553db1f05d7a.jpg",
  },
  {
    icon: Package,
    title: "Professional Packing",
    copy: "Materials, boxes, blankets, tape — packed with the precision of a Tetris champion.",
image: "/photos/3ba58102-9be3-4553-bcce-eb465bd646c0.jpg",
  },
  {
    icon: Truck,
    title: "Local & Long Distance",
    copy: "Across Worcester, across the state line — same crew, same care, all the way to the door.",
image: "/photos/60406409-6a7c-4ddf-9d13-ffc41adaa688.jpg",
  },
  {
    icon: Warehouse,
    title: "Storage Loading",
    copy: "Storage units packed to maximize every cubic foot — nothing wasted, nothing damaged.",
image: "/photos/65bac265-a5fc-4fa4-8729-996c7d0995f1.jpg",
  },
  {
    icon: Wrench,
    title: "Furniture Assembly",
    copy: "Disassembly at pickup, reassembly at drop-off — no leftover screws, no scratched floors.",
image: "/photos/8a92487c-609f-4b71-9041-2d8150467f7b.jpg",
  },
  {
    icon: Trash2,
    title: "Junk Removal",
    copy: "Old furniture, moving debris, cleanouts — hauled away so you close the door on empty.",
image: "/photos/8f7806a1-f603-4d42-8d01-b8e33864d916.jpg",
  },
  {
    icon: ShieldCheck,
    title: "Loading & Unloading",
    copy: "Rented a truck yourself? We'll load or unload it right — pad-wrapped and strapped tight.",
image: "/photos/a6bacc9c-eb42-4f9d-9e80-d0ba121b9b36.jpg",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-32 md:py-48 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-16 md:mb-24">
          <Reveal>
            <p className="text-eyebrow mb-4">Services</p>
            <h2 className="text-display text-4xl md:text-6xl max-w-2xl">
              Whatever the move.<span className="text-primary">.</span>
              <span className="block text-foreground/50">However you need it done.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.06} y={60}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  copy,
  image,
}: {
  icon: typeof Home;
  title: string;
  copy: string;
  image: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-surface border border-border/60 aspect-[4/5]"
    >
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-40 transition-all duration-[900ms] group-hover:opacity-70 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/20" />
      </div>
      <div className="relative h-full flex flex-col justify-between p-6">
        <div className="h-11 w-11 grid place-items-center rounded-xl bg-primary/15 border border-primary/30 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">{title}</h3>
          <p className="text-sm text-foreground/65 leading-relaxed">{copy}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-primary/40 transition duration-500" />
    </motion.div>
  );
}

/* ---------- Sticky Process ---------- */

const STEPS = [
  {
    n: "01",
    title: "Book",
    body: "Tell us the date, the size, and where it's going. You'll get a straight, honest quote - no fine print, no surprise fees.",
    image: "/photos/ee83274c-1dba-4189-b716-0fb5e5b95727.jpg",
  },
  {
    n: "02",
    title: "Pack",
    body: "We show up with materials, boxes, and blankets. Every fragile item wrapped, every drawer secured, every corner protected.",
    image: "/photos/f9bed242-65e8-4fe0-b5c5-b5eaa88f71f5.jpg",
  },
  {
    n: "03",
    title: "Move",
    body: "Trained crew, 2+ years of experience per mover. Fully loaded and on the road - you get updates every step.",
    image: "/photos/8f7806a1-f603-4d42-8d01-b8e33864d916.jpg",
  },
  {
    n: "04",
    title: "Settle In",
    body: "Everything placed where it goes, boxes unpacked if you want, furniture reassembled. We leave you home - not with a project.",
    image: "/photos/2cda5e06-e8e9-4a85-823f-553db1f05d7a.jpg",
  },
];

function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
    setActive(idx);
  });

  return (
    <section id="process" className="relative bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-16">
        <Reveal>
          <p className="text-eyebrow mb-4">The Process</p>
          <h2 className="text-display text-4xl md:text-6xl max-w-3xl">
            Four steps.
            <span className="block text-primary">Zero surprises.</span>
          </h2>
        </Reveal>
      </div>

      <div ref={containerRef} className="relative" style={{ height: `${STEPS.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 grid md:grid-cols-2 gap-12 items-center">
            {/* Text column */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-[8rem] md:text-[12rem] leading-none font-black text-primary/20 tracking-tighter">
                    {STEPS[active].n}
                  </div>
                  <h3 className="mt-2 text-5xl md:text-7xl font-bold tracking-tight">
                    {STEPS[active].title}
                  </h3>
                  <p className="mt-6 max-w-md text-lg text-foreground/70 leading-relaxed">
                    {STEPS[active].body}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center gap-3">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      i === active ? "w-12 bg-primary" : "w-6 bg-border",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Image column */}
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden bg-surface border border-border/60">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={STEPS[active].image}
                  alt={STEPS[active].title}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, scale: 1.05, clipPath: "inset(100% 0 0 0)" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Choose Us with counters ---------- */

function CountUp({ to, suffix = "", duration = 2 }: { to: number | string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState<string>(typeof to === "number" ? "0" : String(to));

  useEffect(() => {
    if (!inView || typeof to !== "number") return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(to * eased).toLocaleString());
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function WhyUs() {
  const items = [
    { value: "24/7", suffix: "", label: "Available", copy: "Weekends, evenings, emergencies — we answer." },
    { value: 5, suffix: ".0★", label: "Star Rated", copy: "Reviews from real Worcester families." },
    { value: 2, suffix: "+ yrs", label: "Per Mover", copy: "Trained crew, minimum two years experience." },
    { value: 100, suffix: "%", label: "Insured", copy: "Fully licensed & insured, every job, every mile." },
  ];

  return (
    <section className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="text-eyebrow mb-4">Why Top Tier</p>
          <h2 className="text-display text-4xl md:text-6xl max-w-3xl">
            Built on trust.
            <span className="block text-foreground/50">Backed by every move.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 0.08}>
              <div className="group relative rounded-2xl p-6 md:p-8 bg-surface border border-border/60 hover:border-primary/60 transition-all duration-500">
                <div className="text-4xl md:text-6xl font-black tracking-tighter text-primary">
                  <CountUp to={it.value} suffix={it.suffix} />
                </div>
                <div className="mt-4 text-xs uppercase tracking-widest text-foreground/50">
                  {it.label}
                </div>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">
                  {it.copy}
                </p>
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 shadow-glow" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */

function Gallery() {
  return (
    <section id="gallery" className="relative py-32 md:py-48 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="text-eyebrow mb-4">Real Moves. Real Crews.</p>
          <h2 className="text-display text-4xl md:text-6xl max-w-3xl mb-16">
            From our trucks
            <span className="block text-primary">to your new door.</span>
          </h2>
        </Reveal>

        <div className="columns-2 md:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
          {galleryPhotos.map((photo, i) => {
            // Force extract the source link string regardless of what data structure got passed
            const imageSrc = typeof photo === 'string' ? photo : (photo?.src || photo?.url || "");
            return (
              <Reveal key={i} delay={((i % 6) * 0.05)} y={40}>
                <motion.figure
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="break-inside-avoid overflow-hidden rounded-2xl border border-border/60 bg-surface"
                >
                  <img
                    src={imageSrc}
                    alt="Top Tier Moving job site"
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-[900ms] hover:scale-105"
                  />
                </motion.figure>
              </Reveal>
            );
          })}

              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

const TESTIMONIALS = [
  {
    quote:
      "Absolutely the best moving experience we've had. The crew was on time, careful, and genuinely kind. Not a single scratch.",
    name: "Sarah M.",
    role: "Worcester, MA",
  },
  {
    quote:
      "Moved our entire office over a weekend. Zero downtime Monday morning. They packed our servers like they owned them.",
    name: "David L.",
    role: "Small business owner",
  },
  {
    quote:
      "I've moved five times in ten years. Top Tier is the first crew I'd actually call back. Fast, fair, and no games.",
    name: "Jenna R.",
    role: "Shrewsbury, MA",
  },
  {
    quote:
      "They packed my entire kitchen — glassware, china, everything — like a puzzle. Not one thing broken.",
    name: "Michael T.",
    role: "Auburn, MA",
  },
  {
    quote:
      "Called Friday for a Sunday move. They made it happen and still under-quoted the final bill.",
    name: "Amanda K.",
    role: "Millbury, MA",
  },
];

function Testimonials() {
  return (
    <section className="relative py-32 md:py-40 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-16">
        <Reveal>
          <p className="text-eyebrow mb-4">What people say</p>
          <h2 className="text-display text-4xl md:text-6xl max-w-3xl">
            5 stars, one crew at a time.
          </h2>
        </Reveal>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <figure
              key={i}
              className="min-w-[320px] md:min-w-[440px] rounded-3xl border border-border/60 bg-surface p-8 md:p-10"
            >
              <div className="flex gap-1 text-primary mb-6">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-border/60">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-foreground/50">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact Form ---------- */

const formSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(40),
  email: z.string().trim().email("Enter a valid email").max(200),
  move_date: z.string().trim().min(1, "Choose a move date").max(40),
  move_from: z.string().trim().max(200).optional().default(""),
  move_to: z.string().trim().max(200).optional().default(""),
  move_size: z.string().trim().max(80).optional().default(""),
  details: z.string().trim().max(2000).optional().default(""),
});

type FormState = z.infer<typeof formSchema>;

function ContactForm() {
  const submit = useServerFn(submitLead);
  const [values, setValues] = useState<FormState>({
    full_name: "",
    phone: "",
    email: "",
    move_date: "",
    move_from: "",
    move_to: "",
    move_size: "",
    details: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const setField = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const es: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!es[key]) es[key] = issue.message;
      }
      setErrors(es);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      await submit({ data: parsed.data });
      setDone(true);
      toast.success("Quote request received. We'll be in touch shortly.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please call 774-415-6411.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-eyebrow mb-4">Get a Quote</p>
            <h2 className="text-display text-4xl md:text-6xl">
              Ready when
              <span className="block text-primary">you are.</span>
            </h2>
            <p className="mt-6 text-lg text-foreground/65 leading-relaxed max-w-md">
              Tell us about your move. We'll get back with a fair, upfront quote —
              usually within the hour during business hours.
            </p>
            <div className="mt-10 space-y-4">
              <a
                href="tel:7744156411"
                className="group flex items-center gap-4 py-4 border-b border-border/60"
              >
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-foreground/50">
                    Call
                  </div>
                  <div className="text-xl font-semibold group-hover:text-primary transition-colors">
                    774-415-6411
                  </div>
                </div>
              </a>
              <a
                href="mailto:justin@toptiermove.com"
                className="group flex items-center gap-4 py-4 border-b border-border/60"
              >
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-foreground/50">
                    Email
                  </div>
                  <div className="text-lg font-semibold group-hover:text-primary transition-colors">
                    justin@toptiermove.com
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-4 py-4">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-foreground/50">
                    Based in
                  </div>
                  <div className="text-lg font-semibold">Worcester, MA</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border/60 bg-surface p-6 md:p-10">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-20 text-center"
                  >
                    <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-primary/15 border border-primary/40 text-primary mb-6">
                      <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-3xl font-bold">You're on the list.</h3>
                    <p className="mt-3 text-foreground/65 max-w-md mx-auto">
                      Your request landed in our inbox. We'll be in touch shortly at{" "}
                      <span className="text-foreground">{values.email}</span>. For
                      anything urgent, call{" "}
                      <a href="tel:7744156411" className="text-primary underline underline-offset-4">
                        774-415-6411
                      </a>
                      .
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    <Field
                      label="Full name"
                      required
                      value={values.full_name}
                      onChange={(v) => setField("full_name", v)}
                      error={errors.full_name}
                    />
                    <Field
                      label="Phone"
                      type="tel"
                      required
                      value={values.phone}
                      onChange={(v) => setField("phone", v)}
                      error={errors.phone}
                    />
                    <Field
                      className="sm:col-span-2"
                      label="Email"
                      type="email"
                      required
                      value={values.email}
                      onChange={(v) => setField("email", v)}
                      error={errors.email}
                    />
                    <Field
                      label="Move date"
                      type="date"
                      required
                      value={values.move_date}
                      onChange={(v) => setField("move_date", v)}
                      error={errors.move_date}
                    />
                    <SelectField
                      label="Move size"
                      value={values.move_size}
                      onChange={(v) => setField("move_size", v)}
                      options={[
                        "Studio / 1 bedroom",
                        "2 bedroom",
                        "3 bedroom",
                        "4+ bedroom",
                        "Office / Commercial",
                        "Storage unit",
                        "Just a few items",
                      ]}
                    />
                    <Field
                      label="Move from"
                      value={values.move_from}
                      onChange={(v) => setField("move_from", v)}
                      placeholder="City, state"
                    />
                    <Field
                      label="Move to"
                      value={values.move_to}
                      onChange={(v) => setField("move_to", v)}
                      placeholder="City, state"
                    />
                    <Field
                      className="sm:col-span-2"
                      label="Additional details"
                      textarea
                      value={values.details}
                      onChange={(v) => setField("details", v)}
                      placeholder="Stairs? Elevator? Piano? Anything we should know."
                    />
                    <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap pt-2">
                      <p className="text-xs text-foreground/50 max-w-sm flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        Typical response within one hour, business days.
                      </p>
                      <MagneticButton type="submit" size="lg" disabled={submitting}>
                        {submitting ? "Sending…" : "Request Quote"}
                        <ArrowUpRight className="h-4 w-4" />
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  placeholder,
  className,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <label className={cn("relative block", className)}>
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-300 text-foreground/50",
          active ? "top-2 text-[10px] uppercase tracking-widest text-primary" : "top-4 text-sm",
        )}
      >
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={active ? placeholder : ""}
          rows={4}
          className={cn(
            "w-full rounded-xl bg-input/60 border px-4 pt-7 pb-3 text-sm text-foreground outline-none transition-all resize-none",
            "border-border/70 focus:border-primary focus:bg-input/90",
            error && "border-destructive/70",
          )}
        />
      ) : (
        <input
          value={value}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={active ? placeholder : ""}
          className={cn(
            "w-full h-14 rounded-xl bg-input/60 border px-4 pt-4 text-sm text-foreground outline-none transition-all",
            "border-border/70 focus:border-primary focus:bg-input/90",
            error && "border-destructive/70",
          )}
        />
      )}
      {error && (
        <span className="mt-1 block text-xs text-destructive">{error}</span>
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  const active = value.length > 0;
  return (
    <label className={cn("relative block", className)}>
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-300 text-foreground/50",
          active ? "top-2 text-[10px] uppercase tracking-widest text-primary" : "top-4 text-sm",
        )}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 rounded-xl bg-input/60 border border-border/70 px-4 pt-4 text-sm text-foreground outline-none appearance-none focus:border-primary transition-all"
      >
        <option value=""></option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-background">
            {o}S
          </option>
        ))}
      </select>
    </label>
    <label className="relative flex flex-col gap-1 w-full">
  <span className="text-sm font-medium text-foreground/60">How many boxes?</span>
  <input 
    type="text" 
    name="boxes" 
    placeholder="e.g., 20 medium, 5 large" 
    className="w-full h-14 rounded-xl bg-input/60 border border-border/70 px-4 pt-1 text-sm text-foreground outline-none appearance-none focus:border-primary transition-colors"
  />
</label>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <img src={logoUrl} alt="Top Tier Moving Solutions" className="h-16 w-auto" />
          <p className="mt-6 max-w-sm text-foreground/60 leading-relaxed">
            Top service. Top care. Top tier. A premium moving crew based in
            Worcester, Massachusetts.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-widest text-foreground/50 mb-4">Sitemap</div>
          <ul className="space-y-2 text-foreground/80">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-primary transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-widest text-foreground/50 mb-4">Contact</div>
          <ul className="space-y-3 text-foreground/80">
            <li>
              <a href="tel:7744156411" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" /> 774-415-6411
              </a>
            </li>
            <li>
              <a href="mailto:justin@toptiermove.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> justin@toptiermove.com
              </a>
            </li>
            <li className="flex items-center gap-3 text-foreground/70">
              <MapPin className="h-4 w-4" /> Worcester, Massachusetts
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-foreground/50">
          <div>© {new Date().getFullYear()} Top Tier Moving Solutions. All rights reserved.</div>
          <div className="tracking-widest uppercase">Top Service · Top Care · Top Tier</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

export default function TopTierPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <FleetBand />
        <About />
        <Services />
        <Process />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
