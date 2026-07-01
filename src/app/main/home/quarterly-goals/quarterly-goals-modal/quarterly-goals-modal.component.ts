import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { QuarterlyGoalsModalAnimations } from './quarterly-goals-modal.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { getQuarterAndYear } from 'src/app/core/utils/time.utils';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

interface Goal {
  text: string
  topic: string
}

@Component({
  selector: 'app-quarterly-goals-modal',
  templateUrl: './quarterly-goals-modal.component.html',
  styleUrls: ['./quarterly-goals-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterlyGoalsModalAnimations,
  standalone: true,
  imports: [ MatIcon, MatDialogClose, MatInputModule, MatSelectModule, MatFormFieldModule, CdkDrag, CdkDropList
  ],
})
export class QuarterlyGoalsModalComponent implements OnInit {
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
  goals: WritableSignal<Goal[]>=signal([
    {text: "Technical interview prep", topic:"#interview-technical"},
    {text: "Apply to all internships", topic:"#apply-internships"},
    {text: "Do well in algorithms class", topic:"#class-algorithms"},
    {text: "Enter your goal...", topic:"#hashtag..."},
  ])

   topics: string[] = ['#interview-technical', '#apply-internships', '#class-algorithms']
                                       
  // --------------- COMPUTED DATA -----------------------

  getQuarterAndYear = getQuarterAndYear;

  // --------------- EVENT HANDLING ----------------------
  currentGoalText = '';
  
  onAddGoal() {
    if (!this.currentGoalText.trim()) return; 
    const newGoal: Goal = { text: this.currentGoalText, topic: '' };
    this.goals.update(current => [...current, newGoal]);
    this.currentGoalText = ''; 
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
