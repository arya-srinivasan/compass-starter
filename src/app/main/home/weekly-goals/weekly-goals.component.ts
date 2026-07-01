import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { WeeklyGoalsAnimations } from './weekly-goals.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { WeeklyGoalsItemComponent } from './weekly-goals-item/weekly-goals-item.component';
import { WeeklyGoalData } from 'src/app/main/home/home.model';
import { Timestamp } from '@angular/fire/firestore';
import { WEEKLYGOAL_DB } from 'src/app/core/store/weekly-goal/weekly-goal.mock';
import { WeeklyGoal } from 'src/app/core/store/weekly-goal/weekly-goal.model';
import { HASHTAG_DB } from 'src/app/core/store/hashtag/hashtag.mock';
import { Hashtag } from 'src/app/core/store/hashtag/hashtag.model';

@Component({
  selector: 'app-weekly-goals',
  templateUrl: './weekly-goals.component.html',
  styleUrls: ['./weekly-goals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: WeeklyGoalsAnimations,
  standalone: true,
  imports: [ WeeklyGoalsItemComponent,
  ],
})
export class WeeklyGoalsComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;
  /** weekly goal from mock.ts file. */
  task: WeeklyGoal[] = WEEKLYGOAL_DB;
  /** hashtag from mock.ts file. */
  htg: Hashtag[] = HASHTAG_DB;
  
  // --------------- LOCAL UI STATE ----------------------

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);

  /** hashtag map that maps WEEKLYGOAL_DB to HASHTAG_DB based on id */
  hashtagMap = Object.fromEntries(
    this.htg.map((h) => [h.__id, h]),
  );

  //sampleData: WritableSignal<WeeklyGoalData | null> = signal(null);
  // sampleData: WeeklyGoalData = {
  //   __id: 'wg1',
  //   __userId: 'test-user',
  //   __quarterlyGoalId: 'qg1',
  //   __hashtagId: 'ht1',
  //   text: 'Finish Google Cover Letter',
  //   completed: false,
  //   order: 1,
  //   _createdAt: Timestamp.now(),
  //   _updatedAt: Timestamp.now(),
  //   _deleted: false,
  //   hashtag: {
  //     __id: 'ht1',
  //     name: 'apply-internships',
  //     color: '#EE8B72',
  //     _createdAt: Timestamp.now(),
  //     _updatedAt: Timestamp.now(),
  //     _deleted: false,
  //   },
  // };

  // --------------- COMPUTED DATA -----------------------

  // --------------- EVENT HANDLING ----------------------

  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
    @Inject(BATCH_WRITE_SERVICE) private batch: BatchWriteService,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------
  
  ngOnInit() {
    // setTimeout(() => {
    //   this.sampleData.set({
    //     __id: 'wg1',
    //     __userId: 'test-user',
    //     __hashtagId: 'ht1',
    //     __quarterlyGoalId: 'qg1',
    //     text: 'Apply to Microsoft',
    //     order: 1,
    //     completed: false,
    //     _createdAt: Timestamp.now(),
    //     _updatedAt: Timestamp.now(),
    //     _deleted: false,
    //     hashtag: {
    //       __id: 'ht1',
    //       __userId: 'test-user',
    //       name: 'apply-internships',
    //       color: '#EE8B72',
    //       _createdAt: Timestamp.now(),
    //       _updatedAt: Timestamp.now(),
    //       _deleted: false,
    //     },
    //   });
    // }, 4000);
    
  }
}
