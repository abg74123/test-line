import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import liff from "@line/liff";

liff.init({liffId:'2002624343-g6braWW3',withLoginOnExternalBrowser: true})

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
