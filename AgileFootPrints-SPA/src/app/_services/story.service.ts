import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EpicService } from './epic.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  storyId: string;
  projectId: string;
  baseUrl = environment.apiUrl + 'story/';
  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
    private router: Router,
    private epicService: EpicService
  ) {}
  private IdSource = new BehaviorSubject('');
  currentStoryId = this.IdSource.asObservable();
  changeStoryId(id: string) {
    this.IdSource.next(id);
    this.deleteStory();
  }

  deleteStory() {
    this.currentStoryId.subscribe(id => (this.storyId = id));
    this.alertify.confirm('Confirm Delete ?', () => {
      console.log('Story to delete : ', this.storyId);
      this.http.delete(this.baseUrl + 'deleteStory/' + this.storyId).subscribe(
        res => {
          this.alertify.success('Deleted Successfully');
          this.router.navigate(['/epic']);
        },
        error => {
          this.alertify.error(error.message);
        }
      );
    });
  }
}
