import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';  // <-- #1 import module
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {CommentService} from './services/comment.service';

import {NgxMaskModule} from 'ngx-mask';

// add JavaScript imports
import {FormComponent} from './components/form/form.component';
import {InfoComponent} from './components/info/info.component';
import { StatComponent } from './components/stat/stat.component';

const appRoutes: Routes = [
    {
        path: 'view',
        component: InfoComponent,
    },
    {
        path: 'stat',
        component: StatComponent,
    },
    {
        path: 'comment',
        component: FormComponent,
    },
    {
        path: '',
        redirectTo: '/comment',
        pathMatch: 'full'
    },
];

@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        InfoComponent,
        StatComponent,
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxMaskModule.forRoot()
    ],
    providers: [CommentService],
    bootstrap: [AppComponent],
    exports: [
        AppComponent,
    ],
})

export class AppModule {
}

