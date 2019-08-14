import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, AsyncPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { DepositComponent } from './views/deposit/deposit.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { DonComponent } from './views/don/don.component';
import { RechercheComponent } from './views/recherche/recherche.component';
import { AuthService } from './services/Auth/auth.service';
import { ContactComponent } from './views/contact/contact.component';
import { ProfileComponent } from './views/profile/profile.component';
import { BooksService } from './services/books/books.service';
import { PublicationService } from './services/publication/publication.service';
import { ConfirmationComponent } from './views/confirmation/confirmation.component';
import { EditProfilPictureModalComponent } from './edit-profil-picture-modal/edit-profil-picture-modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProfilCoordonneeModalComponent } from './edit-profil-coordonnee-modal/edit-profil-coordonnee-modal.component';
import { DeletePublicationModalComponent } from './delete-publication-modal/delete-publication-modal.component';
import { PublicatinDetailsModalComponent } from './publicatin-details-modal/publicatin-details-modal.component';
import { UpdatePublicationModalComponent } from './update-publication-modal/update-publication-modal.component';
import { ListeLivreDedonComponent } from './views/liste-livre-dedon/liste-livre-dedon.component';
import { TousLesLivresComponent } from './tous-les-livres/tous-les-livres.component';
import { MessagingService } from './services/messaging.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { ChatComponent } from './views/chat/chat.component';
import { ChatService } from './chat.service';
import { AddDonComponent } from './add-don/add-don.component';
import { MyfilterPipe } from './myfilter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModalModule,
    AngularFireMessagingModule,

    
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    DepositComponent,
    DonComponent,
    RechercheComponent,
    ContactComponent,
    ProfileComponent,
    ConfirmationComponent,
    EditProfilPictureModalComponent,
    EditProfilCoordonneeModalComponent,
    DeletePublicationModalComponent,
    PublicatinDetailsModalComponent,
    UpdatePublicationModalComponent,
    ListeLivreDedonComponent,
    TousLesLivresComponent,
    ChatComponent,
    AddDonComponent,
    MyfilterPipe
  ],
  entryComponents: [EditProfilPictureModalComponent,AddDonComponent,EditProfilCoordonneeModalComponent,DeletePublicationModalComponent,UpdatePublicationModalComponent,PublicatinDetailsModalComponent],
  providers: [AuthService,PublicationService,MessagingService, AsyncPipe,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
