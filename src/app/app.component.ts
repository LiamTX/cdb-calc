import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  investmentDate: Date = new Date();
  cdbRate: number = 0;
  currentDate: Date = new Date();

  constructor(private apiService: ApiService) { }

  
}
