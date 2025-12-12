import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class BookAppointmentComponent implements OnInit, AfterViewInit {
  closeResult!: string;
  @ViewChild('content')
  content!: NgbModalConfig;
  @ViewChild('success')
  success!: NgbModalConfig;
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private dom: DomSanitizer,
    private restApi: ApiServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}
  ngAfterViewInit() {
    this.openModal();
  }
  openModal() {
    this.modalService.open(this.content, { centered: true });
  }
  openSuccessModel() {
    this.modalService.open(this.success, { centered: true });
  }

  ngOnInit(): void {}
  getUrl(url: any) {
    return this.dom.bypassSecurityTrustResourceUrl(url);
  }
}
