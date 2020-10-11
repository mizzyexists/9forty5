import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LearnTabs } from '../../models/learntabs';
import { LearninghubService } from '../../services/learninghub.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  learnTabs: LearnTabs[];

  constructor(
    private titleService: Title,
    private learnApi: LearninghubService
  ) {
    this.learnApi.getTabs().subscribe((data: LearnTabs[]) => {
      this.learnTabs = data;
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle( "9Forty5 - Learning Hub" );
  }

}
