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
    url: '/dashboard',
    
  },
  {
    name: 'chercher un livre',
    url: '/recherche',
    icon: 'icon-cursor',

  },
  
  {
    name: 'Déposer livre',
    url: '/deposit',
    icon: 'icon-cursor',

  },
  {
    name: 'Don de livre',
    url: '/don',
    icon: 'icon-cursor',

  },
  {
    name: 'Contact',
    url : '/contact',
    icon: 'icon-cursor',
  }
 
  
    
     
  
];
