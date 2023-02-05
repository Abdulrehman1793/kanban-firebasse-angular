import { Component, Inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from '../board.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-create-board',
  template: `
    <h1 mat-dialog-title>Board</h1>
    <div mat-dialog-content>
      <p>What shall we call this board?</p>
      <mat-form-field>
        <input placeholder="title" matInput [(ngModel)]="data.title" />
      </mat-form-field>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-raised-button color="warn" (click)="onClose()">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        cdkFocusInitial
        (click)="onSave()"
      >
        Create
      </button>
    </div>
  `,
  styleUrls: ['./dialog.scss'],
})
export class CreateBoardComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateBoardComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: Board
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
  }

  onSave() {
    if (this.data.title) {
      this.boardService
        .createBoard({
          ...this.data,
          tasks: [
            { description: 'Hello', label: 'yellow', time: Timestamp.now() },
          ],
        })
        .then((response) => {
          this.dialogRef.close(response.id);
        });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
