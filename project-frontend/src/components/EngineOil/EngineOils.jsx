import {
  BackwardOutlined,
  CloseOutlined,
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

const UsersMaster = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const brandModalList = location.state?.row;
  const [dataList, setDataList] = useState(null);
  const [resumeView, setResumeView] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState({
      oldPassword: false,
      newPassword: false,
  });

  const handlePasswordToggle = (field) => {
      setPasswordVisibility((prev) => ({
          ...prev,
          [field]: !prev[field],
      }));
  };
  
  // Validation schema using Yup
  const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      mobile_no: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      status: Yup.string().required("Status is required"),
      role: Yup.string().required("role is required"),
      password: Yup.string()
      .when("id",{
          is:(id)=>!id,
          then:(schema)=> schema
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
          ),
          otherwise:(schema)=> schema.notRequired()
      }),
      confirm_password: Yup.string()
      .when("id",{
          is:(id)=>!id,
          then:(schema)=>schema
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
          ),
          otherwise:(schema)=>schema.notRequired()
      }),
  });
  
  const formik = useFormik({
      initialValues: {
      name: "",
      email: "",
      password: "",
      mobile_no: "",
      role: "",
      status: 1,
      },
      validationSchema,
      onSubmit: (values) => {
      submitForm(values);
      },
  });
  
  const resetFun = () => {
      formik.setFieldValue("name", "");
      formik.setFieldValue("email", "");
      formik.setFieldValue("password", "");
      formik.setFieldValue("mobile_no", "");
      formik.setFieldValue("role", "");
      formik.setFieldValue("status", 1);
  }
  
  
  const submitForm = async (values) => {
      // const formData = new FormData();
  
  
  
      // formData.append("name", values.name);
      // formData.append("email", values.email);
      // formData.append("mobile_no", values.mobile_no);
      // formData.append("password", values.password);
      // formData.append("role", values.role);
      // formData.append("status", values.status ? 1 : 0);
  
      // // Make the API call
      // const response = await createBrandModels(formData);
  
      // // Handle the response
      // if (response.statusCode == StatusCode.success) {
      // showSnackbar(response.message, "success");
      // resetFun()
      // navigate("/user-master");
      // } else {
      // commonLoader("hide");
      // showSnackbar(response.message, "error");
      // }
  };
  
  
  const empListingdata = {
      title: "Engine Oil",
      links: "/engineoil-list",
      items: [
      {
          label: "Add Engine Oil",
          // link: "/brand-add"
      },
      ],
  };
  
  // brand list API
  const getBrandDetails = async () => {
      // const response = await getBrands({});
      // if (response.statusCode == StatusCode.success) {
      // setDataList(response.data.list);
      // }
  };
  
  const fileShow = async (file_name) => {
      let file = await commonPatchValueForFile(file_name);
      if (file) {
      setResumeView(file);
      const fileURL = URL.createObjectURL(file);
      if (resumeView || fileURL) {
          window.open(fileURL, "_blank", "noopener,noreferrer");
      }
      }
  };
  
  useEffect(() => {
      getBrandDetails();
  }, []);
  
  useEffect(() => {
      if (brandModalList) {
      formik.setFieldValue("name", brandModalList.name || "");
      formik.setFieldValue("email", brandModalList.brand_models || "");
      formik.setFieldValue("mobile_no", brandModalList.mobile_no || "");
      formik.setFieldValue("password", brandModalList.password || "");
      formik.setFieldValue("role", brandModalList.role || "");
      formik.setFieldValue("status", brandModalList.status || "");
      }
  }, [brandModalList]);
  
  return (
      <>
      {/* page heading */}
      <Grid item xs={12} className="addCardHeadingSeparate !mb-3">
          <Breadcrumb {...empListingdata} />
  
          <Link  to="/engineoil-list">
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
  
      {/* Brand Details */}
      <form onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
          {/* basic details */}
          <Card variant="outlined" className="addCardMain">
              <h2 className="addPageTitle">User Details</h2>
              <CardContent className="addCardContents">
              <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  className="gridMargin"
              >
                  <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  lg={5}
                  className="columnSeparate"
                  >

  
                  <InputBox
                      label={
                      <span>
                         User Name<span className="lableStar">*</span>
                      </span>
                      }
                      size="small"
                      type="text"
                      placeholder=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                      name="name"
                      value={formik.values.name}
                      onChange={(e) => {
                      const value = e.target.value;
  
                      if (regexChar.test(value)) {
                          formik.setFieldValue('name', value);
                      }
                      }}
                      onBlur={formik.handleBlur}
                      error={
                      formik.touched.name &&
                      Boolean(formik.errors.name)
                      }
                      helperText={
                      formik.touched.name && formik.errors.name
                      }
                  />
                  <InputBox
                      label={
                      <span>
                          Email<span className="lableStar">*</span>
                      </span>
                      }
                      size="small"
                      type="email"
                      placeholder=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                      name="email"
                      value={formik.values.email}
                      onChange={(e) => {
                      const value = e.target.value;
  
                      if (regexChar.test(value)) {
                          formik.setFieldValue('email', value);
                      }
                      }}
                      onBlur={formik.handleBlur}
                      error={
                      formik.touched.email &&
                      Boolean(formik.errors.email)
                      }
                      helperText={
                      formik.touched.email && formik.errors.email
                      }
                  />
                   <InputBox
                  label={
                      <span>
                      Password<span className="lableStar">*</span>
                      </span>
                  }
                  size="small"
                  type={
                      passwordVisibility.oldPassword ? "text" : "password"
                  }
                  placeholder=""
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.password &&
                      Boolean(formik.errors.password)
                  }
                  helperText={
                      formik.touched.password && formik.errors.password
                  }
                  InputLabelProps={{
                      shrink: true,
                  }}
                  endAdornment={
                      <InputAdornment position="end">
                      <IconButton
                          onClick={() =>
                          handlePasswordToggle("oldPassword")
                          }
                          onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                      >
                          {passwordVisibility.oldPassword ? (
                          <EyeFilled className="eyeIcon" />
                          ) : (
                          <EyeInvisibleFilled
                              className="eyeIcon"
                          />
                          )}
                      </IconButton>
                      </InputAdornment>
                  }
                  />
                
                  </Grid>
  
                  <Grid
                  item
                  xs={12}
                  sm={7}
                  md={5}
                  lg={5}
                  className="columnSeparate"
                  >
                  <InputBox
                      label={
                      <span>
                          Role<span className="lableStar">*</span>
                      </span>
                      }
                      size="small"
                      type="text"
                      placeholder=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role && formik.errors.role}
                      onKeyDown={(event) => {
                      const regex = /^-?[0-9]*(\.[0-9]*)?$/;
                      if (
                          !regex.test(event.key) &&
                          event.key !== "Backspace" &&
                          !(event.ctrlKey || event.metaKey) &&
                          event.key !== "ArrowLeft" &&
                          event.key !== "ArrowRight" &&
                          event.key !== "Tab"
                      ) {
                          event.preventDefault();
                      }
                      }}
                  />
                   <InputBox
                      label={
                      <span>
                          Mobile No<span className="lableStar">*</span>
                      </span>
                      }
                      size="small"
                      type="text"
                      placeholder=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                      name="mobile_no"
                      value={formik.values.mobile_no}
                      onChange={(e) => {
                      const value = e.target.value;
  
                      if (regexChar.test(value)) {
                          formik.setFieldValue('mobile_no', value);
                      }
                      }}
                      onBlur={formik.handleBlur}
                      error={
                      formik.touched.mobile_no &&
                      Boolean(formik.errors.mobile_no)
                      }
                      helperText={
                      formik.touched.mobile_no && formik.errors.mobile_no
                      }
                  />

                  <InputBox
                  label={
                      <span>
                      Confirm Password<span className="lableStar">*</span>
                      </span>
                  }
                  size="small"
                  type={
                      passwordVisibility.newPassword ? "text" : "password"
                  }
                  placeholder=""
                  name="confirm_password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.confirm_password &&
                      Boolean(formik.errors.confirm_password)
                  }
                  helperText={
                      formik.touched.confirm_password && formik.errors.confirm_password
                  }
                  InputLabelProps={{
                      shrink: true,
                  }}
                  endAdornment={
                      <InputAdornment position="end">
                      <IconButton
                          onClick={() =>
                          handlePasswordToggle("newPassword")
                          }
                          onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                      >
                          {passwordVisibility.newPassword ? (
                          <EyeFilled className="eyeIcon" />
                          ) : (
                          <EyeInvisibleFilled
                              className="eyeIcon"
                          />
                          )}
                      </IconButton>
                      </InputAdornment>
                  }
                  />
  

  
                  <FormControlLabel
                      className="checkboxLabel checkSpacing"
                      name="status"
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
  
          <Link  to="/engineoil-list">
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
      </>
  );
};

export default UsersMaster
