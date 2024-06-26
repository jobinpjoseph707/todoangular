import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableSelectionExample } from "./pages/todopage/todopage.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TableSelectionExample]
})
export class AppComponent {
  title = 'api-todo';
}
