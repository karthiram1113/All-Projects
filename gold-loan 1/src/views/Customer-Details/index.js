import React, { useRef, useState, useEffect } from 'react';
import Navbars from '../../common/Navbar';
import Noimage from '../../assets/img/noimages.jpg'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom';
import superAdminApis from '../../api/services/admin-pages/superAdmin';
import { toast } from 'react-toastify';
import { baseURL } from '../../api/api';

import AOS from "aos";
import "aos/dist/aos.css";

import GoldFlower from '../../assets/img/goldflower1.png'
function CustomerDetails() {

      useEffect(() => {
            AOS.init({
              duration: 1000,  
              once: false,    
              mirror: true,    
            });
          }, []);

  

  const navigate = useNavigate();
 const [loading ,setLoading] = useState(false)
   const [submit, setSubmit] = useState(false);
  const [editId,setEditId] = useState('')
  const [urlValue,setUrlValue] =useState("")
  const [id,setId] = useState("")
  const [padiStatus,setPaidStatus] = useState("")

  const [aadharImages, setAadharImages] = useState([]);

  const [goldRate,setGoldRate] = useState("")


   const location = useLocation();
  const { customer } = location?.state || {};

console.log(customer)
  

 useEffect(()=>{
 const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setEditId(myArray[3])
        setUrlValue(myArray[2])
        setId(myArray[3])

    console.log(myArray[5]);
    

},[])

  useEffect(() => {
   
  handleCustomerGoldGet()  
  if (editId) {
    handleCustomerDetailsGet(editId);
  }
}, [editId]);
  

// const dd=`${baseURL}${customer?.liveImage.path}${customer?.liveImage.altered_file_name}`


// console.log(dd);


  const handleSubmit =() => {
    navigate ('/customer-details-list')
  }

  
      const handleBackCustomer = () => {
      navigate('/customer-details-list') 
    }


  // 🧾 Form Data
const [isAdditionalLoan, setIsAdditionalLoan] = useState(false);

const [formData, setFormData] = useState({
  name:customer?.name || "",
   additionalLoanAmount: "",
     additionalLoanDate: "",

  guardian_name :customer?.guardian_name|| "" ,
  paid_status : "" ,
  date: "",
  phone:customer?.phone_no|| "",
  alterPhone: customer?.alter_phone_no || "",
  loanAmount: "",
  interestRate: "",
  durationType: "months",
  duration: "1",
  interestAmount: "",
  totalAmount: "",
   adhar: customer?.aadhar_no || "",
  
  // Separate Aadhar state
 aadharFiles: [],
  aadharPreviews: [],
  aadharUploadedIds: [],
  
 // Live image preview
  liveFile: null,
  livePreview: customer?.liveImage
    ? `${baseURL}${customer?.liveImage?.path}${customer?.liveImage.altered_file_name}`
    : "",
  liveUploadedId:customer?.live_img || null,


  jewellFile: null,
  jewellPreview: "",
  jewellUploadedId: null,

   adharFile1: null,
  adharPreview1: "",
  adharUploadedId1: null,

   optFile: null,
  optPreview: "",
  optUploadedId: null,

  jewellWeight:"",
  jewellName:"",
  jewellAmount :"",

  releaseDate: "",
  address: customer?.address || "",

  
});

const uploadLock = useRef(false);

const handleChange = async (e) => {
  const { name, value, files } = e.target;

    setFormData((prev) => {
    let updated = { ...prev, [name]: value };

    if (name === "jewellWeight") {
      const weight = parseFloat(value) || 0;
      const amount = weight * goldRate;

      updated.jewellAmount = amount ? amount.toFixed(2) : "";
    }

    return updated;
  });


if (name === "adharcardpic" && files?.length > 0) {

  const fileArray = Array.from(files); // convert FileList to real JS array

  const previews = fileArray.map(file => URL.createObjectURL(file));

  setFormData(prev => ({
    ...prev,
    aadharFiles: fileArray,
    aadharPreviews: previews,
  }));

  const uploadedIds = await handleAadharMultiUpload(fileArray);

  setFormData(prev => ({
    ...prev,
    aadharUploadedIds: uploadedIds
  }));

  return;
}




    if (name === "adharcardpic1" && files?.[0]) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      adharFile1: file,
      adharPreview1: previewUrl,
    }));

    // Upload Aadhar
    const uploadedId = await handleAdharPhotoUpload(file);
    setFormData(prev => ({ ...prev, adharUploadedId: uploadedId }));
    return;
  }


     if (name === "optionPic" && files?.[0]) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      optFile: file,
      optPreview: previewUrl,
    }));

    // Upload Aadhar
    const uploadedId = await handleAdharPhotoUpload(file);
    setFormData(prev => ({ ...prev, adharUploadedId: uploadedId }));
    return;
  }

  if (name === "imgFile" && files?.[0]) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      liveFile: file,
      livePreview: previewUrl,
      liveUploadedId: uploadedId, 
    }));

    // Upload live pic
    const uploadedId = await handleCustomerPhotoUpload(file);
    setFormData(prev => ({ ...prev, liveUploadedId: uploadedId }));
    return;
  }


    if (name === "jewellPic" && files?.[0]) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      jewellFile: file,
      jewellPreview: previewUrl,
    }));

    // Upload live pic
    const uploadedId = await handleCustomerPhotoUpload(file);
    setFormData(prev => ({ ...prev, liveUploadedId: uploadedId }));
    return;
  }

  // Other inputs
setFormData(prev => {
  const updated = { ...prev, [name]: value };

  const loan = parseFloat(updated.loanAmount) || 0;
  const rate = parseFloat(updated.interestRate) || 0;
  const duration = parseFloat(updated.duration) || 0;

    if (!loan) {
    updated.interestAmount = "";
    updated.totalAmount = "";
    return updated;
  }


  if (loan > 0 && rate > 0 && duration === 1) {
    // Only calculate for 1 month
    const interest = (loan * rate) / 100;
    updated.interestAmount = interest.toFixed(2);
    updated.totalAmount = (loan + interest).toFixed(2);
  } else {
    // Keep previous value
    updated.interestAmount = prev.interestAmount;
    updated.totalAmount = prev.totalAmount;
  }

  return updated;
});


};


  const [imageSrc, setImageSrc] = useState(
  customer?.liveImage
    ? `${baseURL}${customer.liveImage.path}${customer.liveImage.altered_file_name}`
    : null
);

  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);



  // 📸 Upload Button → opens file picker

const handleUploadClick = () => {
  fileInputRef.current?.click();
};


// Live Upload

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  // set preview first
  setFormData(prev => ({
    ...prev,
    imgFile: file,
    imgPreview: previewUrl,
  }));
  setImageSrc(previewUrl);

  // upload file
  const uploadedId = await handleCustomerPhotoUpload(file);

  // update LIVE UPLOADED ID (not uploadedImgId)
  setFormData(prev => ({
    ...prev,
    liveUploadedId: uploadedId,
  }));
};


const handleCustomerPhotoUpload = async (file) => {
  const formData = new FormData();
  formData.append("files[0]", file);

  try {
    const res = await superAdminApis.customerImageUpload(formData);

    if (res?.apiStatus?.code === "200") {
      toast.success(res.apiStatus.message || "File uploaded successfully!");
      return res?.responseData?.[0]?.img_id?.toString() || null;

    } else {
      toast.error(res?.apiStatus?.message || "Upload failed.");
      return null;
    }
  } catch (err) {
    console.error("Image upload error:", err);
    toast.error("Image upload failed. Please try again.");
    return null;
  }
};

// Adhar Upload

const handleAadharChange = async (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const previews = files.map(f => URL.createObjectURL(f));

  setFormData(prev => ({
    ...prev,
    adharFile: files,
    adharPreview: previews
  }));

  // Upload multiple files in ONE API call
  const uploadedIds = await handleAadharMultiUpload(files);

  setFormData(prev => ({
    ...prev,
    adharUploadedId: uploadedIds
  }));
};







const handleOptionalPicChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  // Update only Aadhar preview
  setFormData(prev => ({
    ...prev,
    adharFile1: file,
    optPreview: previewUrl,
  }));

  // Upload Aadhar separately
  const uploadedId = await handleAdharPhotoUpload(file);

  setFormData(prev => ({
    ...prev,
    optUploadedId: uploadedId,
  }));
};

// Jewell Upload

const handleJewellChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  setFormData(prev => ({
    ...prev,
    jewellFile: file,
    jewellPreview: previewUrl,
  }));

  // upload file
  const uploadedId = await handleAdharPhotoUpload(file);

  // VERY IMPORTANT: update immediately
  setFormData(prev => ({
    ...prev,
    jewellUploadedId: uploadedId,
  }));

  console.log("Uploaded ID:", uploadedId); 
};


const handleAdharPhotoUpload = async (file) => {
  const formData = new FormData();
  formData.append("files[0]", file);

  try {
    const res = await superAdminApis.customerImageUpload(formData);

    if (res?.apiStatus?.code === "200") {
      toast.success(res.apiStatus.message || "Uploaded successfully!");

      // FIXED — backend returns array
      return res?.responseData?.[0]?.img_id?.toString() || null;
    } else {
      toast.error(res?.apiStatus?.message || "Upload failed.");
      return null;
    }
  } catch (err) {
    console.error("Upload error:", err);
    toast.error("Upload failed. Please try again.");
    return null;
  }
};


const handleAadharMultiUpload = async (files) => {
  const formData = new FormData();

  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);  // KEY PART!
  });

  try {
    const res = await superAdminApis.customerImageUpload(formData);

    if (res?.apiStatus?.code === "200") {
      toast.success("Aadhar uploaded successfully!");

      return res.responseData.map(x => x.img_id.toString());
    } else {
      toast.error(res.apiStatus.message || "Upload failed");
      return [];
    }

  } catch (err) {
    console.error(err);
    toast.error("Upload failed");
    return [];
  }
};


  // 🔁 Toggle camera front/back
  const [cameraFacing, setCameraFacing] = useState('user');
  const handleToggleCamera = () => {
    setCameraFacing((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // 🧩 Convert dataURL to file
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};



  // 📸 Capture from camera


const handleCapture = async () => {
  if (!videoRef.current) return;

  const canvas = document.createElement("canvas");
  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  const imageDataUrl = canvas.toDataURL("image/png");
  const capturedFile = dataURLtoFile(imageDataUrl, "captured-photo.png");

  const uploadedId = await handleCustomerPhotoUpload(capturedFile);

  console.log(uploadedId);
  

  setFormData(prev => ({
    ...prev,
    imgFile: capturedFile,
    imgPreview: imageDataUrl,
    uploadedImgId: uploadedId,
    liveUploadedId: uploadedId,
  }));
  setImageSrc(imageDataUrl);
  setCapturedPhoto(imageDataUrl);

  const closeBtn = document.getElementById("closeCameraModalBtn");
  if (closeBtn) closeBtn.click();
};


  // 🎥 Start camera when modal opens
  useEffect(() => {
    const modal = document.getElementById('cameraModal');
    if (!modal) return;

    const handleShow = async () => {
      if (!navigator?.mediaDevices?.getUserMedia) {
        showCameraError(modal, 'Camera not available.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraFacing },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('Camera access error:', err);
        showCameraError(modal, 'Cannot access camera right now.');
      }
    };

    modal.addEventListener('shown.bs.modal', handleShow);
    return () => modal.removeEventListener('shown.bs.modal', handleShow);
  }, [cameraFacing]);

  // ❌ Stop camera when modal closes
  useEffect(() => {
    const modal = document.getElementById('cameraModal');
    if (!modal) return;

    const handleHide = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    modal.addEventListener('hidden.bs.modal', handleHide);
    return () => modal.removeEventListener('hidden.bs.modal', handleHide);
  }, []);

  // ⚠️ Helper for camera error
  const showCameraError = (modal, message) => {
    const body = modal.querySelector('.modal-body');
    if (body) {
      body.innerHTML = `
        <p class="text-danger">${message}</p>
        <button class="btn btn-secondary mt-3" data-bs-dismiss="modal">Close</button>
      `;
    }
  };

  // ✅ Handle form input
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };


 






console.log(formData?.guardian_name);



const customerCreate = (e) => {
  e.preventDefault();
  setSubmit(true); 

 if (
  !formData.name &&
  !formData.date &&
  !formData.adhar &&
  !formData.phone &&
  !formData.interestRate &&
  !formData.loanAmount &&
  !formData.jewellName &&
  !formData.jewellWeight
) {
  // toast.error("Please fill all required fields");
  return;
}
  setLoading(true);


  // Trim inputs
  const phone = formData.phone.trim();
  const adhar = formData.adhar.trim();
  const name = formData.name.trim();

  let valid = true;
  if (!name) valid = false;
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) valid = false;
  if (!adhar || !/^\d{16}$/.test(adhar)) valid = false;
  if (!valid) { setLoading(false); return; }

  // ------------- INTEREST CALCULATION BASED ON TODAY -------------
  const loan = parseFloat(formData.loanAmount) || 0;
  const rate = parseFloat(formData.interestRate) || 0;
  const startDate = new Date(formData.date);
  const today = new Date();

  let months = (today.getFullYear() - startDate.getFullYear()) * 12;
  months += today.getMonth() - startDate.getMonth();

  let dayFraction = 0;
  if (today.getDate() > startDate.getDate()) {
    const totalDays = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
    dayFraction = (today.getDate() - startDate.getDate()) / totalDays;
  }
  const totalMonths = months + dayFraction;

  const interestAmount = loan * (rate / 100) * totalMonths;
  const totalAmount = loan + interestAmount;
  // ----------------------------------------------------------------

const finalLiveId = formData.liveUploadedId ?? customer?.live_img ?? null;



  const apiData = {
    customerDetails: {
      id:id,
      name: formData.name,
      guardian_name:formData.guardian_name,
      date: formData.date,  // this is start date
      phone_no: formData.phone,
      alter_phone_no: formData.alterPhone,
      loan_amount: loan,
      intrest_rate: rate,
      duration_type: formData.durationType,
      duration: formData.duration,
      intrest_amount: interestAmount.toFixed(2),
      total_amount: totalAmount.toFixed(2),
      aadhar_no: formData.adhar,
aadhar_img: formData.adharUploadedId,
      // aadhar_img_1:formData.adharUploadedId1,
      optional_img:formData.optUploadedId,
jewel_img: formData.jewellUploadedId,
      jewel_name:formData.jewellName,
      jewel_weight:formData.jewellWeight,
      jewell_amount:formData.jewellAmount,
      release_date: formData.releaseDate,
      address: formData.address,
live_img: finalLiveId, 
paid_status :formData?.paid_status ,

additional_loan_date: isAdditionalLoan ? formData.additionalLoanDate : "",
additional_loan_amt: isAdditionalLoan ? formData.additionalLoanAmount : ""

   },
  };

  // superAdminApis.customerdetailsCreate(apiData)
  const apiCall =
    urlValue === "create"
      ? superAdminApis.customerdetailsCreate(apiData)
      : superAdminApis.customerDetailsUpdateAPI(apiData);

  apiCall
    .then((responseData) => {
      setLoading(false);
      setSubmit(false);
      if (responseData?.apiStatus?.code === "200") {
        toast.success(responseData?.apiStatus?.message)
        navigate("/customer-details-list");
      } else {
        toast.error(responseData?.message );
      }
    })
    .catch((error) => {
      setSubmit(false);
      setLoading(false);
      console.error("Error creating customer:", error);
      toast.error("An error occurred while creating customer.");
    });
};



// CustomerDetailsGet

// const handleCustomerDetailsGet = (customerId) => {
//   superAdminApis.customerDetailsGet(customerId)
//     .then((responseData) => {
//       if (responseData?.apiStatus?.code === "200") {
//         const customer = responseData?.result;

//         // Now fill your formData with response
//         setFormData({
//           name: customer?.name || "",
//          date: customer?.date ? customer.date.split(" ")[0] : "",
//           phone: customer?.phone_no || "",
//           alterPhone: customer?.alter_phone_no || "",
//           loanAmount: customer?.loan_amount || "",
//           interestRate: customer?.intrest_rate || "",
//           durationType: customer?.duration_type || "months",
//           duration: customer?.duration || "",
//           interestAmount: customer?.intrest_amount || "",
//           totalAmount: customer?.total_amount || "",
//           adhar: customer?.aadhar_no || "",
//           releaseDate: customer?.release_date !== "0000-00-00" ? customer?.release_date : "",
//           address: customer?.address || "",

//           // 🔹 Aadhar image
//           adharUploadedId: customer?.aadhar_img || null,
//           adharPreview: customer?.aadharImage
//             ? `${baseURL}${customer?.aadharImage?.path}${customer?.aadharImage?.altered_file_name}`
//             : "",

//           // 🔹 Live image
//           liveUploadedId: customer?.live_img || null,
//           livePreview: customer?.liveImage
//             ? `${baseURL}${customer?.liveImage?.path}${customer?.liveImage?.altered_file_name}`
//             : "",

//           // 🔹 Jewel image
//           jewellName:customer?.jewel_name,
//           jewellWeight:customer?.jewel_weight,
//           jewellUploadedId: customer?.jewel_img || null,
//           jewellPreview: customer?.jewelImg
//             ? `${baseURL}${customer?.jewelImg?.path}${customer?.jewelImg?.altered_file_name}`
//             : "",
//         });
//       } else {
//         toast.error(responseData?.apiStatus?.message || "Failed to fetch customer");
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching customer details:", error);
//       toast.error("An error occurred while fetching customer details.");
//     });
// };


const handleCustomerDetailsGet = (customerId) => {
  superAdminApis.customerDetailsGet(customerId)
    .then((responseData) => {
      if (responseData?.apiStatus?.code === "200") {
        const customer = responseData?.result;

        setPaidStatus(customer?.paid_status)

        // Aadhaar images array → pick safely
        const aadhar1 = customer?.aadharImage?.[0] || null;
        const aadhar2 = customer?.aadharImage?.[1] || null;

        // Get front and back Aadhaar images
const aadharFront = customer?.aadharImage?.[0] || null;
const aadharBack = customer?.aadharImage?.[1] || null;

// Get their IDs, or null if they don't exist
const adharFrontId = aadharFront?.id || null;
const adharBackId = aadharBack?.id || null;

const aadharIds = customer?.aadharImage?.map(img => img.id) || [];

const additinoalAmtDetails = customer?.additionalAmtDetails || {};

if (
  additinoalAmtDetails?.additional_loan_amt ||
  additinoalAmtDetails?.additional_loan_date
) {
  setIsAdditionalLoan(true);
}






        // Jewel image
        const jewelImg = customer?.jewelImg || null;

        const optImg = customer?.optionalImg || null ;

        // Live image
        const liveImg = customer?.liveImage || null;

        setFormData({
          name: customer?.name || "",
          guardian_name : customer?.guardian_name || "" ,
          date: customer?.date ? customer.date.split(" ")[0] : "",
          phone: customer?.phone_no || "",
          alterPhone: customer?.alter_phone_no || "",
          loanAmount: customer?.loan_amount || "",
          interestRate: customer?.intrest_rate || "",
          durationType: customer?.duration_type || "months",
          duration: customer?.duration || "",
          interestAmount: customer?.intrest_amount || "",
          totalAmount: customer?.total_amount || "",
          adhar: customer?.aadhar_no || "",
          releaseDate: customer?.release_date !== "0000-00-00" ? customer?.release_date : "",
          address: customer?.address || "",
          paid_status :customer?.paid_status || "" ,

          // 🔹 Aadhaar FRONT
          // adharUploadedId: updatedData ,
        adharUploadedId: aadharIds,
          adharPreview: aadhar1
            ? `${baseURL}${aadhar1?.path}${aadhar1?.altered_file_name}`
            : "",

          // 🔹 Aadhaar BACK
          adharUploadedId1: aadhar2 ? aadhar2.id : null,
          adharPreview1: aadhar2
            ? `${baseURL}${aadhar2?.path}${aadhar2?.altered_file_name}`
            : "",

          // 🔹 LIVE IMAGE
          liveUploadedId: customer?.live_img || null,
          livePreview: liveImg
            ? `${baseURL}${liveImg?.path}${liveImg?.altered_file_name}`
            : "",

          // 🔹 JEWEL IMAGE
          jewellUploadedId: customer?.jewel_img || null,
          jewellPreview: jewelImg
            ? `${baseURL}${jewelImg?.path}${jewelImg?.altered_file_name}`
            : "",

          optUploadedId :customer?.optional_img || null, 
          optPreview :optImg
            ? `${baseURL}${optImg?.path}${optImg?.altered_file_name}`
            : "" ,

          jewellName: customer?.jewel_name || "",
          jewellWeight: customer?.jewel_weight || "",

  additionalLoanAmount:
    additinoalAmtDetails?.additional_loan_amt || "",
  additionalLoanDate:
    additinoalAmtDetails?.additional_loan_date || "",


        });
      } else {
        toast.error(responseData?.apiStatus?.message || "Failed to fetch customer");
      }
    })
    .catch((error) => {
      console.error("Error fetching customer details:", error);
      toast.error("An error occurred while fetching customer details.");
    });
};



  //Gold Rate Get Api

  const handleCustomerGoldGet = (customerId) => {
    superAdminApis.dashboardDGoldGetAPI(customerId)
      .then((responseData) => {
        if (responseData?.apiStatus?.code === "200") {
          const result = responseData?.result;

          setGoldRate(result?.gold_rate)

        } else {
          console.error("Failed to fetch customer details");
        }
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
      });
  };



  return (  
    <div>
      <Navbars />

      <div className="container all-modules-height card">

<div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 mb-4">
  <h5 className="heading-with-line mb-2 mb-md-0 text-center text-md-start aquanew-text-effect">
    Customer Details  {urlValue=='edit'?'Edit':''}
    <hr className="smooth-line" />
  </h5>

  <button
    className="btn add-customer"
    onClick={handleBackCustomer}
  >
    <i className="fa fa-arrow-left me-2"></i> Back
  </button>
</div>


<form  data-aos="fade-up">
      <div className="row p-0 overlay-text mt-3">
        {/* Name */}
        <div className="col-md-6">
          <div className="form-group">
            <label className='form-label required-star'>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              style={submit && formData.name.length === 0 ? { borderColor: 'red' } : {}}
            />
             {submit && formData.name.length === 0 && (
    <div className="text-danger">Name is required</div>
  )}
          </div>
        </div>

          <div className="col-md-6">
          <div className="form-group">
            <label className='form-label '>Guardian Name</label>
            <input
              type="text"
              name="guardian_name"
              className="form-control"
              value={formData.guardian_name}
              onChange={handleChange}
             
            />
           
          </div>
        </div>

        {/* Phone */}
<div className="col-md-6">
  <div className="form-group">
    <label className="form-label required-star">Phone No</label>
    <input
      type="text"
      name="phone"
      className="form-control"
      value={formData.phone}
      onChange={(e) => {
        const value = e.target.value;
        // Allow only digits, max 10
        if (/^\d*$/.test(value) && value.length <= 10) {
          setFormData({ ...formData, phone: value });
        }
      }}
      maxLength="10"
      style={
        // Red border if live input invalid or submit failed
        (formData.phone.length > 0 && !/^[6-9]\d{9}$/.test(formData.phone)) ||
        (submit && formData.phone.length === 0)
          ? { borderColor: 'red' }
          : {}
      }
    />

    {/* Show required message only on submit if empty */}
    {submit && formData.phone.length === 0 && (
      <div className="text-danger">Phone number is required</div>
    )}

    {/* Live validation for incorrect phone */}
    {formData.phone.length > 0 && formData.phone.length < 10 && (
      <div className="text-danger">Enter a valid 10-digit phone number</div>
    )}

    {/* Live validation if number is 10 digits but doesn't start with 6-9 */}
    {formData.phone.length === 10 && !/^[6-9]/.test(formData.phone) && (
      <div className="text-danger">Phone number should start with 6–9</div>
    )}
  </div>
</div>



          <div className="col-md-6">
          <div className="form-group">
            <label>Alter Phone No</label>
            <input
              type="text"
              name="alterPhone"
              maxLength="10"
              className="form-control"
              value={formData?.alterPhone}
              onChange={handleChange}
            />
          </div>
        </div>

 {/* Address */}
        <div className="col-md-6">
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>



        {/* Live Pic */}
    <div className="col-md-6"> <div className="form-group"> 
      <label className="form-control-label mb-4">Live Pic</label>
       <div className="d-flex align-items-center gap-3"> 
        <img src={imageSrc || formData.livePreview || Noimage} alt="Profile" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ccc', }} /> 
        <div className="d-flex gap-2 upload-capture-btn"> 
          <button type="button" className="btn btn-secondary" onClick={handleUploadClick} >
             Upload
              </button> 
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
           <button type="button" data-bs-toggle="modal" data-bs-target="#cameraModal" className="btn btn-outline-primary" >
             Capture 
             </button> 
             </div> 
             </div> 
             </div>
              </div>

<div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 mb-4">
  <h5 className="heading-with-line mb-2 mb-md-0 text-center text-md-start aquanew-text-effect">
    Loan Details
    <hr className="smooth-line" />
  </h5>
  </div>

        {/* Date */}
   <div className="col-md-4">
  <div className="form-group">
    <label className="form-label required-star">Loan Start Date</label>
    <input
      type="date"
      name="date"
      className="form-control"
       value={formData.date}
      onChange={handleChange}
      onClick={(e) => {
        const input = e.currentTarget;
        if (typeof input.showPicker === "function") {
          input.showPicker(); // Chrome/Edge
        } else {
          input.focus(); // Safari fallback
        }
      }}
      // 🔒 Allow only today's date
      // min={new Date().toISOString().split("T")[0]}
      // max={new Date().toISOString().split("T")[0]}
      style={
        submit && formData.date.length === 0
          ? { borderColor: "red" }
          : {}
      }
    />
    {submit && formData.date.length === 0 && (
      <div className="text-danger">Date is required</div>
    )}
  </div>
</div>





        {/* Loan Amount */}
        <div className="col-md-4">
          <div className="form-group">
            <label className='required-star'>Loan Amount (₹)</label>
            <input
              type="number"
              name="loanAmount"
              className="form-control"
              value={formData.loanAmount}
              onChange={handleChange}
              style={submit && formData.loanAmount.length === 0 ? { borderColor: 'red' } : {}}
            />
             {submit && formData.loanAmount.length === 0 && (
    <div className="text-danger">Loan amount is required</div>
  )}
          </div>
        </div>

        {/* Interest Rate */}
       <div className="col-md-4">
  <div className="form-group">
    <label className='required-star'>Interest Rate (%)</label>
    <select
      name="interestRate"
      className="form-control"
      value={formData.interestRate}
      onChange={handleChange}
      style={submit && formData.interestRate.length === 0 ? { borderColor: 'red' } : {}}
    >
      <option value="">Select Rate</option>
      <option value="2">2%</option>
      <option value="2.5">2.5%</option>
      <option value="3">3%</option>
    </select>
    {submit && formData.interestRate.length === 0 && (
    <div className="text-danger">Interest is required</div>
  )}
  </div>
</div>

{urlValue !== 'edit' && (
  <>
    {/* Duration Type */}
    <div className="col-md-4">
      <div className="form-group">
        <label>Duration Type</label>
        <select
          name="durationType"
          className="form-control"
          value={formData.durationType}
          onChange={handleChange}
        >
          <option disabled value="">Select Duration</option>
          {/* <option value="days">Days</option>
          <option value="weeks">Weeks</option> */}
          <option value="months">Months</option>
        </select>
      </div>
    </div>

    {/* Interest Amount */}
    <div className="col-md-4">
      <label>Interest Amount (₹)</label>
      <input
        type="text"
        className="form-control"
        value={formData.interestAmount}
        readOnly
      />
    </div>

    {/* Total Amount */}
    <div className="col-md-4">
      <label>Total Amount (₹)</label>
      <input
        type="text"
        className="form-control"
        value={formData.totalAmount}
        readOnly
      />
    </div>
  </>
)}


       


{/* Aadhar No */}
<div className="col-md-6">
  <div className="form-group">
    <label className='form-label required-star'>Aadhar No</label>
    <input
      type="text"
      name="adhar"
      className="form-control"
      value={formData.adhar}
      onChange={(e) => {
        const value = e.target.value;
        // Only allow digits, max 16 characters
        if (/^\d*$/.test(value) && value.length <= 16) {
          setFormData({ ...formData, adhar: value });
        }
      }}
      maxLength="16"
      style={
        // Red border if live input is invalid or submit failed
        (formData.adhar.length > 0 && formData.adhar.length !== 16) ||
        (submit && formData.adhar.length === 0)
          ? { borderColor: 'red' }
          : {}
      }
    />

    {/* Show required message on submit if empty */}
    {submit && formData.adhar.length === 0 && (
      <div className="text-danger">Aadhar number is required</div>
    )}

    {/* Show live validation error for incorrect length */}
    {formData.adhar.length > 0 && formData.adhar.length !== 16 && (
      <div className="text-danger">Enter a valid 16-digit Aadhar number</div>
    )}
  </div>
</div>





        {/* Aadhar Card Photo */}
        <div className="col-md-6">
          <div className="form-group">
            <label>Aadhar Card Photo</label>
            <input
            multiple
              type="file"
              name="adharcardpic"
              className="form-control"
              onChange={handleAadharChange}
            />
          </div>
        </div>

         {/* <div className="col-md-4">
          <div className="form-group">
            <label>Aadhar Card Photo (back)</label>
            <input
              type="file"
              name="adharcardpic1"
              className="form-control"
              onChange={handleAadharChange1}
            />
          </div>
        </div> */}

           <div className="col-md-4">
          <div className="form-group">
            <label className='form-label required-star'>Jewel Name</label>
            <input
              type="text"
              name="jewellName"
              className="form-control"
             value={formData.jewellName}
              onChange={handleChange}
              style={submit && formData.jewellName.length === 0 ? { borderColor: 'red' } : {}}
            />
              {submit && formData.jewellName.length === 0 && (
    <div className="text-danger">Jewel name is required</div>
  )}
          </div>
        </div>

           <div className="col-md-4">
          <div className="form-group">
            <label className='form-label required-star'>Jewel Weight</label>
   <div style={{ position: "relative" }}>
  <input
    type="number"
    name="jewellWeight"
    className="form-control"
    value={formData.jewellWeight}
    onChange={handleChange}
    style={{
      paddingRight: "50px",
    }}
  />

 {formData.jewellWeight && (
    <span
      style={{
        position: "absolute",
        left:'50px',
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: "#444",
      }}
    >
      gram
    </span>
  )}
</div>




            
                      {submit && formData.jewellWeight.length === 0 && (
    <div className="text-danger">Jewel weight is required</div>
  )}
          </div>
        </div>

           <div className="col-md-4">
          <div className="form-group">
            <label className='form-label'>Jewel Amount</label>
            <input
              type="text"
              name="jewellAmount"
              className="form-control"
              value={formData.jewellAmount}
              onChange={handleChange}
            />
                    
          </div>
        </div>

        {/* JewellImage */}

   <div className="col-md-6">
  <div className="form-group">
    <label className="mb-2">Jewel Pic</label>

    <div className="d-flex align-items-center gap-3">
      {/* <img
        src={formData.jewellPreview || Noimage}
        alt="Jewel"
        style={{
          width: "60px",
          height: "44px",
          borderRadius: "10px",
          objectFit: "cover",
          border: "2px solid #ccc",
        }}
      /> */}

      <input
        type="file"
        name="jewellPic"
        accept="image/*"
        className="form-control"
        onChange={handleJewellChange}
      />
    </div>
  </div>
</div>


     <div className="col-md-6">
          <div className="form-group">
            <label>Pic (opt)</label>
            <input
              type="file"
              name="optionPic"
              
              className="form-control"
              onChange={handleOptionalPicChange}
            />
          </div>
        </div>

        {/* Release Date */}
        {/* <div className="col-md-12">
          <div className="form-group">
            <label>Release Date</label>
            <input
              type="date"
              name="releaseDate"
              className="form-control"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>
        </div> */}

       
{/* Addinoal loan */}

{urlValue=="edit"?<><div className="custom-flower-wrapper">
              <img className='custom-gold-flower-img' src={GoldFlower} />
            </div><div className="form-group mt-1">
                <label className="form-label">🟡 Do you want to take an additional loan? </label>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isAdditionalLoan}
                    onChange={(e) => setIsAdditionalLoan(e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
              

              {isAdditionalLoan && (
  
  <div className='row'>
    <div className='col-md-6'>
 <div className="form-group mt-2">
      <label>Additional Loan Amount</label>
      <input
        type="number"
        name='additionalLoanAmount'
        className="form-control"
        value={formData.additionalLoanAmount}
        // onChange={(e) =>
        //   setFormData({ ...formData, additionalLoanAmount: e.target.value })
        // }
        onChange={handleChange}
      />
    </div>
    </div>
    <div className='col-md-6'>
<div className="form-group mt-2">
      <label>Additional Loan Date</label>
      <input
        type="date"
        name='additionalLoanDate'
        className="form-control"
        value={formData.additionalLoanDate}
        onClick={(e) => {
        const input = e.currentTarget;
        if (typeof input.showPicker === "function") {
          input.showPicker(); // Chrome/Edge
        } else {
          input.focus(); // Safari fallback
        }
      }}
        // onChange={(e) =>
        //   setFormData({ ...formData, additionalLoanDate: e.target.value })
        // }
         onChange={handleChange}
      />
    </div>
    </div>

  </div>
   

    
  
)}
              
              </>
:""}





     



        <div className="text-end mt-3 text-center mb-3 all-btn-color">
          <button onClick={customerCreate} type="submit" className="btn btn-primary"  disabled={padiStatus === "Closed"} >
              {padiStatus === "Closed" ? "This loan is closed" : "Submit"}
          </button>
        </div>
      </div>
    </form>

        
      </div>

      {/* Camera Modal */}
      <div
        className="modal fade"
        id="cameraModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Capture Photo</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeCameraModalBtn"
              ></button>
            </div>
            <div className="modal-body text-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div className="modal-footer d-flex justify-content-center">
             
              <button className="btn btn-primary text-center" onClick={handleCapture}>
                Capture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
