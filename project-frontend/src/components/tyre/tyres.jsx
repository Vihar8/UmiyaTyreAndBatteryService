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
import { tyresdetails } from "../../api/common";
// import FileUpload from "../../commoncomponents/FileUpload/FileUpload";

const Tyres = () => {
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
    { id: "image_1", index: 0 },
  ]);

  // Add New File
  const addNewFileInput = () => {
    const newId = `image_${fileInputs.length + 1}`;
    setFileInputs([...fileInputs, { id: newId, index: fileInputs.length }]);
  };

  // Delete File
  const handleDeleteFileInput = (idToDelete) => {
    const indexToDelete = fileInputs.find(
      (file) => file.id === idToDelete
    )?.index;

    const updatedFiles = fileInputs.filter((file) => file.id !== idToDelete);
    setFileInputs(updatedFiles);

    const updatedValues = [...formik.values.image];
    updatedValues.splice(indexToDelete, 1); // Correctly removes the matching index
    formik.setFieldValue("image", updatedValues);
  };

  // Handle File Select
  const handleFileSelect = (file, index) => {
    const updatedValues = [...formik.values.image];
    updatedValues[index] = file;
    formik.setFieldValue("image", updatedValues);
  };


  const handlePasswordToggle = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    width: Yup.number()
      .typeError("Width must be a number")
      .positive("Width must be positive")
      .required("Width is required"),
    height: Yup.number()
      .typeError("Height must be a number")
      .positive("Height must be positive")
      .required("Height is required"),
    radius: Yup.number()
      .typeError("Radius must be a number")
      .positive("Radius must be positive")
      .required("Radius is required"),
    brand: Yup.string().required("Brand is required"),
    type: Yup.string().required("Type is required"),
    image: Yup.array(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      width: "",
      height: "",
      radius: "",
      brand: "",
      type: "",
      image: [],
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
    const response = await tyresdetails(values); // Your API call
    if (response) {
      showSnackbar(response.message, "success");
      // resetFun();
      // navigate("/category-master");
    } else {
      showSnackbar("An error occurred", "error");
    }
  };

  const empListingdata = {
    title: "Tyre",
    links: "/tyre-list",
    items: [
      {
        label: "Add Tyre",
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

        <Link to={"/tyre-list"}>
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
              {/* New Fields */}
              <Grid container justifyContent="center" className="gridMargin" spacing={4}>
                {/* Name */}
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Name<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    name="name"
                    value={formik.values.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (regexChar.test(value)) {
                        formik.setFieldValue("name", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                {/* Width */}
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Width<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="number"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    name="width"
                    value={formik.values.width}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        formik.setFieldValue("width", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.width && Boolean(formik.errors.width)}
                    helperText={formik.touched.width && formik.errors.width}
                  />
                </Grid>

                {/* Height */}
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Height<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="number"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    name="height"
                    value={formik.values.height}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        formik.setFieldValue("height", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.height && Boolean(formik.errors.height)}
                    helperText={formik.touched.height && formik.errors.height}
                  />
                </Grid>

                {/* Radius */}
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Radius<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="number"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    name="radius"
                    value={formik.values.radius}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        formik.setFieldValue("radius", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.radius && Boolean(formik.errors.radius)}
                    helperText={formik.touched.radius && formik.errors.radius}
                  />
                </Grid>

                {/* Brand */}
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Brand<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    name="brand"
                    value={formik.values.brand}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (regexChar.test(value)) {
                        formik.setFieldValue("brand", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.brand && Boolean(formik.errors.brand)}
                    helperText={formik.touched.brand && formik.errors.brand}
                  />
                </Grid>

                {/* Type */}
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <InputBox
                    label={
                      <span>
                        Type<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    name="type"
                    value={formik.values.type}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (regexChar.test(value)) {
                        formik.setFieldValue("type", value);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
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
                          buttonLabel={`Image`}
                          acceptedFileTypes={[".png", ".jpg", ".jpeg", ".pdf"]}
                          defaultFileUploaded={Boolean(
                            formik?.values?.image?.[file.index]
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
                    {formik.touched?.image?.[file.index] &&
                      formik.errors?.image?.[file.index] && (
                        <div className="errorMessage">
                          {formik.errors.image[file.index]}
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

          <Link to={"/tyre-list"}>
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

export default Tyres;
