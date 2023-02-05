import { Component, Inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from '../board.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-create-task',
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea
          placeholder="Task description"
          matInput
          [(ngModel)]="data.task.description"
        ></textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.task.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">{{
            opt === 'gray' ? 'check_circle' : 'lens'
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button cdkFocusInitial (click)="onSave()">
        {{ data.isNew ? 'Add Task' : 'Update Task' }}
      </button>
      <!-- <app-delete-button
      (delete)="handleTaskDelete()"
      *ngIf="!data.isNew"
    ></app-delete-button> -->
    </div>
  `,
  styleUrls: ['./dialog.scss'],
})
export class CreateTaskComponent implements OnInit {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onSave() {
    if (
      this.data.boardId &&
      this.data.task &&
      this.data.task.description &&
      this.data.task.label
    ) {
      this.boardService
        .addTaskToExistingBoard(this.data.boardId, {
          ...this.data.task,
          time: Timestamp.now(),
        })
        .then((response) => {
          this.dialogRef.close(response);
        });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
