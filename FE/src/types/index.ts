export interface MegaMenuColumn {
  title: string;
  data: string[];
}

export interface MegaMenuData {
  carMakes: string[];
  carBodyTypes: string[];
  priceRanges: string[];
  fuelTypes: string[];
  years: string[];
  discounts: string[];
}

export interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FooterLink {
  title: string;
  links: {
    text: string;
    href: string;
  }[];
} 