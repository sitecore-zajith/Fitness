import type { ComponentType } from "react";
import { FaAppleAlt, FaDumbbell, FaHeartbeat, FaLeaf, FaRunning, FaUserFriends } from "react-icons/fa";

/**
 * Maps the ServiceItem.IconName field (authored in Sitecore) to a react-icons component.
 * Add an entry here when authors need a new icon.
 */
const SERVICE_ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  FaAppleAlt,
  FaDumbbell,
  FaHeartbeat,
  FaLeaf,
  FaRunning,
  FaUserFriends,
};

interface ServiceIconProps {
  name?: string;
  size?: number;
  className?: string;
}

export default function ServiceIcon({ name, size = 40, className = "text-primary" }: ServiceIconProps) {
  const Icon = (name && SERVICE_ICONS[name]) || FaHeartbeat;
  return <Icon size={size} className={className} />;
}

