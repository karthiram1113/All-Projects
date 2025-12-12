import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  uploadFileForm!: FormGroup;
  submitted: boolean = false;
  File: any;
  fileUploadScreen: boolean = true;
  pdfFileFormatPdfFileSize: boolean = false;
  Comments = 'test';
  DocName = 'test';
  referral_speciality = '4743';
  hospitalId = '4';
  constructor(
    private formBuilder: FormBuilder,
    private apiservice: ApiServiceService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.uploadFileForm = this.formBuilder.group({
      file: ['', Validators.required],
    });
  }
  onFileSelected(event: any) {
    const fileInput = event.target;
    console.log(fileInput.files[0].name);
    let fileFormat = fileInput.files[0].name;
    let fileType = fileFormat.split('.');
    console.log(fileType[fileType.length - 1]);

    if (fileType[fileType.length - 1] == 'pdf') {
      this.pdfFileFormatPdfFileSize = false;
      if (fileInput.files.length > 0) {
        if (fileInput.files[0].size > 10485760) {
          this.pdfFileFormatPdfFileSize = true;
          // this.uploadFileForm.reset();
          this.File = '';
        } else {
          this.pdfFileFormatPdfFileSize = false;
          const file = fileInput.files[0];
          this.File = file;
        }
      }
    } else {
      this.pdfFileFormatPdfFileSize = true;
      this.File = '';
    }
  }
  uploadFile() {
    console.log(this.File);
    this.submitted = true;
    if (this.File != '') {
      if (this.Comments && this.DocName) {
        const formData = new FormData();
        formData.append('document_name', this.DocName);
        formData.append('comments', this.Comments);
        formData.append('filename', this.File);
        formData.append('referral_speciality', this.referral_speciality);
        formData.append('hospital_id', this.hospitalId);
        this.apiservice.savedocument(formData).subscribe(
          (res) => {
            if (res.status == 1) {
              // this.modalService.dismissAll();
              // this.DocName = null;
              // this.Comments = null;
              // this.visanumber = null;
              // swal.fire("Suceess!", res.message, "success");
              // this.gethospitalreferrals();
              this.fileUploadScreen = false;
              this.File == '';
              this.submitted = false;
              this.uploadFileForm.reset();
            } else if (res.status == 2) {
              swal.fire('Info!', res.message, 'info');
            }
          },
          (error) => {
            swal.fire('Error!', error.error.detail, 'error');
            this.spinner.hide();
          }
        );
      } else {
        this._snackBar.open('Please enter the Document Name and Comments', '', {
          duration: 2000,
        });
      }
    } else {
      // this.submitted=false;
    }
  }
}
