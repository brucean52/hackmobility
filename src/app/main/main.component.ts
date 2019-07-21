import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  searchInput: string = '';
  onKeyChange(event) {
    if (event.key === 'Enter') {
      console.log('search', this.searchInput);
      // submit
    }
  }
}
