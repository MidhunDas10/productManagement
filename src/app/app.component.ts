import { Component , OnInit  } from '@angular/core';
import { LocalStorageServiceService } from './services/local-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'ProductManagement';
  constructor(
    private localStorageService: LocalStorageServiceService
  ) {}
  ngOnInit(): void {
    this.localStorageService.setData()
  }
}
