import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-dev-thougts',
  imports: [],
  templateUrl: './dev-thougts.html',
  styleUrl: './dev-thougts.css'
})
export class DevThougts implements AfterViewInit {
    ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
  }
}
