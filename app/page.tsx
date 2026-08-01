"use client";

import { FaLinkedin, FaRobot, FaTwitter, FaYoutube } from "react-icons/fa";

import { NavBar3 } from "./components/Nav Bar 3";
import HeroSection12 from "./components/Hero Section 12";
import SocialProof1 from "./components/Social Proof 1";
import FeatureSection10 from "./components/Feature Section 10";
import {
  Code,
  DollarSign,
  FileText,
  FileType,
  Globe,
  Hash,
  HelpCircle,
  Mail,
  Search,
  Target,
  Zap,
} from "lucide-react";
import HowItWorks5 from "./components/How It Works 5";

import PricingSection5 from "./components/Pricing 5";
import Testimonials6 from "./components/Testimonial 6";
import { CallToAction3 } from "./components/Call To Action 3";
import Newsletter2 from "./components/News Letter 2";
import Footer5 from "./components/Footer 5";
import { ModeToggle } from "./dark-mode";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="absolute top-0 z-20 -left-20 w-[400px] dark:w-[1200px] h-[400px] dark:bg-primary/40 bg-primary/50 rounded-full blur-[180px] pointer-events-none " />

      <div className="absolute top-0 z-20 -right-20 w-[800px] dark:w-[1200px] h-[1000px] dark:bg-primary/40 bg-primary/20 rounded-full blur-[180px] pointer-events-none " />

      <NavBar3
        className="z-60 h-[90px] border-white rounded-3xl dark:bg-primary/15 dark:border-primary/25"
        domain={{
          name: (
            <h1 className="flex items-center gap-2 pl-2 text-3xl max-sm:hidden">
              <span className="font-medium text-primary">AI</span>
              <span className="font-light">Verse</span>
            </h1>
          ),
          logo: (
            <div className=" size-10 rounded-lg bg-primary text-white flex items-center justify-center mr-1">
              <FaRobot className="size-6" />
            </div>
          ),
        }}
        leftAddon={[<ModeToggle />]}
        authLinks={{
          login: {
            text: "Get Started Free",
            urlLink: "/login",
            className: "bg-transparent shadow-none text-lg h-11",
          },
          register: {
            text: "Log In",
            urlLink: "/register",
            className: "h-11 rounded-xl px-6 text-lg",
          },
        }}
        hideMainNavigationIcons={true}
        navigationMenu={[
          {
            title: "Home",
            url: "/home",
            subMenu: [],
          },
          {
            title: "Features",
            url: "/features",
            subMenu: [],
          },
          {
            title: "Pricing",
            url: "/pricing",
            subMenu: [],
          },
        ]}
      />

      <HeroSection12
        badgeFeature={{
          text: "Next-Gen Content Creator",
          tag: "v2.0",
          className: "border-primary/20",
        }}
        hideSocialProof={false}
        className="mt-40 z-30 bg-transparent "
        socialProof={{ rating: "4.9/5" }}
        mainHeading={{
          text: (
            <div>
              <span className="mr-2">Super Charge Your</span>
              <span className="mr-2">Content</span>
              <span className="block text-primary">Generation</span>
            </div>
          ),
          className: "",
        }}
        subHeading={{
          text: "Accelerate your workflow and generate high-converting blogs, code snippets, and social media posts in seconds.",
          className: "",
        }}
        image={{ src: "/verse-dashboard.jpg", alt: "" }}
        primaryButton={{
          text: "Get Started Free",
          className: "bg-gradient-to-tl h-14 from-bg-red-500 to-bg-primary ",
          onClick: () => {},
        }}
        secondaryButton={{
          text: "Explore Templates",
          className: "h-14 border-none",
          onClick: () => {},
          variant: "outline",
        }}
      />

      <SocialProof1
        animate={true}
        grayscale={true}
        className=""
        heading={{
          text: "Trusted by 10,000+ founders & business owners",
          className: "",
        }}
        clientLogos={[
          {
            logoImage:
              "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            alt: "Google Logo",
            text: "",
          },
          {
            logoImage:
              "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/framer.svg",
            alt: "Framer Logo",
            text: "Framer",
          },
          {
            logoImage:
              "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            alt: "Apple Logo",
            text: "Apple",
          },
          {
            logoImage:
              "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg",
            alt: "LinkedIn Logo",
            text: "",
          },
          {
            logoImage:
              "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
            alt: "Microsoft Logo",
            text: "",
          },
        ]}
      />

      <FeatureSection10
        enableHover={false}
        className="bg-gradient-to-tl from-primary/50 to-primary mt-10 px-14 py-28 rounded-3xl"
        heading={{
          text: "Accelerate Your Growth Today",
          className: "text-white",
        }}
        subHeading={{
          text: "Transform your writing workflow, automate code generation, and scale your digital presence instantly with our comprehensive suite of smart templates.",
          className: "hidden",
        }}
        featureBadge={{
          text: "Powerful Features",
          className: "hidden",
        }}
        cardData={[
          {
            icon: <Zap size={36} className="text-white" />,
            title: "Smart Template Library",
            className: "text-white",
            description:
              "Instantly access diverse templates designed to craft high-converting blog posts, social media captions, and professional newsletters.",
          },
          {
            icon: <Code size={36} className="text-white" />,
            title: "Automated Code Generation",
            className: "text-white",
            description:
              "Accelerate development cycles by automatically generating clean, efficient code snippets tailored to your exact programming language requirements.",
          },
          {
            icon: <Zap size={36} className="text-white" />,
            title: "Real-Time Productivity Analytics",
            className: "text-white",
            description:
              "Track your total words generated, active documents, and time saved effortlessly using comprehensive live dashboard metrics and charts.",
          },
          {
            icon: <Zap size={36} className="text-white" />,
            title: "Advanced Content History",
            className: "text-white",
            description:
              "Seamlessly search, filter, and review all your previously generated text and code entries with our centralized history management tool.",
          },
          {
            icon: <Target size={36} className="text-white" />,
            title: "Targeted Social Optimization",
            className: "text-white",
            description:
              "Maximize engagement across platforms by generating tailored YouTube hashtags, SEO metadata, and compelling marketing copy instantly.",
          },
          {
            icon: <DollarSign size={36} className="text-white" />,
            title: "Flexible Subscription Scaling",
            className: "text-white",
            description:
              "Easily manage your tier limits and monitor your content generation capacity to scale your output efficiently as your needs grow.",
          },
        ]}
      />

      <div className="relative">
        <div className="absolute top-20 left-0  w-[800px] dark:w-[1200px] h-[1000px] dark:bg-primary/30 bg-primary/20  blur-[180px]  pointer-events-none -z-0" />
        <HowItWorks5
          className="mt-14 bg-transparent z-30 max-w-[1400px] px-0"
          featureBadge={{
            text: "Simple Process",
            className: "hidden",
            icon: <Zap className="size-5" />,
          }}
          heading={{
            text: (
              <div className="text-4xl sm:text-6xl font-medium tracking-normal text-neutral-950 dark:text-white">
                <span>Create Your Content </span>
                <span className="block text-primary">In Three Steps</span>
              </div>
            ),
            className: " font-medium leading-tight mt-10 ",
          }}
          sectionId=""
          subHeading={{
            text: "Leverage our intuitive platform to generate custom texts, codes, and social media posts seamlessly.",
            className: "",
          }}
          tabItems={[
            {
              id: "01",
              className: "pr-[20px]",
              tabContent: {
                id: "01",

                title: "Select Template",

                description:
                  "Pick from a diverse library of content generation templates.",

                image: {
                  alt: "",
                  src: "how-it-works-step-1.png",
                  href: "/01",
                },
              },
            },
            {
              id: "02",

              tabContent: {
                id: "02",
                title: "Input Details",
                description:
                  "Enter your specific inputs and choose target options.",

                image: {
                  alt: "",
                  layout: "object-cover",
                  src: "how-it-works-step-2.png",

                  href: "/02",
                },
              },
            },
            {
              id: "03",

              tabContent: {
                id: "03",
                title: "Generate Output",
                description:
                  "Get high-quality content instantly and track metrics.",

                image: {
                  alt: "",
                  src: "how-it-works-step-3.png",

                  href: "/03",
                },
              },
            },
          ]}
        />
      </div>

      <div className="relative">
        <PricingSection5
          pricingCards={[
            {
              className: "  bg-red-50",
              title: "Free Plan",
              description:
                "Essential features to get started with basic content generation.",
              buttonText: "Get Started",
              href: "/signup",
              features: [
                "Access to 5 Templates",
                "Generate up to 1,000 words per month",
                "Basic Customer Support",
                "Standard Content Tone",
              ],
              frequency: "/month",
              price: "$0",
              isPopular: false,
            },
            {
              title: "Pro Plan",
              description:
                "Unlock maximum power and unlimited templates for professionals.",
              buttonText: "Get Started",
              href: "/signup",
              features: [
                "Unlimited Access to All Templates",
                "Generate up to 100,000 words per month",
                "Priority Customer Support",
                "Custom Content Tone",
                "Advanced Analytics & History Logs",
                "Code Generator Access",
              ],
              frequency: "/month",
              price: "$12",
              isPopular: true,
            },
          ]}
          mainHeading={{
            text: "Choose the Perfect Plan for Your Content Needs",
            // className: "max-w-4xl",
          }}
          subHeading={{
            text: "Scale your content generation and unlock advanced templates with our flexible pricing options.",
            className: "",
          }}
          badge={{
            mainText: "Pricing Plans",
            className: "",
          }}
        />
      </div>

      <div className="relative">
        <div className="absolute top-64 left-20 w-[800px] opacity-55  dark:w-[1200px] h-[1000px] dark:bg-primary/30 bg-primary/20  blur-[180px]" />
        <Testimonials6
          heading={{
            text: "Loved by Creators and Developers Worldwide",
            className: "",
          }}
          subheading={{
            text: "See how AI Verse transforms workflows, saves time, and boosts productivity for professionals everywhere.",
            className: "",
          }}
          testimonialBadge={{ text: "Testimonials", className: "" }}
          Speed={80}
          testimonials={[
            {
              text: "The real-time analytics and history tracking give us clear visibility into our content generation capacity. It's an indispensable tool for our daily marketing operations.",
              avatar: "https://randomuser.me/api/portraits/men/75.jpg",
              name: "David Morales",
              position: "Growth Marketing Lead",
            },
            {
              text: "As a solo creator, writer's block used to slow me down constantly. With AI Verse, I can effortlessly outline articles, generate catchy post titles, and scale my output seamlessly.",
              avatar: "https://randomuser.me/api/portraits/women/68.jpg",
              name: "Elena Rostova",
              position: "Freelance Copywriter",
            },
            {
              text: "The built-in code generator is an absolute game-changer. It helps me spin up boilerplate snippets and logic structures in seconds right inside my workflow.",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              name: "Marcus Chen",
              position: "Full-Stack Software Engineer",
            },
            {
              text: "AI Verse has completely transformed how our team creates blog posts and social media copy. The smart templates save us hours every single week while keeping our brand voice consistent.",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              name: "Sarah Jenkins",
              position: "Content Marketing Director",
            },
          ]}
        />
      </div>

      <CallToAction3
        iconContainerClassName="rounded-2xl bg-primary text-white"
        className="bg-transparent"
        title={{
          text: "Supercharge Your Content Creation Process Today",
          className: "",
        }}
        description={{
          text: "Join thousands of professionals using our intelligent platform to automate writing, generate code, and scale operations effortlessly.",
          className: "",
        }}
        primaryButton={{
          text: "Get Started Free",
          className: "",
          href: "",
        }}
        leftIcons={[
          <FileType key="type" className="text-white" />,
          <FileText key="file" />,
          <Hash key="hash" />,
          <Code key="code" />,
        ]}
        rightIcons={[
          <Mail key="mail" />,
          <HelpCircle key="help" />,
          <Globe key="globe" />,
          <Search key="search" />,
        ]}
      />

      <Newsletter2
        featureBadge={{
          shortText: "🔥 Weekly AI Insights",
          longText: "Join 10K+ Creators",
          className: "",
        }}
        inputElement={{
          placeholder: "Enter your email address here",
        }}
        button={{
          text: "Subscribe Now",
          className: "",
        }}
        subheading={{
          text: "Join thousands of creators receiving weekly AI tips, advanced writing strategies, and updates to scale your productivity effortlessly",
          className: "",
        }}
        heading={{
          text: "Accelerate Your Content Creation",
          className: "",
        }}
      />

      <Footer5
        website="AI Verse"

        logo={<FaRobot className="w-8 h-8 text-primary" />}
        description="AI Verse empowers creators and developers to automate content generation, build code snippets instantly, and scale digital workflows seamlessly."
        bigText={{
          value: "CREATE",
          textSize: 27,
          className:
            "font-black uppercase text-primary/20 dark:text-primary/30 leading-[0.95]",
          letterSpacing: -4,
        }}
        footerNavigation={{
          Resources: [
            { label: "Support", href: "Support" },
            { label: "Changelog", href: "Changelog" },
            { label: "Blog", href: "Blog" },
            { label: "Documentation", href: "Documentation" },
          ],
          Company: [
            { label: "Privacy Policy", href: "Privacy Policy" },
            { label: "Terms of Service", href: "Terms of Service" },
            { label: "Contact", href: "Contact" },
            { label: "About Us", href: "About Us" },
          ],
          Product: [
            { label: "Pricing Plans", href: "Pricing Plans" },
            { label: "Code Generator", href: "Code Generator" },
            { label: "Templates", href: "Templates" },
          ],
        }}
        socialLinks={[
          { href: "#", icon: FaTwitter },
          { href: "#", icon: FaLinkedin },
          { href: "#", icon: FaYoutube },
        ]}
        classname="bg-primary/5 dark:bg-primary/15"
      />
    </main>
  );
}
