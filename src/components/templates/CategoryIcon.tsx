import React from 'react';
import {
  Car,
  Baby,
  Palette,
  Home,
  Utensils,
  PawPrint,
  HeartPulse,
  Sparkles,
  User,
  BarChart3,
  Shirt,
  Music,
  Building2,
  GraduationCap,
  Plane,
  Gamepad2,
  Network,
  Calendar,
  Dumbbell,
  Laptop,
  Banknote,
  Scale
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'Car':
      return <Car className={className} />;
    case 'Baby':
      return <Baby className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'PawPrint':
      return <PawPrint className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'User':
      return <User className={className} />;
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'Shirt':
      return <Shirt className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Plane':
      return <Plane className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'Network':
      return <Network className={className} />;
    case 'Calendar':
      return <Calendar className={className} />;
    case 'Dumbbell':
      return <Dumbbell className={className} />;
    case 'Laptop':
      return <Laptop className={className} />;
    case 'Banknote':
      return <Banknote className={className} />;
    case 'Scale':
      return <Scale className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
