import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: string;
}

@Component({
  selector: 'app-todopage',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule,NgClass,MatIconModule],
  templateUrl: './todopage.component.html',
  styleUrl: './todopage.component.scss'
})
export class TableSelectionExample implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'title', 'completed','Edit','Delete'];
  dataSource = new MatTableDataSource<Todo>([]);
  selection = new SelectionModel<Todo>(true, []);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').subscribe({
      next: (todos) => {
        this.dataSource.data = todos.map(todo => ({
          ...todo,
          completed: todo.completed ? 'Yes' : 'No'
        }));
        const completedTasks = this.dataSource.data.filter(todo => this.isCompleted(todo.completed));
        this.selection = new SelectionModel<Todo>(true, completedTasks);
  
        console.log('Fetched todos:', this.dataSource.data);
            },
      error: (error) => {
        console.error('Error fetching todos:', error);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    this.selection.select(...this.dataSource.data.filter(row => this.isCompleted(row.completed)));
  } else {
    this.selection.select(...this.dataSource.data);
  }
  }
  checkboxLabel(row?: Todo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  toggleCheckbox(row: Todo, event: Event) {
    event.stopPropagation();
    if (!this.isCompleted(row.completed)) {
      this.selection.toggle(row);
    }
  }

  isCompleted(status: string): boolean {
    return status.toLowerCase() === 'yes';
  }
}