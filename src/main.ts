import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';
import { TaskListComponent } from './app/components/task-list/task-list.component';

const routes: Route[] = [{ path: '', component: TaskListComponent }];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
