"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Link, Text, type LinkField } from "@sitecore-content-sdk/nextjs";
import { FiMenu, FiX } from "react-icons/fi";
import MissingDatasource from "./shared/MissingDatasource";
import type { BrandIdentityFields, ComponentProps, NavigationLinkItemFields, SitecoreItem } from "./shared/types";

/** Organisms/Navbar (inherits _BaseBrandIdentity) */
export interface NavbarFields extends BrandIdentityFields {
  NavigationLinks?: SitecoreItem<NavigationLinkItemFields>[];
  DesktopCtaLink?: LinkField;
  MobileCtaLink?: LinkField;
}

type NavbarProps = ComponentProps & { fields?: NavbarFields };

export const Default = ({ fields }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!fields) return <MissingDatasource componentName="Navbar" />;

  const navLinks = fields.NavigationLinks ?? [];

  return (
    <nav className="fixed w-full bg-background/90 backdrop-blur-md z-50 shadow-sm top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <NextLink href="/" className="font-heading text-2xl font-bold text-primary">
              <Text field={fields.BrandPrefix} tag="span" />
              <Text field={fields.BrandSuffix} tag="span" className="text-foreground" />
            </NextLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                field={item.fields.TargetLink}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                <Text field={item.fields.LinkTitle} />
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex">
            {fields.DesktopCtaLink && (
              <Link
                field={fields.DesktopCtaLink}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              />
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                field={item.fields.TargetLink}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <Text field={item.fields.LinkTitle} />
              </Link>
            ))}
            {fields.MobileCtaLink && (
              <Link
                field={fields.MobileCtaLink}
                className="block mt-4 px-3 py-2 text-center text-base font-medium text-primary-foreground bg-primary rounded-md"
                onClick={() => setIsOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

