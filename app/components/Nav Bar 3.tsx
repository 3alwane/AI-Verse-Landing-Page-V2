
 "use client";
 
 import * as React from "react";
 import Link from "next/link";
 import { motion, useScroll, useMotionValueEvent } from "framer-motion";
 
 import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
 } from "@/components/ui/navigation-menu";
 
 import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
 } from "@/components/ui/sheet";
 
 import { Users, MenuIcon, BookOpen, Info, Home, HomeIcon } from "lucide-react";
 
 import { Button, buttonVariants } from "@/components/ui/button";
 import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion";
 import { VariantProps } from "class-variance-authority";
 import {
   MdApps,
   MdBolt,
   MdCategory,
   MdHome,
   MdOtherHouses,
 } from "react-icons/md";
 import { RiAppStoreFill } from "react-icons/ri";
 
 type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
 
 type BaseButtonProps = {
   text?: string;
   className?: string;
   variant?: ButtonVariant;
   isVisible?: boolean;
 };
 
 type ButtonClickProps = BaseButtonProps & {
   onClick?: () => void;
   urlLink?: never;
 };
 
 type ButtonUrlProps = BaseButtonProps & {
   onClick?: never;
   urlLink?: string;
 };
 
 type ButtonProps = ButtonClickProps | ButtonUrlProps;
 
 interface NavBar3Props<T extends MenuItem> {
   domain?: {
     name?: string | React.ReactNode;
     logo?: React.ReactNode;
   };
   navigationMenu?: T[];
   isSticky?: boolean;
   authLinks?: {
     login?: ButtonProps;
     register?: ButtonProps;
   };
   leftAddon?: React.ReactNode;
   hideMainNavigationIcons?: boolean;
   className?: string;
   logoPosition?: "left" | "center";
 }
 
 export interface MenuItem {
   title: string;
   url: string;
   icon?: React.ReactNode;
   subMenu?: SubMenu[];
 }
 
 export interface SubMenu {
   title: string;
   description?: string;
   url?: string;
   icon?: React.ReactNode;
 }
 
 interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
   href: string;
   title: string;
   description?: string;
   icon?: React.ReactNode;
   children?: React.ReactNode;
   hideMainNavigationIcons?: boolean;
 }
 
 const mainMenu: MenuItem[] = [
   {
     title: "Home",
     icon: <Home />,
     url: "/",
   },
   {
     title: "App",
     icon: <RiAppStoreFill />,
     url: "/app",
   },
   {
     title: "Others",
     url: "#",
     icon: <MdOtherHouses />,
     subMenu: [
       {
         title: "Our Story",
         url: "/about/story",
         description: "Learn about our mission and values.",
         icon: <BookOpen />,
       },
       {
         title: "Team",
         url: "/about/team",
         description: "Meet the people behind our success.",
         icon: <Users />,
       },
       {
         title: "FAQs",
         url: "/support/faq",
         description: "Frequently Asked Questions.",
         icon: <Info />,
       },
     ],
   },
 ];
 
 export function NavBar3<T extends MenuItem>(navBar3Props: NavBar3Props<T>) {
   const [isScrolled, setIsScrolled] = React.useState(false);
   const [hidden, setHidden] = React.useState(false);
   const { scrollY } = useScroll();
 
   const {
     domain = {
       name: (
         <h1 className="flex items-center gap-2 text-3xl max-sm:hidden">
           <span className="font-bold text-primary">Bolt</span>
           <span className="font-light">Stack</span>
         </h1>
       ),
       logo: <MdBolt className="h-8 w-8 text-primary" />,
     },
     isSticky = true,
     hideMainNavigationIcons = false,
     authLinks,
     leftAddon,
     className,
     navigationMenu,
     logoPosition = "center",
     ...props
   } = navBar3Props;
 
   const [isClient, setIsClient] = React.useState(false);
   const defaultNavigationMenu = navigationMenu ?? mainMenu;
 
   React.useEffect(() => {
     setIsClient(true);
   }, []);
 
   // Handle scroll state and hide/show direction logic
   useMotionValueEvent(scrollY, "change", (latest) => {
     const previous = scrollY.getPrevious() ?? 0;
     setIsScrolled(latest > 20);
 
     if (isSticky) {
       if (latest > previous && latest > 100) {
         setHidden(true); // Scrolling down
       } else {
         setHidden(false); // Scrolling up
       }
     }
   });
 
   const { login = {}, register = {} } = authLinks || {};
 
   const {
     className: loginClassName = "rounded-2xl",
     isVisible: isLoginVisbile = true,
     onClick: onLoginClicked,
     text: loginText = "Login",
     urlLink: urlLoginUrl = "",
     variant: loginVariant = "secondary",
   } = login;
 
   const {
     className: registerClassName = "rounded-2xl",
     isVisible: isRegisterVisible = true,
     onClick: onRegisterClicked,
     text: registerText = "Register",
     urlLink: urlRegisterUrl = "",
     variant: registerVariant = "default",
   } = register;
 
   // Updated: Separate CSS classes for sticky and non-sticky states
   const navBarWrapperStickyTailwindCss = `fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
     isScrolled ? "py-2" : "py-4"
   }`;
 
   const navBarWrapperNonStickyTailwindCss = `absolute top-0 left-0 right-0 flex justify-center transition-all duration-300 ${
     isScrolled ? "py-2" : "py-4"
   }`;
 
   const LogoAndNameNode = (
     <Link href={"/"} className="flex items-center justify-center">
       {domain.logo}
       {typeof domain.name === "string" ? (
         <h1 className="text-3xl font-">{domain.name}</h1>
       ) : (
         <div>{domain.name}</div>
       )}
     </Link>
   );
 
   const AnimatedLogo = (
     <motion.div
       initial={{ scale: 0, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{ delay: 0.8, type: "spring" }}
       className="flex-shrink-0 z-10"
     >
       {LogoAndNameNode}
     </motion.div>
   );
 
   const AnimatedNavLinks = (
     <NavigationMenu>
       <NavigationMenuList>
         {defaultNavigationMenu.map((menuItem, index) => {
           const animationDelay = 1.0 + index * 0.1;
 
           if (menuItem.subMenu && menuItem.subMenu.length > 0) {
             return (
               <NavigationMenuItem key={menuItem.title}>
                 <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{
                     delay: animationDelay,
                     type: "spring",
                     stiffness: 300,
                     damping: 24,
                   }}
                 >
                   <NavigationMenuTrigger className="bg-transparent   h-11 text-md rounded-xl hover:bg-accent/80 focus:bg-accent/80 data-[state=open]:bg-accent/80">
                     {/* Added rounded-3xl to trigger hover states */}
                     <div className="flex items-center gap-1.5">
                       {!hideMainNavigationIcons && (
                         <div className="opacity-50 [&>svg]:!w-5 [&>svg]:!h-5">
                           {menuItem.icon}
                         </div>
                       )}
 
                       {menuItem.title}
                     </div>
                   </NavigationMenuTrigger>
                 </motion.div>
                 {/* Added rounded-3xl and overflow-hidden to submenu content */}
                 <NavigationMenuContent className="rounded-4xl overflow-hidden p-2">
                   <ul className="w-[300px]">
                     {menuItem.subMenu.map((subMenuItem) => (
                       <ListItem
                         hideMainNavigationIcons={hideMainNavigationIcons}
                         className=""
                         key={subMenuItem.title}
                         title={subMenuItem.title}
                         description={subMenuItem.description}
                         icon={subMenuItem.icon}
                         href={subMenuItem.url || ""}
                       />
                     ))}
                   </ul>
                 </NavigationMenuContent>
               </NavigationMenuItem>
             );
           }
 
           return (
             <NavigationMenuItem key={menuItem.title}>
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{
                   delay: animationDelay,
                   type: "spring",
                   stiffness: 300,
                   damping: 24,
                 }}
               >
                 <Link href={menuItem.url} legacyBehavior passHref>
                   <Link href={menuItem.url} legacyBehavior passHref>
                     <NavigationMenuLink
                       className={`${buttonVariants({
                         variant: "ghost",
                       })} h-11 px-4 py-5 font-medium bg-transparent text-md rounded-xl hover:bg-accent/80`}
                     >
                       <div className="flex items-center gap-1.5">
                         {!hideMainNavigationIcons && (
                           <div className="opacity-70 [&>svg]:!w-5 [&>svg]:!h-5">
                             {menuItem.icon}
                           </div>
                         )}
 
                         {menuItem.title}
                       </div>
                     </NavigationMenuLink>
                   </Link>
                 </Link>
               </motion.div>
             </NavigationMenuItem>
           );
         })}
       </NavigationMenuList>
     </NavigationMenu>
   );
 
   if (!isClient) return null;
 
   return (
     <motion.header
       {...props}
       animate={
         isSticky ? { y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 } : {}
       }
       transition={{ duration: 0.35, ease: "easeInOut" }}
       className={
         isSticky
           ? navBarWrapperStickyTailwindCss
           : navBarWrapperNonStickyTailwindCss
       }
     >
       <div className="w-[70%] max-lg:w-[65%] max-sm:w-[90%] flex justify-center">
         <motion.nav
           initial={
             logoPosition === "center"
               ? { clipPath: "inset(0 50% 0 50%)", opacity: 0 }
               : { clipPath: "inset(0 0% 0 0%)", opacity: 0, y: -20 }
           }
           animate={{
             clipPath: "inset(0 0% 0 0%)",
             opacity: 1,
             y: 0,
             transitionEnd: { clipPath: "none" },
           }}
           transition={{ duration: 0.8, ease: "easeInOut" }}
           className={`bg-card/40 p-2 flex items-center justify-between h-20 border backdrop-blur-lg w-full transition-colors relative ${
             className || "rounded-3xl shadow-sm"
           }`}
         >
           {/* Desktop View */}
           <div className="hidden lg:flex items-center justify-between w-full gap-8 px-4 py-1">
             <div className="flex-1 flex items-center justify-start z-10">
               {logoPosition === "left" ? AnimatedLogo : AnimatedNavLinks}
             </div>
 
             <div className="flex-shrink-0 flex items-center justify-center z-10">
               {logoPosition === "left" ? AnimatedNavLinks : AnimatedLogo}
             </div>
 
             <div className="flex-1 flex items-center justify-end gap-2 z-10">
               {leftAddon && (
                 <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{
                     delay: 1.0 + defaultNavigationMenu.length * 0.1,
                     type: "spring",
                     stiffness: 300,
                     damping: 24,
                   }}
                 >
                   {leftAddon}
                 </motion.div>
               )}
 
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{
                   delay:
                     1.0 +
                     (defaultNavigationMenu.length + (leftAddon ? 1 : 0)) * 0.1,
                   type: "spring",
                   stiffness: 300,
                   damping: 24,
                 }}
               >
                 <RenderAuthButton
                   className={loginClassName}
                   isVisible={isLoginVisbile}
                   onClick={onLoginClicked}
                   text={loginText}
                   urlLink={urlLoginUrl}
                   variant={loginVariant}
                 />
               </motion.div>
 
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{
                   delay:
                     1.0 +
                     (defaultNavigationMenu.length + (leftAddon ? 1 : 0) + 1) *
                       0.1,
                   type: "spring",
                   stiffness: 300,
                   damping: 24,
                 }}
               >
                 <RenderAuthButton
                   className={registerClassName}
                   isVisible={isRegisterVisible}
                   onClick={onRegisterClicked}
                   text={registerText}
                   urlLink={urlRegisterUrl}
                   variant={registerVariant}
                 />
               </motion.div>
             </div>
           </div>
 
           {/* Mobile View */}
           <div className="lg:hidden flex items-center justify-between w-full px-4 py-2">
             <motion.div
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.8, type: "spring" }}
             >
               {LogoAndNameNode}
             </motion.div>
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{
                 delay: 1.0,
                 type: "spring",
                 stiffness: 300,
                 damping: 24,
               }}
             >
               <Sheet>
                 <SheetTrigger asChild>
                   <Button variant={"outline"} className="rounded-2xl">
                     <MenuIcon />
                   </Button>
                 </SheetTrigger>
                 <SheetContent className="rounded-l-3xl">
                   <SheetHeader>
                     <SheetTitle className="flex items-center justify-start gap-2">
                       {React.isValidElement(domain.logo)
                         ? React.cloneElement(
                             domain.logo as React.ReactElement<any>,
                             { size: "25" },
                           )
                         : domain.logo}
                     </SheetTitle>
                   </SheetHeader>
                   <div className="mt-20">
                     <Accordion type="single" collapsible>
                       {defaultNavigationMenu.map((mainMenuItem) => {
                         if (
                           mainMenuItem.subMenu &&
                           mainMenuItem.subMenu.length > 0
                         ) {
                           return (
                             <AccordionItem
                               key={mainMenuItem.title}
                               value={mainMenuItem.title}
                               className="border-none"
                             >
                               <AccordionTrigger className="text-left font-medium hover:no-underline hover:bg-accent/50 px-2 rounded-2xl">
                                 <div className="flex items-center gap-2">
                                   <div className="opacity-55 [&>svg]:w-5 [&>svg]:h-5">
                                     {mainMenuItem.icon}
                                   </div>
                                   {mainMenuItem.title}
                                 </div>
                               </AccordionTrigger>
                               <AccordionContent className="pb-4 pt-2">
                                 <div className="space-y-2 pl-4">
                                   {mainMenuItem.subMenu.map((subMenuItem) => (
                                     <Link
                                       key={subMenuItem.title}
                                       href={subMenuItem.url || ""}
                                       className="p-2 flex items-center gap-4 rounded-2xl hover:bg-accent text-sm transition-colors"
                                     >
                                       <div className="text-sm">
                                         {React.isValidElement(subMenuItem.icon)
                                           ? React.cloneElement(
                                               subMenuItem.icon as React.ReactElement<any>,
                                               {
                                                 size: 20,
                                                 className:
                                                   "text-muted-foreground",
                                               },
                                             )
                                           : subMenuItem.icon}
                                       </div>
                                       <div>
                                         <div className="font-medium">
                                           {subMenuItem.title}
                                         </div>
                                         {subMenuItem.description && (
                                           <div className="text-muted-foreground text-xs mt-1">
                                             {subMenuItem.description}
                                           </div>
                                         )}
                                       </div>
                                     </Link>
                                   ))}
                                 </div>
                               </AccordionContent>
                             </AccordionItem>
                           );
                         }
                         return (
                           <div key={mainMenuItem.title}>
                             <Link
                               href={mainMenuItem.url}
                               className="flex items-center gap-2 py-3 px-2 font-medium rounded-2xl hover:bg-accent/50 transition-colors"
                             >
                               <div className="[&>svg]:w-5 [&>svg]:h-5">
                                 {mainMenuItem.icon}
                               </div>
                               {mainMenuItem.title}
                             </Link>
                           </div>
                         );
                       })}
                     </Accordion>
                     <div className="mt-10 space-y-2">
                       <RenderAuthButton
                         className={loginClassName}
                         isVisible={isLoginVisbile}
                         onClick={onLoginClicked}
                         text={loginText}
                         urlLink={urlLoginUrl}
                         variant={loginVariant}
                         isInSheet={true}
                       />
                       <RenderAuthButton
                         className={registerClassName}
                         isVisible={isRegisterVisible}
                         onClick={onRegisterClicked}
                         text={registerText}
                         urlLink={urlRegisterUrl}
                         variant={registerVariant}
                         isInSheet={true}
                       />
                     </div>
                   </div>
                 </SheetContent>
               </Sheet>
             </motion.div>
           </div>
         </motion.nav>
       </div>
     </motion.header>
   );
 }
 
 type RequiredButtonsProps = Required<Omit<ButtonProps, "onClick">> & {
   onClick?: () => void;
   isInSheet?: boolean;
 };
 
 function RenderAuthButton({
   className,
   isVisible,
   onClick,
   text,
   urlLink,
   variant,
   isInSheet = false,
 }: RequiredButtonsProps) {
   if (!isVisible) {
     return null;
   }
 
   const containerClasses = isInSheet ? "flex w-full" : "";
 
   return (
     <div className={containerClasses}>
       {onClick ? (
         <Button
           onClick={onClick}
           className={`h-10 cursor-pointer select-none ${
             isInSheet ? "w-full" : ""
           } ${className}`}
           variant={variant}
         >
           <span>{text}</span>
         </Button>
       ) : (
         <Button
           className={`h-10 cursor-pointer select-none ${
             isInSheet ? "w-full" : ""
           } ${className}`}
           variant={variant}
           asChild
         >
           <a className="no-underline" href={urlLink}>
             {text}
           </a>
         </Button>
       )}
     </div>
   );
 }
 
 function ListItem({
   title,
   description,
   icon,
   children,
   href,
   ...props
 }: ListItemProps) {
   return (
     <li {...props}>
       <NavigationMenuLink asChild>
         <Link
           href={href}
           className="block select-none space-y-1 rounded-4xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
         >
           <div className="flex items-start gap-3">
             <span className="flex-shrink-0 pt-1 [&>svg]:w-5 [&>svg]:h-5">
               {icon && <>{icon}</>}
             </span>
             <div>
               <h3 className="leading-none font-medium text-[15px]">{title}</h3>
               {description && (
                 <p className="mt-1 text-sm text-muted-foreground">
                   {description}
                 </p>
               )}
             </div>
           </div>
           {children && (
             <p className="mt-2 text-muted-foreground line-clamp-2 text-sm leading-snug">
               {children}
             </p>
           )}
         </Link>
       </NavigationMenuLink>
     </li>
   );
 }
 


