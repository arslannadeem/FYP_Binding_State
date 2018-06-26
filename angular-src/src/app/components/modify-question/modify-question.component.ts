import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModifyQuestionService } from '../../services/modify-question.service';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-modify-question',
  templateUrl: './modify-question.component.html',
  styleUrls: [
    './modify-question.component.css'
  ],
})

export class ModifyQuestionComponent implements OnInit {

  showHide = false;

  next = false;
  next_second = false;

  headings: any = [];
  paragraph: any = [];
  Sub_Topic_Heading = [];

  question: any;
  opt: any = [];
  course_topic: any;
  topics: any = [];
  sub_Topics: any = [];
  topics_data: any = [];

  links: any = [];

  choices = [{ 'id': 1 }];
  counterChoices = 1;

  level_dropdownList = [];
  level_selectedItems = [];
  level_dropdownSettings = {};

  course_dropdownList = [];
  course_selectedItems = [];
  course_dropdownSettings = {};

  // ======= Next Proceed =======

  next_course: any;
  next_level: any = [];
  next_question: any;
  next_options: any = [];

  // ========== TOPICS ========== 

  topics_dropdownList = [];
  topics_selectedItems = [];
  topics_dropdownSettings = {};

  // ======== SUBTOPICS ========== 

  subtopics_dropdownList = [];
  subtopics_selectedItems = [];
  subtopics_dropdownSettings = {};

  // ======== HEADINGS ========== 

  headings_dropdownList = [];
  headings_selectedItems = [];
  headings_dropdownSettings = {};

  constructor(
    private courseService: CourseService,
    private router: Router,
    private flashMessgae: FlashMessagesService,
    private modifyQuestionService: ModifyQuestionService) { }

  ngOnInit() {

    //------------------------------------

    this.level_dropdownList = [
      { "id": 1, "itemName": "Easy" },
      { "id": 2, "itemName": "Medium" },
      { "id": 3, "itemName": "Difficult" }
    ];

    this.level_selectedItems = [];

    this.level_dropdownSettings = {
      singleSelection: false,
      text: "Select Level",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };

    //------------------------------------

    this.course_dropdownList = [
      { "id": 1, "itemName": "OOP" },
      { "id": 2, "itemName": "Data Structure" }
    ];

    this.course_selectedItems = [];

    this.course_dropdownSettings = {
      singleSelection: true,
      text: "Select Course"
    };

    //------------------------------------

    this.topics_dropdownList = [];

    this.topics_selectedItems = [];

    this.topics_dropdownSettings = {
      singleSelection: true,
      text: "Select Topic/s",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };

    //------------------------------------

    this.subtopics_dropdownList = [];

    this.subtopics_selectedItems = [];

    this.subtopics_dropdownSettings = {
      singleSelection: false,
      text: "Select SubTopic/s",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };

    //------------------------------------

    this.headings_dropdownList = [];

    this.headings_selectedItems = [];

    this.headings_dropdownSettings = {
      singleSelection: false,
      enableSearchFilter: true,
      text: "Select Heading/s",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };

  }

  public saveChoice: boolean;

  public onSaveChoiceChanged(value: boolean) {
    this.saveChoice = value;
  }

  // ================ FOR LEVEL =============

  onLevelSelect(level: any) {
    console.log(level);
    console.log(this.level_selectedItems);
  }
  OnLevelDeSelect(level: any) {
    console.log(level);
    console.log(this.level_selectedItems);
  }
  onLevelSelectAll(level: any) {
    console.log(level);
  }
  onLevelDeSelectAll(level: any) {
    console.log(level);
  }


  // ================ FOR COURSE =============

  onCourseSelect(course: any) {
    console.log(course);
    console.log(this.course_selectedItems);
  }
  OnCourseDeSelect(course: any) {
    console.log(course);
    console.log(this.course_selectedItems);
  }
  onCourseSelectAll(level: any) {
    console.log(level);
  }
  onCourseDeSelectAll(level: any) {
    console.log(level);
  }

  // ================ FOR TOPICS =============

  onTopicSelect(topic: any) {
    this.course_topic = topic.itemName;
    this.sub_Topics = [];
    this.subtopics_dropdownList = [];

    var k = 0;
    for (var i = 0; i < this.topics_data.length; i++) {

      if (this.topics_data[i].Topic_Name == topic.itemName) {
        for (var j = 0; j < this.topics_data[i].SubTopics.length; j++) {
          this.sub_Topics[k] = this.topics_data[i].SubTopics[j].Sub_Topic_Name;
          this.subtopics_dropdownList.push({ "id": k + 1, "itemName": this.sub_Topics[k] });
          k++;
        }
        i = this.topics_data.length;
      }
    }
  }

  OnTopicDeSelect(topic: any) {
    console.log(topic);
    console.log(this.topics_selectedItems);
  }
  onTopicSelectAll(topic: any) {
    console.log(topic);
  }
  onTopicDeSelectAll(topic: any) {
    console.log(topic);
  }

  // ============== FOR SUB TOPICS =============

  onSubTopicSelect(subtopic: any) {
    console.log(subtopic);
    console.log(this.subtopics_selectedItems);
  }
  OnSubTopicDeSelect(subtopic: any) {
    console.log(subtopic);
    console.log(this.subtopics_selectedItems);
  }
  onSubTopicSelectAll(subtopic: any) {
    console.log(subtopic);
  }
  onSubTopicDeSelectAll(subtopic: any) {
    console.log(subtopic);
  }

  // ============== FOR HEADINGS =============

  onHeadingSelect(heading: any) {
    console.log(heading);
    console.log(this.headings_selectedItems);
  }
  OnHeadingDeSelect(heading: any) {
    console.log(heading);
    console.log(this.headings_selectedItems);
  }
  onHeadingSelectAll(heading: any) {
    console.log(heading);
  }
  onHeadingDeSelectAll(heading: any) {
    console.log(heading);
  }

  // ======== DYNAMICALLY ADD/ REMOVE FIELDS ==========

  addMoreChoices = function () {
    if (this.counterChoices != 5) {
      this.counterChoices++;
      this.choices.push({ 'id': this.counterChoices });
    }
  };

  removeChoice = function (index) {
    if (index != 0) {
      this.counterChoice--;
      this.choices.splice(index, 1);
    }
  };

  // ============== ADD DYNAMICALLY SUBTOPICS BY TOPICS =============

  nextProceed() {
    this.next = true;

    var j = 0;
    for (var i = 0; i < this.choices.length; i++) {
      if ($("#saveChoiceCheckBox" + i).prop('checked') == true) {
        this.opt[j] = i + 1;
        j++;
      }
    }

    console.log(this.opt);

    this.next_course = this.course_selectedItems[0].itemName;
    this.next_level = this.level_selectedItems;
    this.next_question = this.question;

    for (var i = 0; i < this.counterChoices; i++) {
      this.next_options[i] = (document.getElementById("opt" + i) as HTMLInputElement).value;
    }

    this.courseService.getTopicsByCourse(this.next_course).subscribe(result => {
      this.topics_data = result.data[0].Topics;
      for (var i = 0; i < this.topics_data.length; i++) {
        this.topics[i] = this.topics_data[i].Topic_Name.replace(/^"(.*)"$/, '$1');
        this.topics_dropdownList.push({ "id": i + 1, "itemName": this.topics[i] });
      }
    });
  }

  // ========================== SHOW CRAWLING HEADINGS =======================

  nextProceed_Second() {

    this.showHide = true;

    var l = 0;
    for (var i = 0; i < this.topics_data.length; i++) {

      if (this.topics_data[i].Topic_Name == this.course_topic) {
        for (var j = 0; j < this.subtopics_selectedItems.length; j++) {
          for (var k = 0; k < this.topics_data[i].SubTopics.length; k++) {
            if (this.topics_data[i].SubTopics[k].Sub_Topic_Name == this.subtopics_selectedItems[j].itemName) {
              var str = this.topics_data[i].SubTopics[k].Link;
              this.links[l] = { "link": str.replace(/^"(.*)"$/, '$1'), "SubTopic": this.subtopics_selectedItems[j].itemName };
              l++;
            }
          }
        }
        i = this.topics_data.length;
      }
    }



    var x = 0;

    for (var i = 0; i < this.links.length; i++) {

      var data_link = { "link_data": this.links[i] };

      if (data_link.link_data.link.includes("javatpoint")) {
        this.modifyQuestionService.Get_Heading_By_Crawling_JavaTPoint(data_link).subscribe(data => {
          if (data.success) {
            for (var j = 0; j < data.data.length; j++) {
              this.headings[x] = data.data[j].Head;
              this.paragraph[x] = data.data[j].Para;
              this.Sub_Topic_Heading[x] = data.data[j].Sub_Topic;

              var str = this.headings[x];
              if (str.includes("<h1>")) {
                str = str.replace("<h1>", "");
                str = str.replace("</h1>", "");
              }
              else if (str.includes("<h2>")) {
                str = str.replace("<h2>", "");
                str = str.replace("</h2>", "");
              }

              this.headings_dropdownList.push({ "id": x, "itemName": str });
              x++;
            }
            //this.flashMessgae.show("Topcis Shows", { cssClass: 'alert-success', timeout: 3000 });
          }
          else {
            //this.flashMessgae.show("Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
          }
        });
      }
      else {
        this.modifyQuestionService.Get_Heading_By_Crawling_Tutorial(data_link).subscribe(data => {
          if (data.success) {
            //console.log(data.data);
            for (var j = 0; j < data.data.length; j++) {
              this.headings[x] = data.data[j].Head;
              this.paragraph[x] = data.data[j].Para;
              this.Sub_Topic_Heading[x] = data.data[j].Sub_Topic;

              var str = this.headings[x];
              if (str.includes("<h1>")) {
                str = str.replace("<h1>", "");
                str = str.replace("</h1>", "");
              }
              else if (str.includes("<h2>")) {
                str = str.replace("<h2>", "");
                str = str.replace("</h2>", "");
              }

              this.headings_dropdownList.push({ "id": x, "itemName": str });
              x++;
            }
            //this.flashMessgae.show("Topcis Shows", { cssClass: 'alert-success', timeout: 3000 });
          }
          else {
            //this.flashMessgae.show("Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
          }
        });
      }
    }
    this.next_second = true;
  }

  Submit_Data() {
    // ----------------- Encapsulate the Selected Data -------------

    var send_question_data = {
      "Course": this.course_selectedItems,
      "Question": this.question,
      "Question_Level": this.level_selectedItems,
      "Choices_ID": this.choices,
      "Choices_text": this.next_options,
      "Choices_checkbox": this.opt,
      "Topics": this.topics_selectedItems,
      "SubTopics": this.subtopics_selectedItems
    };

    var temp_heading = [];
    for (var i = 0; i < this.headings_selectedItems.length; i++) {
      temp_heading.push({ "id": this.headings_selectedItems[i].id, "itemName": this.headings_selectedItems[i].itemName });
    }

    var send_Article_data = {
      "Topics": this.topics_selectedItems,
      "SubTopics": this.subtopics_selectedItems,
      "Level": this.level_selectedItems,
      "Heading": temp_heading,
      "Head": this.headings,
      "Para": this.paragraph,
      "Sub_Topic_Heading": this.Sub_Topic_Heading
    };

    // -------------------- Call Question Service ------------------

    this.modifyQuestionService.Add_New_Questions_With_Choices(send_question_data).subscribe(data => {
      if (data.success) {
        this.modifyQuestionService.Add_New_Articles_By_Question(send_Article_data).subscribe(data => {
          if (data.success) {
            this.flashMessgae.show("Question Added SuccessFully", { cssClass: 'alert-danger', timeout: 2000 });
            this.router.navigate(['/dashboard']);
          }
          else {
            this.flashMessgae.show("Something went Wrong in Articles", { cssClass: 'alert-danger', timeout: 2000 });
          }
        });
        this.flashMessgae.show("Articles Added SuccessFully", { cssClass: 'alert-danger', timeout: 2000 });
      }
      else {
        this.flashMessgae.show("Something went Wrong in Questions", { cssClass: 'alert-danger', timeout: 2000 });
      }
    });
  }
}