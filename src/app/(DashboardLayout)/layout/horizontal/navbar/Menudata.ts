import {
  IconHome,
  IconPoint,
  IconApps,
  IconClipboard,
  IconFileDescription,
  IconBorderAll,
  IconZoomCode,
  IconRotate,
  IconUserPlus,
  IconLogin,
  IconAlertCircle,
  IconSettings,
} from '@tabler/icons-react';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome,
    href: '/dashboards/',
    children: [
      {
        id: uniqueId(),
        title: 'Modern',
        icon: IconPoint,
        href: '/',
        chip: 'New',
        chipColor: 'secondary',
      },
      {
        id: uniqueId(),
        title: 'eCommerce',
        icon: IconPoint,
        href: '/dashboards/ecommerce',
      },
      {
        id: uniqueId(),
        title: 'Factory',
        icon: IconPoint,
        href: '/dashboards/factory',
      },
    ],
  },
  // {
  //   id: uniqueId(),
  //   title: 'Apps',
  //   icon: IconApps,
  //   href: '/apps/',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Contacts',
  //       icon: IconPoint,
  //       href: '/apps/contacts',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Chats',
  //       icon: IconPoint,
  //       href: '/apps/chats',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Notes',
  //       icon: IconPoint,
  //       href: '/apps/notes',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Calendar',
  //       icon: IconPoint,
  //       href: '/apps/calendar',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Email',
  //       icon: IconPoint,
  //       href: '/apps/email',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Tickets',
  //       icon: IconPoint,
  //       href: '/apps/tickets',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'User Profile',
  //       icon: IconPoint,
  //       href: '/user-profile',
  //       children: [
  //         {
  //           id: uniqueId(),
  //           title: 'Profile',
  //           icon: IconPoint,
  //           href: '/user-profile',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Followers',
  //           icon: IconPoint,
  //           href: '/apps/followers',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Friends',
  //           icon: IconPoint,
  //           href: '/apps/friends',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Gallery',
  //           icon: IconPoint,
  //           href: '/apps/gallery',
  //         },
  //       ],
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Ecommerce',
  //       icon: IconPoint,
  //       href: '/apps/ecommerce/',
  //       children: [
  //         {
  //           id: uniqueId(),
  //           title: 'Shop',
  //           icon: IconPoint,
  //           href: '/apps/ecommerce/shop',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Detail',
  //           icon: IconPoint,
  //           href: '/apps/ecommerce/detail/1',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'List',
  //           icon: IconPoint,
  //           href: '/apps/ecommerce/eco-product-list',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Checkout',
  //           icon: IconPoint,
  //           href: '/apps/ecommerce/eco-checkout',
  //         },
  //       ],
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Blog',
  //       icon: IconPoint,
  //       href: '/apps/blog/',
  //       children: [
  //         {
  //           id: uniqueId(),
  //           title: 'Posts',
  //           icon: IconPoint,
  //           href: '/apps/blog/posts',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Detail',
  //           icon: IconPoint,
  //           href: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
  //         },
  //       ],
  //     },
  //   ],
  // },

];
export default Menuitems;
