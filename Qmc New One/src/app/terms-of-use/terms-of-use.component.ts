import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent implements OnInit {
  uploadFileForm!: FormGroup;
  submitted: boolean = false;
  File: any;
  fileUploadScreen: boolean = true;
  pdfFileFormatPdfFileSize: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

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
  ImportProduct() {
    console.log(this.File);
    this.submitted = true;
    if (this.File != '') {
      this.fileUploadScreen = false;
      const formData = new FormData();
      formData.append('FeedType', 'data');
      formData.append('File', this.File);
      // console.log(this.File);
      this.File == '';
      // formData.append('UserId', this.userId);
      // formData.append('AccountId', this.accountId);
      // console.log(formData);
      this.submitted = false;
      this.uploadFileForm.reset();
      // this.prodectsServices.ImportProduct(formData).subscribe(res => {
      //   if (res.success == true) {

      //     const modal = document.getElementById('DeleteDetailsModal');
      //     if (modal) {
      //       modal.style.display = 'block';
      //       modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

      //     } else {
      //       console.error('ErrorModal not found.');
      //     }
      //     this.pageProducts();
      //     let ref = document.getElementById('importclose')
      //     ref?.click();
      //     this.submitted = false;
      //   }
      //   else if (res.success == false) {
      //     this.toastr.warning("Import Failed")
      //     this.pageProducts();
      //     let ref = document.getElementById('importclose')
      //     ref?.click();
      //     this.submitted = false;
      //   }
      //   else {
      //     this.toastr.error("Somthing went wrong")
      //     this.pageProducts();
      //     let ref = document.getElementById('importclose')
      //     ref?.click();
      //     this.submitted = false;
      //   }
      // });
    } else {
      // this.submitted=false;
    }
  }
}
