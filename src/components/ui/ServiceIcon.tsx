import type { IconType } from 'react-icons';
import {
  FiBox,
  FiBriefcase,
  FiClipboard,
  FiGrid,
  FiHome,
  FiLayers,
  FiPackage,
  FiTool,
} from 'react-icons/fi';

const icons: Record<string, IconType> = {
  home: FiHome,
  building: FiBriefcase,
  renovation: FiTool,
  clipboard: FiClipboard,
  joinery: FiPackage,
  ceilings: FiLayers,
  paving: FiGrid,
  concrete: FiBox,
};

interface ServiceIconProps {
  name: string;
  className?: string;
}

/** Maps the service icon token to a Feather icon. */
export function ServiceIcon({ name, className = 'h-6 w-6' }: ServiceIconProps) {
  const Icon = icons[name] ?? FiTool;
  return <Icon className={className} aria-hidden="true" />;
}
