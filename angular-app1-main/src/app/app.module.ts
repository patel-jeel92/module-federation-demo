import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AComponent } from './a/a.component';
import AppComponent from './app.component';
import { BComponent } from './b/b.component';

@NgModule({
  imports: [
    BrowserModule,
    // RouterModule.forRoot([
    //   { matcher: endsWith('a'), component: AComponent},
    //   { matcher: endsWith('b'), component: BComponent},
    // ])
  ],
  declarations: [AComponent, BComponent, AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {
  constructor(private injector: Injector) {}

  // ngDoBootstrap() {
  //   const ce = createCustomElement(AppComponent, { injector: this.injector });
  //   customElements.define('angular1-element', ce);
  // }
}
