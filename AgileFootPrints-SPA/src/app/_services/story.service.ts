import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EpicService } from './epic.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  projectId: string;
  storyId: string;
  baseUrl = environment.apiUrl + 'story/';
  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  deleteStory(id: string) {
    console.log('Story to delete : ', id);
    return this.http.delete(this.baseUrl + 'deleteStory/' + id);
  }

  newStory(model: any) {
    return this.http.post(this.baseUrl + 'createNewStory/', model);
  }

  getStory(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'getStory/' + id);
  }

  editStory(id: number, story: any) {
    this.storyId = id.toString();
    console.log('Story id to edit :', id);
    console.log('Story Obj to eidt', story);
    return this.http.patch<any>(
      this.baseUrl + 'editStory/' + this.storyId,
      story
    );
  }
}
