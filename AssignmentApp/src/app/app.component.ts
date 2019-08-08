import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AssignmentApp';
  fileToUpload: File = null;
  files: File[] = [];
  isSubmitted = false;
  stepTwoForm: FormGroup;
  stepOne = true;
  stepTwo = false;
  stepThree = false;
  finalStep = false;
  selectedFiles: File[] = [];
  formData = {};
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.files.push(this.fileToUpload);
    this.fileToUpload = null;


  }
  onChange(event: any, file: File) {

    if (event.target.checked) {
      if (!this.selectedFiles.includes(file)) {
        this.selectedFiles.push(file);
      }
    } else {
      if (this.selectedFiles.includes(file)) {
        this.selectedFiles.splice(this.selectedFiles.findIndex(x => x.name === file.name), 1);

      }
    }

  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.selectedFiles.length > 0) {
      this.stepOne = false;
      this.stepTwo = true;
      this.isSubmitted = false;

    } else {

    }


  }

  stepTwoSubmit() {
    this.isSubmitted = true;
    if (this.stepTwoForm.dirty && this.stepTwoForm.valid) {
      this.stepOne = false;
      this.stepTwo = false;
      this.stepThree = true;
      this.formData = this.stepTwoForm.value;
      console.log(this.formData);
    }
  }
  stepThreeSubmit() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = false;
    this.finalStep = true;
  }


  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {

    this.stepTwoForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
  }
}
