import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TaskFormComponent } from './task-form.component';
import { TaskApiService } from '../../services/task-api.service';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            },
            queryParams: of({})
          }
        },
        {
          provide: TaskApiService,
          useValue: {
            getTasks: () => of([]),
            createTask: (task: unknown) =>
              of({ ...task as object, id: 'test-id' }),
            updateTask: () => of(undefined),
            deleteTask: () => of(true),
            tasks$: of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});