"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { useAuthModal } from "./modals/AuthModal";

export const StomDentLogo = () => {
  return (
    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
        <path d="M12 4.5V19.5M8 8.5H16M8 12.5H16M8 16.5H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </div>
  );
};

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-700">
    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-700">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DentalIcons = {
  home: "🏠",
  about: "👨‍⚕️",
  services: "🦷",
  contacts: "📞",
  login: "📅",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { openModal } = useAuthModal();

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const menuItems = [
    { name: "Главная", href: "/", icon: DentalIcons.home },
    { name: "О клинике", href: "/about", icon: DentalIcons.about },
    { name: "Контакты", href: "/contacts", icon: DentalIcons.contacts },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 py-3"
      shouldHideOnScroll={false}
      maxWidth="2xl"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors ml-2"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand className="max-w-[140px] mr-4">
          <StomDentLogo />
          <p className="font-bold text-gray-900 ml-2 text-sm truncate">StomDent</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand className="lg:mr-12 md:mr-6 ml-4">
          <StomDentLogo />
          <p className="font-bold text-gray-900 ml-3 lg:text-xl md:text-lg">StomDent</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex lg:gap-8 md:gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              color="foreground"
              href={item.href}
              className="text-gray-700 hover:text-cyan-600 transition-colors duration-200 font-medium lg:text-base md:text-sm py-2 lg:px-3 md:px-2 rounded-lg hover:bg-cyan-50"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button 
            onPress={() => openModal("login")} 
             className="bg-blue-200 hover:bg-blue-800 hover:text-blue-200 text-blue-800 font-medium"
          >
            Войти
          </Button>
        </NavbarItem>
        
      </NavbarContent>

      <NavbarMenu className="bg-white/95 backdrop-blur-md fixed top-0 left-0 w-full h-screen z-50 pt-16 px-4">
        <div className="absolute top-4 left-4">
          <button
            onClick={closeMenu}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1">
            {menuItems.map((item) => (
              <NavbarMenuItem key={item.name} className="border-b border-gray-100">
                <Link
                  className="w-full py-4 text-gray-700 hover:text-cyan-600 text-base font-medium flex items-center gap-3 hover:bg-cyan-50 rounded-lg px-3"
                  href={item.href}
                  onPress={closeMenu}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>

          <div className="pb-8 pt-4">
            <div className="flex flex-col gap-3">
              <Button 
                onPress={() => {
                  openModal("login");
                  closeMenu();
                }} 
                className="bg-blue-200 hover:bg-blue-800 hover:text-blue-200 text-blue-800 font-medium"
                fullWidth
              >
                Войти
              </Button>
          
            </div>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}