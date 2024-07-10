import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconLockAccess,
  IconAppWindow,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },

  // {
  //   id: uniqueId(),
  //   title: "Modern",
  //   icon: IconAperture,
  //   href: "/",
  //   chip: "",
  //   chipColor: "secondary",
  // },
  // {
  //   id: uniqueId(),
  //   title: "eCommerce",
  //   icon: IconShoppingCart,
  //   href: "/dashboards/ecommerce",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Factory",
  //   icon: IconShoppingCart,
  //   href: "/dashboards/factory",
  // },
  {
    id: uniqueId(),
    title: "Energy Retailer",
    icon: IconStar,
    href: "/dashboards/energy-retailer",
  },
  {
    navlabel: true,
    subheader: "Apps",
  },
  {
    id: uniqueId(),
    title: "Brands",
    icon: IconChartDonut3,
    href: "/dashboards/brands/",
    children: [
      {
        id: uniqueId(),
        title: "Compare Your Bill",
        icon: IconPoint,
        href: "/dashboards/compare-your-bill",
      },
      {
        id: uniqueId(),
        title: "Deal Expert",
        icon: IconPoint,
        href: "/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
      },
      {
        id: uniqueId(),
        title: "Check Your Bills",
        icon: IconPoint,
        href: "/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
      },
    ],
  },
];

export default Menuitems;
