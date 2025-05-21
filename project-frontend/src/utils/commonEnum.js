import CryptoJS from "crypto-js";
export const baseURL= import.meta.env.VITE_APP_API_URL + import.meta.env.VITE_DOCUMENT_URL|| "localhost:4000/api/";
// common status code
export const StatusCode = {
  success: 200,
  badRequest: 400,
  unauthorized: 401,
  notacceptable: 406,
  forbidden: 403,
  conflict: 409,
  timeOut: 504,
};

// usertypes
export const userTypes = {
  adminLogin: 2,
  agentsLogin: 1,
  consumersLogin: 1,
};

export const ticketStatus = {
	Open: 100,
	Progress: 101,
	Close: 102,
	ReOpen: 103,
}

export const statusMapping = {
    [ticketStatus.Open]: { label: "Open", variant: "active" },
    [ticketStatus.Progress]: { label: "In Progress", variant: "warning" },
    [ticketStatus.Close]: { label: "Closed", variant: "deactive" },
    [ticketStatus.ReOpen]: { label: "Re Opened", variant: "info" }
};


// common loader
export const commonLoader = (className) => {
  if (className == "show") {
    document.body.classList.add("show-loader");
  } else {
    document.body.classList.remove("show-loader");
  }
};

// Message And Title for Common Dialog
export const Message = {
    Delete: "Are You Sure You Want To Delete?",
    Update: "Are You Sure You Want To Update Status?",
    Erorr:'delete',
    Success:'success',
};
export const MessageAndTitle = {
  ApplyContent: "Are You Sure You Want To Delete?",
  ApplyTitle: "",
};

// message and title for status update dialog
export const MessageActiveTitle = {
  ApplyContent: "Are You Sure You Want To Update Status?",
  ApplyTitle: "",
};

// Define your secret key
const secretKey = "a2a70b769e6d4d12336723d11273e93b";

// Function to encode data
export async function encodeData(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

// Function to decode data
export async function decodeData(encodedData) {
  const bytes = CryptoJS.AES.decrypt(encodedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Function to decode query Params data
export const decryptData = async (data) => {
    const decodedData = decodeURIComponent(data);
    const decryptedText = await decodeData(decodedData);
    return JSON.parse(decryptedText);
};

// date & time formatter
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2); // Ensure two digits for day with leading zero
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear().toString().slice(0);
  let hour = date.getHours();
  const minute = ("0" + date.getMinutes()).slice(-2);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // Handle midnight
  // const formattedDate = `${day}-${monthNames[monthIndex]}-${year}`;
  const formattedDate = `${day}-${monthNames[monthIndex]}-${year}, ${hour}:${minute} ${ampm}`;
  return formattedDate;
};

//Common function to fetch document to show
export const commonPatchValueForFile = async (file_name) => {
  const fileUrl =
    import.meta.env.VITE_APP_API_URL +
    import.meta.env.VITE_DOCUMENT_URL +
    // "/" +
    file_name;
  const extension = await file_name.split(".").pop().toLowerCase();
  const isImage = extension.match(/^jpg|jpeg|png|gif|bmp|svg|webp$/);
  const isPdf = extension === "pdf";
  let type;

  if (isImage) {
    type = `image/${extension === "jpg" ? "jpeg" : extension}`;
  } else if (isPdf) {
    type = "application/pdf";
  } else {
    type = "application/octet-stream";
  }
//   if (extension == "pdf") {
//     type = "application/pdf";
//   } else if (extension == "jpg") {
//     type = "image/jpg";
//   } else if (extension == "png") {
//     type = "image/png";
//   } else if (extension == "jpeg") {
//     type = "image/jpeg";
//   } 
//   else if (extension == "PDF") {
//     type = "application/PDF";
//   }
  const serviceToken = window.localStorage.getItem("serviceToken");
  const blob = await fetch(fileUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${serviceToken}`,
    },
  }).then((res) => res.blob({ type: type }));
  const file = new File([blob], `${file_name}.${extension}`, { type: type });
  return file;
};

export const acceptFileType = "image/*,.pdf";
export const filesTypes = ["application/pdf", "image/jpg", "image/png","image/jpeg",];
export const maxFileSize = 2 * 1024 * 1024;
export const pdfFileFormatMessage =
  "Unsupported File Format. Upload Supported File Only.";
export const pdfFileSizeMessage =
  "File Size Exceeds 2 MB. Please Upload a Smaller File.";
export const pdfUploadFileSize = "Image/PDF Upto 2 MB";
export const regexChar = /^[a-zA-Z0-9'\'\-_.,/ ]*$/;
export const regexAlphabet = /^[a-zA-Z'\'\-.,/ ]*$/;
export const regexNumerical = /^[0-9]*$/;

