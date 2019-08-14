import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { DepositComponent } from './views/deposit/deposit.component';
import { DonComponent } from './views/don/don.component';
import { RechercheComponent } from './views/recherche/recherche.component';
import { ContactComponent } from './views/contact/contact.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ConfirmationComponent } from './views/confirmation/confirmation.component';
import { Profile } from 'selenium-webdriver/firefox';
import { ListeLivreDedonComponent } from './views/liste-livre-dedon/liste-livre-dedon.component';
import { TousLesLivresComponent } from './tous-les-livres/tous-les-livres.component';
import { ChatComponent } from './views/chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },


  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    data: {
      title: 'Confirmation Page'
    }
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: {
      title: 'Chat Page'
    }
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    
    children: [
      {
        path: 'recherche',
        component: RechercheComponent,
        data: {
          title: 'Recherche Livre'
        },
      },
      {
        path: 'deposit',
        component: DepositComponent,
        data: {
          title: 'Desposer Livre'
        },

      },
      {
        path: 'don',
        component: DonComponent,
        data: {
          title: 'Don de livre'
        },
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: {
          title: 'Contact'
        },
      },
      {
        path: 'tous-les-livres',
        component: TousLesLivresComponent,
        data: {
          title: 'Tous les livres'
        },
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      },

      
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        },
      },
      {
        path: 'liste-livre-dedon',
        component: ListeLivreDedonComponent,
        data: {
          title: 'Tous les livres de don'
        },
      },
    ]

  },

  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
