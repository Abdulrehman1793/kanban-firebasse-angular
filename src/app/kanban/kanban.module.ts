import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { KanbanRoutingModule } from './kanban-routing.module';
import { BoardsComponent } from './boards/boards.component';
import { CreateBoardComponent } from './dialog/create-board.component';
import { CreateTaskComponent } from './dialog/create-task.component';

const materialModules = [
  DragDropModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
];

@NgModule({
  declarations: [BoardsComponent, CreateBoardComponent, CreateTaskComponent],
  imports: [CommonModule, KanbanRoutingModule, FormsModule, ...materialModules],
})
export class KanbanModule {}
