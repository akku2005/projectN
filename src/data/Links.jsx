import {
  RiBankLine,
  RiDashboardLine,
  RiPagesLine,
  RiRefund2Line,
} from "react-icons/ri";
import { RouterData } from "../router/RouterData";

export const SideBarLinks = [
  {
    icon: <RiDashboardLine />,
    label: "Dashboard",
    to: RouterData.root.dashboard,
  },
  {
    icon: <RiPagesLine />,
    label: "Campaigns",
    to: RouterData.root.campaigns,
  },
  {
    icon: <RiBankLine />,
    label: "Payments",
    to: RouterData.root.payments,
  },
  {
    icon: <RiRefund2Line />,
    label: "Referrals",
    to: RouterData.root.referrals,
  },
];
