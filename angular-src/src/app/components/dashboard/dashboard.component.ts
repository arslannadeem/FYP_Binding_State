import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  course_List = [];
  topic_List: [{ Topic_Name: String }];
  selected_course: any;
  selected_topic: any;
  usertype = null;

  topic_dropdownList = [];
  topic_selectedItems = [];
  topic_dropdownSettings = {};

  constructor(private data: DataService, private courseService: CourseService, private router: Router, private flashMessgae: FlashMessagesService) { }

  ngOnInit() {
    var check = localStorage.getItem("userType");
    if (check == "Admin") {
      this.usertype = false;
    }
    else {
      this.usertype = true;
    }

    // --------------- Add Courses Data ---------------

    //   this.courseService.addCourseData().subscribe(data => {
    //     if(data.success)
    //     {
    //       this.flashMessgae.show("Your Course is registered and can log In.",{cssClass : 'alert-success', timeout : 3000});    
    //       //this.router.navigate(['/login']);
    //     }
    //     else
    //     {
    //       this.flashMessgae.show("Something went Wrong",{cssClass : 'alert-danger', timeout : 3000});    
    //       //this.router.navigate(['/register']);
    //     }
    // });

    // --------------- Get Courses Data ---------------

    this.topic_dropdownList = [];

    this.topic_selectedItems = [];

    this.topic_dropdownSettings = {
      singleSelection: true,
      text: "Select One Topic",
      classes: "box bold_color"
    };

    this.courseService.getCoursesData().subscribe(list => {
      this.course_List = list.data;
    },
      err => {
        return false;
      });
  }

  // ---------------- On Select Course --------------

  onSelectCourse() {

    this.topic_dropdownList = [];
    this.topic_selectedItems = [];

    for (var i = 0; i < this.course_List.length; i++) {
      if (this.course_List[i].Course_Name == this.selected_course) {
        this.topic_List = this.course_List[i].Topics;

        for (var k = 0; k < this.topic_List.length; k++) {
          this.topic_dropdownList[k] = { "id": k + 1, "itemName": this.topic_List[k].Topic_Name.toString() };
        }
      }
    }
  }

  // ---------------- On Select Topic ---------------

  onTopicSelect(level: any) {
    console.log(level);
    console.log(this.topic_selectedItems);
  }
  OnTopicDeSelect(level: any) {
    console.log(level);
    console.log(this.topic_selectedItems);
  }

  // ------------------- Start Quiz -----------------

  StartQuiz() {
    this.data.passValues(this.selected_course, this.topic_selectedItems[0].itemName.replace(/(\r\n\t|\n|\r\t)/gm,""));
    this.router.navigate(['/quiz']);
  }

  // ----------------- For Admin Panel --------------

  on_Modify(event) {
    if (event.target.id == "modify_question") {
      this.router.navigate(['/modify-question']);
    }
    else if (event.target.id == "modify_topic") {
      this.router.navigate(['/modify-topic']);
    }
    else if (event.target.id == "modify_course") {
      //this.router.navigate(['/modify-course']);
    }
  }

}