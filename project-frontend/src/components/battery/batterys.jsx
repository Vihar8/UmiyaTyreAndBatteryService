import {
  BackwardOutlined,
  CloseOutlined,
  DeleteOutlined,
  EyeFilled,
  EyeInvisibleFilled,
  EyeOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import Breadcrumb from "../../commoncomponents/Breadcrumb/Breadcrumb";
import FileUpload from "../../commoncomponents/FileUpload/FileUpload";
//   import { createBrandModels, getBrands } from "../../api/adminApplication";
import {
  acceptFileType,
  commonLoader,
  commonPatchValueForFile,
  filesTypes,
  maxFileSize,
  pdfFileFormatMessage,
  pdfFileSizeMessage,
  pdfUploadFileSize,
  regexChar,
  StatusCode,
} from "../../utils/commonEnum";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "../../utils/SnackbarProvider";
// import FileUpload from "../../commoncomponents/FileUpload/FileUpload";

const Batterys = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [options, setOptions] = useState([]);
  const categoryData = location.state?.row; // Update to match your data structure
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [errorMessage1, setErrorMessage1] = useState("");
  //   const [fileInputs, setFileInputs] = useState([{ id: "other_doc_1" }]);
  const [fileInputs, setFileInputs] = useState([
    { id: "plant_image_1", index: 0 },
  ]);

  // Add New File
  const addNewFileInput = () => {
    const newId = `plant_image_${fileInputs.length + 1}`;
    setFileInputs([...fileInputs, { id: newId, index: fileInputs.length }]);
  };

  // Delete File
  const handleDeleteFileInput = (idToDelete) => {
    const indexToDelete = fileInputs.find(
      (file) => file.id === idToDelete
    )?.index;

    const updatedFiles = fileInputs.filter((file) => file.id !== idToDelete);
    setFileInputs(updatedFiles);

    const updatedValues = [...formik.values.plant_image];
    updatedValues.splice(indexToDelete, 1); // Correctly removes the matching index
    formik.setFieldValue("plant_image", updatedValues);
  };

  // Handle File Select
  const handleFileSelect = (file, index) => {
    const updatedValues = [...formik.values.plant_image];
    updatedValues[index] = file;
    formik.setFieldValue("plant_image", updatedValues);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const handlePasswordToggle = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const cityData = [
    { id: 1, value: "New York" },
    { id: 2, value: "Los Angeles" },
    { id: 3, value: "Chicago" },
    { id: 4, value: "Houston" },
    { id: 5, value: "Phoenix" },
    { id: 6, value: "Philadelphia" },
    { id: 7, value: "San Antonio" },
    { id: 8, value: "San Diego" },
    { id: 9, value: "Dallas" },
    { id: 10, value: "San Jose" },
    // Add more cities as needed
  ];
  const stateData = [
    { id: 1, value: "Gujarat" },
    { id: 2, value: "Rajasthan" },
    { id: 3, value: "mumbai" },
    // Add more cities as needed
  ];
  const countryData = [
    { id: 1, value: "India" },
    { id: 2, value: "USA" },
    { id: 3, value: "Uk" },
    // Add more cities as needed
  ];

  // Replace the array with actual API data when fetching from the API
  useEffect(() => {
    // Example static options for demonstration
    setOptions([
      { label: "plant_name A", value: "plant_name_a" },
      { label: "plant_name B", value: "plant_name_b" },
      // Future options will come from API
    ]);
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    plant_name: Yup.string().required("This field is required"),
    plant_valid: Yup.string().required("This field is required"),
    plant_expiry: Yup.string().required("This field is required"),
    status: Yup.number(),
    description: Yup.string().required("This field is required"),
    // Add validation for other fields as necessary
    state_id: Yup.string(),
    city_id: Yup.string(),
    country: Yup.string(),
    address: Yup.string(),
    pincode: Yup.string(),
    plant_capacity: Yup.string(),
    capacity_offer: Yup.string(),
    subscriber_amount: Yup.string(),
    tariff_amount: Yup.string(),
    billing_date: Yup.string(),
    ppa_status: Yup.string(),
    plant_image: Yup.array(),
  });

  const formik = useFormik({
    initialValues: {
      plant_name: "",
      plant_valid: "",
      plant_expiry: "",
      status: 1,
      description: "",
      state_id: "",
      city_id: "",
      country: "",
      address: "",
      pincode: "",
      plant_capacity: "",
      capacity_offer: "",
      subscriber_amount: "",
      tariff_amount: "",
      billing_date: "",
      ppa_status: "",
      plant_image: [],
    },
    validationSchema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  // upload specification
  const handleFileSelect1 = (event) => {
    const file = event;
    // if (file) {
    //   if (!filesTypes.includes(file.type)) {
    //     setErrorMessage1(pdfFileFormatMessage);
    //     setSelectedFile1(null);
    //   } else if (file.size > maxFileSize) {
    //     setErrorMessage1(pdfFileSizeMessage);
    //     setSelectedFile1(null);
    //   } else {
    //     setSelectedFile1(file);
    //     setErrorMessage1("");
    //     formik.setFieldValue("file", file); // Set the file in Formik's values
    //   }
    // }
  };

  const resetFun = () => {
    formik.setFieldValue("category", "");
    formik.setFieldValue("plant_name", "");
    formik.setFieldValue("description", "");
    formik.setFieldValue("status", 1);
  };

  const submitForm = async (values) => {
    // API Call placeholder
    // const response = await createCategory(values); // Your API call
    // if (response) {
    //   showSnackbar(response.message, "success");
    //   resetFun();
    //   navigate("/category-master");
    // } else {
    //   showSnackbar("An error occurred", "error");
    // }
  };

  const empListingdata = {
    title: "Battery",
    links: "/battery-list",
    items: [
      {
        label: "Add Battery",
        // link: "/category-add"
      },
    ],
  };

  useEffect(() => {
    if (categoryData) {
      formik.setFieldValue("plant_expiry", categoryData.plant_expiry || "");
      formik.setFieldValue("plant_name", categoryData.plant_name || "");
      formik.setFieldValue("plant_valid", categoryData.plant_valid || "");
      formik.setFieldValue("status", categoryData.status || "");
      // Add other fields from categoryData here as necessary
    }
  }, [categoryData]);

  return (
    <React.Fragment>
      {/* page heading */}
      <Grid item xs={12} className="addCardHeadingSeparate !mb-3">
        <Breadcrumb {...empListingdata} />

        <Link to={"/battery-list"}>
          <Tooltip title="Back" placement="bottom" arrow>
            <Button
              variant="contained"
              color="info"
              size="small"
              className="buttonStyle"
            >
              <BackwardOutlined className="mr-0" />
            </Button>
          </Tooltip>
        </Link>
      </Grid>

      {/* Category Details */}
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={12}>
          {/* basic details */}
          <Card variant="outlined" className="addCardMain">
            <h2 className="addPageTitle">Plant Details</h2>
            <CardContent className="addCardContents">
              <Grid
                container
                justifyContent={"center"}
                className="gridMargin"
                spacing={4}
              >
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Plant Name<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="plant_name"
                    value={formik.values.plant_name}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("plant_name", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.plant_name &&
                      Boolean(formik.errors.plant_name)
                    }
                    helperText={
                      formik.touched.plant_name && formik.errors.plant_name
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Plant Start Date<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="date"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="plant_valid"
                    value={formik.values.plant_valid}
                    inputProps={{
                      // min: new Date(currentDate).toISOString().split('T')[0],
                      max: formik.values.plant_expiry
                        ? new Date(formik.values.plant_expiry)
                            .toISOString()
                            .split("T")[0]
                        : new Date(currentDate).toISOString().split("T")[0],
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (regexChar.test(value)) {
                        formik.setFieldValue("plant_valid", value);
                        formik.setFieldValue("plant_expiry", ""); // Reset expiry date when valid date changes
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.plant_valid &&
                      Boolean(formik.errors.plant_valid)
                    }
                    helperText={
                      formik.touched.plant_valid && formik.errors.plant_valid
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Plant End Date<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="date"
                    placeholder=""
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="plant_expiry"
                    value={formik.values.plant_expiry}
                    // inputProps={{
                    //   min: formik.values.plant_valid || "", // Set min date based on plant_valid
                    // }}
                    inputProps={{
                      min: formik.values.plant_valid
                        ? new Date(formik.values.plant_valid)
                            .toISOString()
                            .split("T")[0]
                        : "",
                      max: new Date(currentDate).toISOString().split("T")[0],
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (regexChar.test(value)) {
                        formik.setFieldValue("plant_expiry", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.plant_expiry &&
                      Boolean(formik.errors.plant_expiry)
                    }
                    helperText={
                      formik.touched.plant_expiry && formik.errors.plant_expiry
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"center"}
                className="gridMargin"
                spacing={4}
              >
                <Grid item xs={12} sm={12} md={4} lg={4}>
                <Autocomplete
                    fullWidth
                    disableClearable
                    size="small"
                    className="searchAutoBox"
                    options={stateData}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        placeholder=""
                        label={
                          <span>
                            State<span className="lableStar">*</span>
                          </span>
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "599px", // Border-radius applied here
                          },
                        }}
                        name="state_id"
                        value={formik.values.state_id}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (regexChar.test(value)) {
                            formik.setFieldValue("state_id", value);
                          }
                        }}
                        // onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.state_id &&
                          Boolean(formik.errors.state_id)
                        }
                        helperText={
                          formik.touched.state_id && formik.errors.state_id
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                <Autocomplete
                    fullWidth
                    disableClearable
                    size="small"
                    className="searchAutoBox"
                    options={cityData}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        placeholder=""
                        label={
                          <span>
                            City<span className="lableStar">*</span>
                          </span>
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "599px", // Border-radius applied here
                          },
                        }}
                        name="city_id"
                        value={formik.values.city_id}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (regexChar.test(value)) {
                            formik.setFieldValue("city_id", value);
                          }
                        }}
                        // onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.city_id &&
                          Boolean(formik.errors.city_id)
                        }
                        helperText={
                          formik.touched.city_id && formik.errors.city_id
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                <Autocomplete
                    fullWidth
                    disableClearable
                    size="small"
                    className="searchAutoBox"
                    options={countryData}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        placeholder=""
                        label={
                          <span>
                            Country<span className="lableStar">*</span>
                          </span>
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "599px", // Border-radius applied here
                          },
                        }}
                        name="country"
                        value={formik.values.country}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (regexChar.test(value)) {
                            formik.setFieldValue("country", value);
                          }
                        }}
                        // onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.country &&
                          Boolean(formik.errors.country)
                        }
                        helperText={
                          formik.touched.country && formik.errors.country
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"center"}
                className="gridMargin"
                spacing={4}
              >
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <InputBox
                    label={
                      <span>
                        Address<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="address"
                    value={formik.values.address}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("address", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={
                      formik.touched.address && formik.errors.address
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        PinCode<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("pincode", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.pincode && Boolean(formik.errors.pincode)
                    }
                    helperText={formik.touched.pincode && formik.errors.pincode}
                  />
                </Grid>
              </Grid>


              <Grid
                container
                justifyContent={"center"}
                className="gridMargin"
                spacing={4}
              >
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Total Capacity Plant<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="plant_capacity"
                    value={formik.values.plant_capacity}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("plant_capacity", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.plant_capacity &&
                      Boolean(formik.errors.plant_capacity)
                    }
                    helperText={
                      formik.touched.plant_capacity &&
                      formik.errors.plant_capacity
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Capacity To Offer (kW)<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="capacity_offer"
                    value={formik.values.capacity_offer}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("capacity_offer", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.capacity_offer &&
                      Boolean(formik.errors.capacity_offer)
                    }
                    helperText={
                      formik.touched.capacity_offer &&
                      formik.errors.capacity_offer
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Subscriber Amount(Wp)<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="subscriber_amount"
                    value={formik.values.subscriber_amount}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("subscriber_amount", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.subscriber_amount &&
                      Boolean(formik.errors.subscriber_amount)
                    }
                    helperText={
                      formik.touched.subscriber_amount &&
                      formik.errors.subscriber_amount
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"center"}
                className="gridMargin"
                spacing={4}
              >
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Tariff Amount Per (Wp)<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="tariff_amount"
                    value={formik.values.tariff_amount}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("tariff_amount", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.tariff_amount &&
                      Boolean(formik.errors.tariff_amount)
                    }
                    helperText={
                      formik.touched.tariff_amount &&
                      formik.errors.tariff_amount
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Billing Date<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="date"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="billing_date"
                    value={formik.values.billing_date}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("billing_date", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.billing_date &&
                      Boolean(formik.errors.billing_date)
                    }
                    helperText={
                      formik.touched.billing_date && formik.errors.billing_date
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        PPA<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="ppa_status"
                    value={formik.values.ppa_status}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("ppa_status", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.ppa_status &&
                      Boolean(formik.errors.ppa_status)
                    }
                    helperText={
                      formik.touched.ppa_status && formik.errors.ppa_status
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"left"}
                className="gridMargin"
                spacing={4}
              >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <InputBox
                    label={
                      <span>
                        Description<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="description"
                    value={formik.values.description}
                    multiline
                    rows={3} 
                    onChange={(e) => {
                      const value = e.target.value;

                      if (regexChar.test(value)) {
                        formik.setFieldValue("description", value);
                      }
                    }}
                    // onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"left"}
                className="gridMargin"
                spacing={4}
              >
                {fileInputs.map((file) => (
                  <Grid item xs={12} sm={12} md={4} lg={4} key={file.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start", 
                        gap: "8px",
                      }}
                    >
                      {/* FileUpload & File Notes Block */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          flex: 1,
                        }}
                      >
                        <FileUpload
                          onFileSelect={(file) =>
                            handleFileSelect(file, file.index)
                          }
                          fileId={file.id}
                          buttonLabel={`Plant Image`}
                          acceptedFileTypes={[".png", ".jpg", ".jpeg", ".pdf"]}
                          defaultFileUploaded={Boolean(
                            formik?.values?.plant_image?.[file.index]
                          )}
                        />

                        {/* File Notes - Placed Below */}
                        <div style={{ fontSize: "12px", color: "#888" }}>
                          Max file size: 5MB
                        </div>
                      </div>

                      {/* Delete Button (not for the first item) */}
                      {file.index !== 0 && (
                        <DeleteOutlined
                          onClick={() => handleDeleteFileInput(file.id)}
                          style={{
                            fontSize: "24px",
                            color: "red",
                            marginTop: "8px", 
                          }}
                        />
                      )}
                    </div>

                    {/* Error Display */}
                    {formik.touched?.plant_image?.[file.index] &&
                      formik.errors?.plant_image?.[file.index] && (
                        <div className="errorMessage">
                          {formik.errors.plant_image[file.index]}
                        </div>
                      )}
                  </Grid>
                ))}

                {/* Add More Button */}
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={addNewFileInput}
                    sx={{ marginTop: 2 }}
                  >
                    Add more Plant Image
                  </Button>
                </Grid>
              </Grid>

              <Grid container justifyContent={"center"}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <FormControlLabel
                    className="checkboxLabel checkSpacing"
                    control={
                      <Checkbox
                        checked={formik.values.status === 1}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "status",
                            e.target.checked ? 1 : 0
                          )
                        }
                        size="medium"
                        color="success"
                      />
                    }
                    label="Active"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* form action */}
        <Grid item xs={12} className="btnSeparate">
          <Button
            variant="contained"
            color="success"
            size="small"
            className="buttonStyle"
            type="submit"
          >
            <SaveOutlined className="mr-1" />
            Save
          </Button>

          <Link to={"/battery-list"}>
            <Button
              variant="contained"
              color="info"
              size="small"
              className="buttonStyle"
            >
              <CloseOutlined className="mr-1" />
              Cancel
            </Button>
          </Link>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Batterys;
