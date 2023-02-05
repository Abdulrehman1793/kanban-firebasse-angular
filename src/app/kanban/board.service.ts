import { Injectable } from '@angular/core';

import { Auth, authState } from '@angular/fire/auth';

import {
  Firestore,
  collection,
  doc,
  setDoc,
  addDoc,
  collectionSnapshots,
  query,
  arrayUnion,
  updateDoc,
  orderBy,
  arrayRemove,
  where,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Board, Task } from './board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  /**
   * List all board for the current user
   */
  async getUserBoards() {
    await authState(this.auth);
    const user = this.auth.currentUser;

    const q = query(
      collection(this.firestore, 'boards'),
      orderBy('priority', 'asc'),
      where('uid', '==', user?.uid)
    );

    const snaps = await collectionSnapshots(q);

    return snaps.pipe(
      map((values) => {
        return values.map((value) => {
          let board = value.data() as Board;
          return { id: value.id, ...board };
        });
      })
    );
  }

  /**
   * Creates new board for the current user
   */
  async createBoard(data: Board) {
    await authState(this.auth);
    const user = this.auth.currentUser;

    return addDoc(collection(this.firestore, 'boards'), {
      ...data,
      uid: user?.uid,
    });
  }

  /**
   * Update board for the current user
   */
  async addTaskToExistingBoard(boardId: string, task: Task) {
    return updateDoc(doc(this.firestore, 'boards/' + boardId), {
      tasks: arrayUnion(task),
    });
  }

  // Update priority
  async updateBoardsPriority(boardId: string, priority: number) {
    return updateDoc(doc(this.firestore, 'boards/' + boardId), {
      priority,
    });
  }

  async taskActionBoard(boardId: string, task: Task) {
    // console.log('Board::' + boardId, task);

    return updateDoc(doc(this.firestore, 'boards/' + boardId), {
      tasks: arrayRemove(task),
    });
  }

  async updateTasksOfBoardOnTransfer(boardId: string, tasks: Task[]) {
    return updateDoc(doc(this.firestore, 'boards/' + boardId), {
      tasks,
    });
  }
}
