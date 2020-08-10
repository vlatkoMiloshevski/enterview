import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  routerUrl: string;

  constructor(
    private router: Router,
  ) {
    this.routerUrl = router.url;
  }

  onActivate() {
    interval(1000).pipe(first()).subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  navigateToUrl(route) {
    this.router.navigateByUrl(route);
  }
}
