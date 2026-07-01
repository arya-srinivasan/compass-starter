import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyGoalsModalAnimations } from './weekly-goals-modal.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { endOfWeek, startOfWeek } from 'src/app/core/utils/time.utils';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface Goal{
     text: string;
     category: string;
}

@Component({
  selector: 'app-weekly-goals-modal',
  templateUrl: './weekly-goals-modal.component.html',
  styleUrls: ['./weekly-goals-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsModalAnimations,
  standalone: true,
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    DragDropModule,
    CommonModule,
  ],
})
export class WeeklyGoalsModalComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;
  closeModal = output<void>();
  onClose() {
    this.closeModal.emit();
  }

  // --------------- LOCAL UI STATE ----------------------

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);
  goals: WritableSignal<Goal[]> = signal([
    {text: "Finish Google cover letter", category:"#apply-internships"},
    {text: "Apply to Microsoft", category:"#apply-internships"},
    {text: "Practice implementing data structures", category:"#class-algorithms"},
    {text: "Enter your goal...", category:"quarterly goal..."},
    
  ])

  categories: string[] = ['#apply-internships', '#class-algorithms', '#work'];
  
  // --------------- COMPUTED DATA -----------------------
  endOfWeek = endOfWeek; // import from time.utils.ts

  startOfWeek = startOfWeek; // import from time.utils.ts

  // --------------- EVENT HANDLING ----------------------

  // getCategoryStyles(goal: Goal){
  //   let color: string;
  //   switch (goal.category){
  //       case '#apply-internships':
  //         color='#2DBDB1';
  //         break;
  //       case '#class-algorithms':
  //         color='#FFB987';
  //         break;
  //       default:
  //         color='#4B5853';
  //   }
  //   return{'color': color}
  // }
  
  onAddGoal(event: Event){
    const input = event.target as HTMLInputElement;
    const newGoal: Goal = {text: input.value, category:''};
    this.goals.update(current => [...current, newGoal]);
    input.value = '';    
  }

  async onSave(){
    this.loading.set(true);
    try{
      await this.batch.batchWrite(
        ({batch}) => {},
        {loading: this.loading}
      );
      this.closeModal.emit();
    } catch(error){
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

  onDrop(event: CdkDragDrop<Goal[]>){
    const updated = [...this.goals()];
    moveItemInArray(updated, event.previousIndex, event.currentIndex);
    this.goals.set(updated);
  }
  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
    @Inject(BATCH_WRITE_SERVICE) private batch: BatchWriteService,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------
  
  ngOnInit(): void {
  }
}
