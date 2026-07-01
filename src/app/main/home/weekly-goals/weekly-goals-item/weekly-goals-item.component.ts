import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { WeeklyGoalsItemAnimations } from './weekly-goals-item.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { WeeklyGoalData } from '../../home.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { WEEKLYGOAL_DB } from 'src/app/core/store/weekly-goal/weekly-goal.mock';
import { WeeklyGoal } from 'src/app/core/store/weekly-goal/weekly-goal.model';
import { HASHTAG_DB } from 'src/app/core/store/hashtag/hashtag.mock';
import { Hashtag } from 'src/app/core/store/hashtag/hashtag.model';

@Component({
  selector: 'app-weekly-goals-item',
  templateUrl: './weekly-goals-item.component.html',
  styleUrls: ['./weekly-goals-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsItemAnimations,
  standalone: true,
  imports: [ MatCheckbox, MatProgressSpinner
  ],
})
export class WeeklyGoalsItemComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;
  goal = input<WeeklyGoal>();
  hashtag = input<Hashtag|undefined>();

  // --------------- LOCAL UI STATE ----------------------

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);
  // goalText: string = 'Apply to Microsoft';
  // hashText: string = 'apply-internships';
  //goal = input<WeeklyGoalData>();

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
    @Inject(BATCH_WRITE_SERVICE) private batch: BatchWriteService,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------
  
  ngOnInit(): void {
  }
}
