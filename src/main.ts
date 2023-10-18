import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LoginService } from './app/services/login.service';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

