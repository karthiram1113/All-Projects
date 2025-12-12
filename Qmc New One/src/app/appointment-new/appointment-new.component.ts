import {
  Component, OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
// import { ReCaptchaService } from 'angular-recaptcha3';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
// import { Timepipe } from './TimeFormatPipe';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { log } from 'node:console';
import { ToastrService } from 'ngx-toastr';


// import { error } from 'console';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrl: './appointment-new.component.scss',
  providers: [DatePipe],
})
export class AppointmentNewComponent implements OnInit {

  @ViewChild('availableslot')
  availableslot!: NgbModalConfig;
  @ViewChild('unavailableslot')
  unavailableslot!: NgbModalConfig;
  @ViewChild('OTPModel')
  OTPModel!: NgbModalConfig;
  @ViewChild('slotbooked')
  slotbooked!: NgbModalConfig;
  @ViewChild('slotsempty')
  slotsempty!: NgbModalConfig;
  windowWidth: any = window.innerWidth < 600 ? window.innerWidth : '1100';
  lang: any;
  stricky: any = false;
  isShow = true;
  model2: any;
  visavalidation: boolean = true;
  siteKey = '6LcmxJ4pAAAAAGcfYMzHJWbd-pxAzCZdiUVer_VB';
  loginform!: FormGroup;
  booking: boolean = true;
  history: boolean = false;
  applicantdata: any = {};
  userdetail: any = {};
  applicantdetailpage: boolean = false;
  appointmenthistorydata: any = [];
  slotgroup: any = [];
  showslotgroup: any[] = [];
  startslotindex: any;
  endslotindex: any;
  selectedslot: any;
  Slottime: any[] = [];
  selectedslottimeitem: any;
  Bookedslots: any;
  referralDetails: any;
  bsConfig?: Partial<BsDatepickerConfig>;
  fromhistory: boolean = false;
  historyitem: any;
  OTPvalue: any;
  checkotp: boolean = true;
  selecteddayindex: any;
  country: any;
  department: any;
  responseData: any;
  datas: any;

  data: any[] = [];
  selectedCenterCodes: Set<string> = new Set<string>();
  selectedCenterCode: string = 'CH'; // Initial center code
  dateResponse: any[] = [];
  dropdownVisible: boolean = false;
  storedResponse: any;
  invalid: any;
  cdr: any;
  select: any;
  startTime: any;
  endTime: any;
  time: any;
  value: any;
  one: any[] | undefined;
  sss: any;
  date: any;
  uniqueData: any[] = [];
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  uniqueDates: any;
  isDropdownOpen = false;
  selectedOptions: string[] = [];
  loading: boolean | undefined;
  options: any;
  tempVar: any;
  selectedStartTime: string | null = null;
  selectedEndTime: string | null = null;
  highestActionDate: any;

  constructor(
    private datePipe: DatePipe,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public router: Router,
    config: NgbPopoverConfig,
    private translate: TranslateService,
    private language: LanguageService,
    public datepipe: DatePipe,
    private apiservice: ApiServiceService,
    private spinner: NgxSpinnerService,
  ) {
    config.placement = 'right';
    config.triggers = 'hover';
    this.translate.use('en');
    this.language.languageChange.subscribe((props) => {
      this.lang = props;
    });
    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
    this.country = localStorage.getItem('country');
    // console.log(JSON.parse(this.data));
  }

  // Checkbox Values

  // options = [
  //   { label: 'Confirmatory', value: 'Confirmatory', checked: false },
  //   { label: 'Speciality', value: 'Speciality', checked: false },

  // ];

  ngOnInit() {



    const cancelData = localStorage.getItem('cancelData');
    const storedData = sessionStorage.getItem('data');
    console.log(cancelData);




    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.status === 1 && Array.isArray(parsedData.data)) {
          // Filter services where booking_status is false
          const filteredData = parsedData.data.filter((item: { specialityData: { booking_status: boolean; }; }) => item.specialityData.booking_status === false);

          // Extract the service value to display in dropdown
          const filteredOptions = filteredData.map((item: { specialityData: { service: any; service_code: any; }; }) => ({
            label: item.specialityData.service,  // Use the service value
            value: item.specialityData.service_code,  // Optional: store the service code or other unique identifier
            checked: false // Initialize checkbox state (you can modify this based on your logic)
          }));
          console.log(filteredOptions, 'filteredOptions');

          // Assign filtered options to your dropdown data
          this.options = filteredOptions;
        }
      } catch (error) {
        console.error('Error parsing sessionStorage data:', error);
      }
    }







    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        this.loadDataFromLocalStorage(parsedData);
      } catch (error) {
        console.error('Error parsing data from session storage:', error);
        this.fetchOptions();
      }
    } if (cancelData) {
      try {
        const cancelDatas = JSON.parse(cancelData);
        const reshedulData = {
          id: cancelDatas.id,
          date_booked: cancelDatas.date_booked,
          booked_time: cancelDatas.booked_time,
          booking_status: cancelDatas.booking_status,
        };

        console.log("reshedulData:", reshedulData);
        // Optionally, you can do something with reshedulData here if needed
      } catch (error) {
        console.error('Error parsing cancelData from session storage:', error);
      }
    } else {
      this.fetchOptions(); // Fetch options if no data in sessionStorage
    }
  }


  loadDataFromLocalStorage(data: any) {
    this.data = data;
    this.removeDuplicates();
    this.updateOptionsFromData();
  }
  fetchOptions() {
    this.loading = true;

    // Simulate fetching data from session storage
    const storedData = sessionStorage.getItem('data');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        this.data = parsedData;
        this.updateOptionsFromData();
        this.loading = false;
      } catch (error) {
        console.error('Error parsing data from session storage:', error);
        this.loading = false;
      }
    } else {
      console.error('No data found in session storage.');
      this.loading = false;

    }
  }




  updateOptionsFromData() {
    const serviceCounts: { [key: string]: number } = {};
    const allServices: { label: string, value: string, checked: boolean }[] = [];

    const valueToDisplayName: { [key: string]: string } = {
      "Speciality": "External Specialty",
      "Additional Lab test": "Additional Lab test",
      "confirmatoryData": "Confirmatory",
      "Xray": "Additional X Ray",
      "Additional": "Additional Lab test"
    };

    // Retrieve data from sessionStorage
    const storedData = sessionStorage.getItem('data');
    if (!storedData) {
      console.error('No data found in sessionStorage.');
      return;
    }

    this.data = JSON.parse(storedData);
    console.log(this.data, '////////////////');

    const filteredData = this.data.filter((item: any) => {
      return item.specialityData?.inside_center === 1 && item.specialityData?.booking_status === false || item.xrayData?.inside_center === 1 && item.xrayData?.booking_status === false || item.confirmatoryData?.inside_center === 1 && item.confirmatoryData?.booking_status === false || item.additionalData?.inside_center === 1 && item.additionalData?.booking_status === false;
    });

    if (filteredData.length === 0) {
      console.log('No services with booking_status false found.');
      return; // If no services match the criteria, exit
    }

    filteredData.forEach((item: any) => {
      ['retakeData', 'specialityData', 'confirmatoryData', 'additionalData', 'xrayData'].forEach((dataType) => {
        if (item[dataType]?.service) {
          const service = item[dataType].service;
          console.log(service, 'serviceservice');

          const count = (serviceCounts[service] || 0) + 1;
          serviceCounts[service] = count;
          const displayName = valueToDisplayName[service] || service;
          console.log(displayName, 'displayNamedisplayName');


          allServices.push({
            label: `${displayName} - ${count}`,  // Show display name
            value: service,
            checked: false
          });
        }
      });
    });

    const rescheduleData = localStorage.getItem('cancelData');
    if (rescheduleData) {
      try {
        this.tempVar = JSON.parse(rescheduleData);

        if (this.tempVar?.service?.code) {
          let filteredDataForReschedule = filteredData;

          if (this.tempVar.Confirmatory) {
            filteredDataForReschedule = filteredDataForReschedule.filter((applicant: any) =>
              applicant.confirmatoryData?.service_code === this.tempVar.service.code
            );
          } else if (this.tempVar.Speciality) {
            filteredDataForReschedule = filteredDataForReschedule.filter((applicant: any) =>
              applicant.specialityData?.service_code === this.tempVar.service.code
            );
          } else if (this.tempVar.retakeData) {
            filteredDataForReschedule = filteredDataForReschedule.filter((applicant: any) =>
              applicant.retakeData?.service_code === this.tempVar.service.code
            );
          } else if (this.tempVar.additionalData) {
            filteredDataForReschedule = filteredDataForReschedule.filter((applicant: any) =>
              applicant.additionalData?.service_code === this.tempVar.service.code
            );
          }

          if (filteredDataForReschedule.length > 0) {
            sessionStorage.setItem('filteredData', JSON.stringify(filteredDataForReschedule[0]));
            filteredDataForReschedule.forEach((item: any) => {
              ['retakeData', 'specialityData', 'confirmatoryData', 'additionalData'].forEach((dataType) => {
                if (item[dataType]?.service) {
                  const service = item[dataType].service;
                  const count = (serviceCounts[service] || 0) + 1;
                  serviceCounts[service] = count;
                  allServices.push({
                    label: `${service}-${count}`,
                    value: service,
                    checked: false
                  });
                }
              });
            });
          }
        } else {
          console.error('Invalid or missing service code in rescheduleData:', this.tempVar);
          return;
        }
      } catch (error) {
        console.error('Error parsing rescheduleData:', error);
        return;
      }
    }

    if (rescheduleData) {
      const rescheduledServices = new Set<string>();

      try {
        const rescheduleParsed = JSON.parse(rescheduleData);
        console.log(rescheduleParsed, 'rescheduleDatarescheduleData');

        if (rescheduleParsed?.service?.code) {
          const rescheduledService = rescheduleParsed.service.code;
          rescheduledServices.add(rescheduledService);
        }
      } catch (error) {
        console.error('Error parsing rescheduleData:', error);
      }

      if (rescheduledServices.size > 0) {
        this.options = allServices.filter(service => !rescheduledServices.has(service.value));
      } else {
        this.options = allServices;
      }
    } else {
      this.options = allServices;
    }

    console.log('Options:', this.options);
  }






  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.custom-select') as HTMLElement;

    // Check if the click is outside the dropdown
    if (dropdown && !dropdown.contains(target)) {
      this.closeDropdown();
    }
  }





  removeDuplicates() {
    const seen = new Set();
    this.uniqueData = this.data.filter((item: { center_code: string }) => {
      const duplicate = seen.has(item.center_code);
      seen.add(item.center_code);
      return !duplicate;
    });
  }




  // Checkbox Click to Onchange Method

  onCheckboxChange(event: any, option: any) {
    option.checked = event.target.checked;
    const selectedLabel = option.label;

    if (option.checked) {
      this.selectedOptions.push(selectedLabel);
    } else {
      this.selectedOptions = this.selectedOptions.filter(label => label !== selectedLabel);
    }

    console.log('Selected Options:', this.selectedOptions);

    const departments = new Set<string>();

    const actionDates: Date[] = [];

    this.selectedOptions.forEach(selectedOption => {
      console.log(`Processing selected option: ${selectedOption}`);

      this.data.forEach(item => {
        console.log('Processing item:', item);

        if (selectedOption.startsWith('Confirmatory')) {
          if (item.confirmatoryData?.department) {
            departments.add(item.confirmatoryData.department);
            console.log(`Confirmatory department: ${item.confirmatoryData.department}`);

            if (item.confirmatoryData?.confirmatory_action_date) {
              const confirmatoryActionDate = new Date(item.confirmatoryData.confirmatory_action_date);
              actionDates.push(confirmatoryActionDate);
              console.log(`Confirmatory action date for ${selectedOption}: ${confirmatoryActionDate}`);
            }
          } else {
            console.log('No confirmatory department in item:', item);
          }
        } else if (selectedOption.startsWith('External Specialty')) {
          if (item.specialityData?.department) {
            departments.add(item.specialityData.department);
            if (item.specialityData?.speciality_action_date) {
              const specialityActionDate = new Date(item.specialityData.speciality_action_date);
              actionDates.push(specialityActionDate);
              console.log(`External Specialty action date for ${selectedOption}: ${specialityActionDate}`);
            }
          } else {
            console.log('No specialty department in item:', item);
          }
        } else if (selectedOption.startsWith('Additional X Ray')) {
          if (item.xrayData?.department) {
            departments.add(item.xrayData.department);
            if (item.xrayData?.xray_action_date) {
              const xrayActionDate = new Date(item.xrayData.xray_action_date);
              actionDates.push(xrayActionDate);
              console.log(`X-Ray action date for ${selectedOption}: ${xrayActionDate}`);
            }
          } else {
            console.log('No x-ray department in item:', item);
          }
        } else if (selectedOption.startsWith('Additional')) {
          if (item.additionalData?.department) {
            departments.add(item.additionalData.department);
            if (item.additionalData?.additional_action_date) {
              const additionalActionDate = new Date(item.additionalData.additional_action_date);
              actionDates.push(additionalActionDate);
              console.log(`Additional action date for ${selectedOption}: ${additionalActionDate}`);
            }
          } else {
            console.log('No additional department in item:', item);
          }
        } else {
          console.log('Unknown selected option:', selectedOption);
        }
      });
    });

    if (actionDates.length > 0) {
      this.highestActionDate = new Date(Math.max(...actionDates.map(date => date.getTime())));
      console.log('Highest Action Date:', this.highestActionDate.toISOString());
    } else {
      console.log('No action dates found for the selected options');
    }

    const departmentList = Array.from(departments).join(',');
    console.log('Final department list:', departmentList);

    const uniqueCenterCodes = Array.from(new Set(this.data.map(item => item.center_code)));

    const params = {
      center: uniqueCenterCodes,
      department: departmentList
    };

    console.log('Params for API:', params);

    this.fetchData(params, this.highestActionDate);
  }



  fetchData(params: any, highestActionDate: Date) {
    this.spinner.show();
    this.apiservice.dropdownapi(params, params.center).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(
      (response: any) => {
        if (response && response.data) {
          const departmentCodes = params.department.split(',');

          const filteredData = response.data.filter((item: any) => {
            return item.depart_detail.some((detail: any) =>
              departmentCodes.includes(detail.code)
            );
          });

          const uniqueDates = this.getUniqueDates(filteredData);

          uniqueDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

          const filteredUniqueDates = uniqueDates.filter((item: any) => {
            const itemDate = new Date(item.date);
            return itemDate > highestActionDate;
          });

          this.storedResponse = filteredUniqueDates.map((item: any) => {
            const dateObj = new Date(item.date);
            return {
              month: dateObj.toLocaleString('default', { month: 'short' }),
              date: dateObj.getDate(),
              day: dateObj.toLocaleString('default', { weekday: 'short' }),
              fullDate: item.date
            };
          });

          this.uniqueDates = this.storedResponse;

          console.log('Transformed Response:', this.storedResponse);
        } else {
          alert(response.message); // Show error message if response has no data
          console.error('Invalid API response:', response);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
        alert('Server is busy.'); // Show alert for server busy error
      }
    );
  }



  private getUniqueDates(data: any[]): any[] {
    const uniqueDates = [];
    const map = new Map();

    for (const item of data) {
      // Assuming each item has a date field like 'confirmatory_action_date', 'xray_action_date', etc.
      const date = new Date(item.date);  // Ensure that `item.date` refers to the correct date field

      // You can modify the condition here to allow all dates, not just future ones.
      if (!map.has(item.date)) {
        map.set(item.date, true); // Use the date as key to check uniqueness
        uniqueDates.push(item); // Add the item to the uniqueDates array
      }
    }

    return uniqueDates; // Return the unique dates without filtering out the past ones
  }





  // Date Click To Slottime Open


  datefunction(params: any) {
    this.spinner.show();

    this.apiservice.dropdownapi(params, params.center).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe(
      (response: any) => {
        if (response && response.data) {
          const selectedDateData = response.data.find((item: any) => item.date === this.selectedDate);

          if (selectedDateData) {
            const uniqueSlots = this.getUniqueTimeSlots(selectedDateData.slottime);
            console.log('Unique Time Slots for date:', selectedDateData.date, uniqueSlots);

            // Add remaining value to each slot
            this.dateResponse = uniqueSlots.map((slot: any) => ({
              ...slot,
              remaining: selectedDateData.remaining // Ensure this aligns with how `remaining` is structured in your response
            }));

            console.log('Remaining values for date:', selectedDateData.remaining);
          } else {
            console.log('No data found for selected date:', this.selectedDate);
            this.dateResponse = [];
          }
        } else {
          console.error('Invalid API response:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        alert('Server is busy.');
      }
    );
  }
  getCircleColor(rem: number): string {
    // console.log('remaining:', rem);
    return rem > 0 ? 'green' : 'red';
  }

  convertToAMPM(time24: string): string {
    if (!time24 || !time24.includes(':')) {
      console.error('Invalid time format:', time24);
      return 'Invalid Time'; // Return a default value for invalid time
    }

    let [hours, minutes] = time24.split(':').map(Number);

    // Check if the parsed hours and minutes are valid
    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid time values:', hours, minutes);
      return 'Invalid Time'; // Return a default value for invalid time
    }

    // Determine the AM/PM period
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12; // Convert 0 hours to 12 AM

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }


  // Helper function to get unique time slots
  getUniqueTimeSlots(slots: any[]): any[] {
    const uniqueSlots = [];
    const seenSlots = new Set();

    for (const slot of slots) {
      // Convert start and end time to AM/PM format



      const startTimeAMPM = this.convertToAMPM(slot.start_time);
      const endTimeAMPM = this.convertToAMPM(slot.end_time);
      const key = `${startTimeAMPM}-${endTimeAMPM}`;

      console.log(startTimeAMPM, endTimeAMPM, 'rrrrrrrrrrrrrrrr');

      // Check if the time slot is unique
      if (!seenSlots.has(key)) {
        seenSlots.add(key);
        uniqueSlots.push({
          ...slot,
          start_time: startTimeAMPM,
          end_time: endTimeAMPM
        });
      }
    }

    return uniqueSlots;
  }


  //  Book Appointment Button Api




  //  Book Appointment Button Api

  bookAppointment() {
    if (!this.data || this.data.length === 0) {
      this.toastr.error('No data available for booking.');
      return;
    }

    if (!this.selectedDate || !this.time) {
      this.toastr.error('No date or time selected.');
      return;
    }

    // Check localStorage for cancelData to determine if it's a rescheduling
    const cancelData = localStorage.getItem('cancelData');
    const isRescheduling = cancelData ? true : false;

    if (isRescheduling) {
      console.log('Rescheduling an appointment...');
      this.handleRescheduling();
    } else {
      console.log('Booking a new appointment...');
      this.bookNewAppointment(1);
    }
  }

  private handleRescheduling() {
    console.log('Attempting to reschedule appointment...');

    // Retrieve reschedule data from localStorage
    const rescheduleData = localStorage.getItem('cancelData');
    if (!rescheduleData) {
      console.error('No reschedule data found in localStorage.');
      return;
    }

    const cancelData = JSON.parse(rescheduleData);

    // Validate cancelData
    if (!cancelData.id || !cancelData.date_booked || !cancelData.booked_time) {
      console.error('Incomplete reschedule data found in localStorage.');
      return;
    }

    // Step 1: Cancel the existing appointment

    const visa_number = sessionStorage.getItem('visa_number');

    this.apiservice.appointmentcancel({
      id: cancelData.id,
      booking_status: 2,
      visa_number: visa_number,
      date_booked: cancelData.date_booked,
      booked_time: cancelData.booked_time,
    }).subscribe({
      next: (cancelResponse) => {

        // Check if cancellation was successful before rebooking
        if (cancelResponse && cancelResponse.status === 1) {
          this.toastr.success(cancelResponse.message);

          // Step 2: Proceed with rebooking the appointment
          this.bookNewAppointment(3);
        } 
        else if(cancelResponse && cancelResponse.status === 2) {
          this.toastr.error(cancelResponse.message);
        }
        else {
          console.error('Cancellation failed or returned an unexpected status');
          // alert('An error occurred while cancelling the appointment.');
        }
      },
      error: (cancelError) => {
        console.error('Appointment cancellation error: ', cancelError);
        // alert('An error occurred while cancelling the appointment.');
      }
    });
  }

  private bookNewAppointment(bookingStatus: number) {
    if (!this.selectedDate || !this.time) {
      console.error('No date or time selected for booking.');
      return;
    }

    const appointmentsData: any[] = [];


    this.selectedOptions.forEach(selectedOption => {
      const item = this.data.find(item => {
        const confirmatoryService = item.confirmatoryData?.service;
        const specialityService = item.specialityData?.service;
        const retakeService = item.retakeData?.service;
        const additionalService = item.additionalData?.service;

        if (selectedOption.startsWith(confirmatoryService) ||
          selectedOption.startsWith(specialityService) ||
          selectedOption.startsWith(retakeService) ||
          selectedOption.startsWith(additionalService)) {
          return true;
        }
        return false;
      });


      if (!item) {
        console.error(`No data available for service: ${selectedOption}`);
        return;
      }

    


      const { department, service, serviceCode } = this.getAppointmentDetails(item);

      appointmentsData.push({
        "applicant_id": item.applicant_id,
        "patient_name": item.patient_name,
        "visa_number": item.visa_number,
        "department": department,
        "service": service,
        "service_code": serviceCode,
        "description": "3",
        "booking_status": bookingStatus,
        "date_booked": this.selectedDate,
        "booked_time": this.time,
        "booking_from": "3"
      });
    });

    if (appointmentsData.length === 0) {
      this.toastr.error('Invalid data. Please provide valid data.');
      return;
    }

    this.spinner.show();

    // Make API call to book appointments
    this.apiservice.bookappointmentapi(appointmentsData).subscribe(
      (res) => {
        console.log('API Response:', res);

        this.spinner.hide();

        if (res && res.status === 1) {
          this.applicantdata = res.result;
          this.apiservice.token = res.token;
          this.onButtonClick();


          this.selectedOptions = [];
          this.selectedDate = null;
          this.time = null;

          this.router.navigate(['/appointmentview']).then(success => {
            if (success) {
              console.log('Navigation successful');
              localStorage.removeItem('cancelData')
              this.toastr.success(res.message);
            } else {
              console.error('Navigation failed');
            }
          });
        } else {
          console.error('Unexpected API response:', res);
          this.toastr.error(res.message);
        }
      },
      (error) => {
        this.spinner.hide();
        console.error('API error: ', error);
        alert('An error occurred while processing your request.');
      }
    );
  }

  private getAppointmentDetails(item: any): { department: string | undefined, service: string | undefined, serviceCode: string | undefined } {
    if (item.confirmatoryData) {
      return {
        department: item.confirmatoryData.department,
        service: item.confirmatoryData.service,
        serviceCode: item.confirmatoryData.service_code
      };
    }
    if (item.specialityData) {
      return {
        department: item.specialityData.department,
        service: item.specialityData.service,
        serviceCode: item.specialityData.service_code
      };
    }
    if (item.retakeData) {
      return {
        department: item.retakeData.department,
        service: item.retakeData.service,
        serviceCode: item.retakeData.service_code
      };
    }
    if (item.additionalData) {
      return {
        department: item.additionalData.department,
        service: item.additionalData.service,
        serviceCode: item.additionalData.service_code
      };
    }
    console.error('No data available in confirmatoryData, specialityData, or retakeData');
    return { department: undefined, service: undefined, serviceCode: undefined };
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  // Am Pm Change To Method

  selectTime(startTime: string, endTime: string) {

    if (this.selectedStartTime === startTime && this.selectedEndTime === endTime) {


      this.selectedStartTime = null;
      this.selectedEndTime = null;
      this.selectedTime = '';
    } else {
      this.selectedStartTime = startTime;
      this.selectedEndTime = endTime;



      this.selectedTime = `${this.selectedStartTime} - ${this.selectedEndTime}`;

      console.log(this.selectedTime, 'Selected Time in 12-hour format');

      this.startTime = startTime;
      this.endTime = endTime;

      this.time = `${this.selectedStartTime} to ${this.selectedEndTime}`;

      console.log(this.time);
    }
  }





  isSelectedTime(startTime: string, endTime: string): boolean {
    return this.selectedTime === `${startTime} - ${endTime}`;
  }

  clickDate(date: string) {
    this.date = this.formatDate(date);
    console.log('Selected date:', this.date);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;

  }

  // Date Click To Highlight
  handleDateClick(fullDate: string) {
    if (this.selectedDate === fullDate) {
      this.selectedDate = '';
    } else {
      this.selectedDate = fullDate;
    }

    console.log('Selected date:', this.selectedDate);

    // Call datefunction only if a date is selected
    if (this.selectedDate) {
      this.datefunction('yourCenterCode');
    }
  }

  handlemulticlick(clickedDate: string) {
    this.selectedDate = clickedDate === this.selectedDate ? null : clickedDate;
  }



  onButtonClick(): void {
    const visa_number = sessionStorage.getItem('visa_number');
    if (!visa_number) {
      alert('No visa number found in session storage.');
      return;
    }
    const paramss = { visa_number: visa_number };
    // const params = { visa_number: '987856745654' }; 
    console.log(paramss);

    this.apiservice.appointmentHistory(paramss).subscribe({
      next: (response) => {

        this.responseData = response;
        console.log('API response:', response);

        localStorage.setItem('viewData', JSON.stringify(response.data));

        this.router.navigate(['/appointmentview']);

      },
      error: (err) => {
        console.error('API call error:', err);

      }
    });
  }

}
