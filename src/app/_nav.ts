interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Thakafni',
    url: '/first-layout',
    icon: 'icon-home',
    

    
  },
  {
    name: 'Chercher un livre',
    url: '/recherche',
    icon: 'icon-cursor',

  },
  
  {
    name: 'Déposer un livre',
    url: '/deposit',
    icon: 'icon-plus',

  },
  {
    name: 'Don',
    url: '/don',
    icon: 'icon-plus',

  },
   
  {
    name: 'Contact',
    url : '/contact',
    icon: 'icon-user',
  }
  
];
