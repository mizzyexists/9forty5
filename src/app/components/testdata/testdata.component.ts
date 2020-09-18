import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import { GetPostsGenQuery, GetUsersGenQuery } from '../../GQLQueries/queries';
import { ChangeUserBioMutation, CreateNewUserMutation, DeleteUserMutation } from '../../GQLQueries/mutations';

@Component({
  selector: 'app-testdata',
  templateUrl: './testdata.component.html',
  styleUrls: ['./testdata.component.scss']
})

export class TestdataComponent implements OnInit {
  posts: any;
  users: any;
  loading = true;
  error: any;
  unamefield: string;
  newbiofield: string;
  biofield: string;
  uidfield: number;
  deluidfield: number;

 constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
  }

  getPosts(){
    this.apollo.watchQuery({query: GetPostsGenQuery})
      .valueChanges.subscribe(result => {
        this.posts = result.data;
        this.posts = this.posts.posts
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  getUsers(){
    this.apollo.watchQuery({query: GetUsersGenQuery})
      .valueChanges.subscribe(result => {
        this.users = result.data;
        this.users = this.users.users;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  changeUserBio(){
    this.apollo.mutate({
      mutation: ChangeUserBioMutation,
      variables: {
        id: this.uidfield,
        bio: this.biofield
      }}).subscribe(() => {
      this.uidfield = null
      this.biofield = ''
      },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  createNewUser(){
    this.apollo.mutate({
      mutation: CreateNewUserMutation,
      variables: {
        uname: this.unamefield,
        bio: this.newbiofield
      },
      refetchQueries: [{query: GetUsersGenQuery}]
      }).subscribe(() => {
      this.unamefield = null
      this.newbiofield = ''
      },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  deleteUser(){
    this.apollo.mutate({
      mutation: DeleteUserMutation,
      variables: {id: this.deluidfield},
      refetchQueries: [{query: GetUsersGenQuery}]
      }).subscribe(() => {
      this.deluidfield = null
      },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
