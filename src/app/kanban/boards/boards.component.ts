import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { BoardService } from '../board.service';
import { CreateBoardComponent } from '../dialog/create-board.component';
import { Board, Task } from '../board.model';
import { CreateTaskComponent } from '../dialog/create-task.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boards: Board[] = [];

  constructor(private boardService: BoardService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.boardService.getUserBoards().then((response) => {
      response.subscribe((values) => {
        this.boards = values;
      });
    });
  }

  onCreateBoardDialog() {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      data: {
        priority: this.boards.length,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  addTaskDialog(board: any, task?: Task, idx?: number) {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: board.id, idx }
        : { task: newTask, isNew: true, boardId: board.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
