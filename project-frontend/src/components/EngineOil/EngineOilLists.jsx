import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TablePagination from "../../commoncomponents/TablePagination/TablePagination";
import BadgeStatus from "../../commoncomponents/BadgeStatus/BadgeStatus";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import { Link } from "react-router-dom";
import TableSorting from "../../commoncomponents/TableSorting/TableSorting";
import AddModal from "../../commoncomponents/AddModal/AddModal";
import FileUpload from "../../commoncomponents/FileUpload/FileUpload";
import CommonDialog from "../../pages/CommonDialog";
import {
  commonPatchValueForFile,
  formatDateTime,
  MessageActiveTitle,
  MessageAndTitle,
  StatusCode,
} from "../../utils/commonEnum";
import Breadcrumb from "../../commoncomponents/Breadcrumb/Breadcrumb";
import { useSnackbar } from "../../utils/SnackbarProvider";
import { useFormik } from "formik";
import * as Yup from "yup";
import TotalRecords from "../../commoncomponents/TablePagination/TotalRecords";
import useAuth from "../../hooks/useAuth";
import { oils } from "../../api/common";

const AdminUserLists = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedFile, setselectedFile] = useState(null);
  const { showSnackbar } = useSnackbar();
  const [pageCount, setPageCount] = useState(0);
  const [paginationSize, setPaginationSize] = useState(10);
  const [selectedPage, setselectedPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [selectedBrandId, setselectedBrandId] = useState(null);
  const [totalRecords, setTotalRecords] = useState(null);
  const [statusAlert, setStatusAlert] = useState("success");
  const [statusDialog, setStatusDialog] = useState(false);
  const [errorAlert, setErrorAlert] = useState("delete");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(null);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [resumeView, setResumeView] = useState(null);
  const [csvDownload, setCsvDownload] = useState(false);
  
  const formik = useFormik({
      initialValues: {
      search: "",
      },
      // validationSchema: Yup.object({
      //   search: Yup.string().required("Brand Name/Brand Model is required"),
      // }),
      onSubmit: () => {
          // if(csvDownload){
          //     downloadBrandModelInfo()
          // }else{
          //     fetchBrandDetails();
          // }
      },
  });
  
  // useEffect(() => {
  // if (csvDownload) {
  //     formik.handleSubmit();
  //     setCsvDownload(false);
  // }
  // }, [csvDownload]);
  
  // change select dropdown pagination size
  function getPageSize(paginationValue) {
      setPaginationSize(paginationValue);
  }
  
  // change textfield pagination values
  function getPageCount(changeValues) {
      setselectedPage(parseInt(changeValues));
  }
  

  const tableHeading = [
      { id: "sNo", header: "S.No." },
      { id: "name", header: "User Name" },
      { id: "type", header: "User Role" },
      { id: "status", header: "Status" },
      { id: "action", header: "Action" },
  ];
  
  const fetchBrandDetails = async () => {
      try {
      const response = await oils({
        //   size: paginationSize,
        //   page: selectedPage,
        //   search: formik.values.search || "",
        //   brands: "",
        //   vehicle_type: "",
        //   brand_models: "",
      });
  
      if (200 === StatusCode.success) {
          const fetchedData = response;
          setDataList(fetchedData || []);
          setTotalRecords(response?.data?.count?.[0]?.total_count || 0);
          setPageCount(response?.data?.count?.[0]?.total_page);
      }
      } catch (error) {
      showSnackbar(response.message, "error");
      }
  };
  
  // const downloadBrandModelInfo = async () => {
  //     try {
  //         const response = await downloadBrandModelExcel({
  //             search:formik?.values?.search || "",
  //         });
  //         const url = window.URL.createObjectURL(new Blob([response]));
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.setAttribute('download', 'brandModel.xlsx'); // File name for the download
  //         document.body.appendChild(link);
  //         link.click();
  //         link.remove();
  //     } catch (error) {
  //         showSnackbar(response.message, "error");
  //     }
  // }
  
  useEffect(() => {
      fetchBrandDetails();
  }, [selectedPage, paginationSize]);
  
  const [visibleColumns, setVisibleColumns] = useState(
      tableHeading.reduce((acc, column) => {
      acc[column.id] = true;
      return acc;
      }, {})
  );
  
  // // status update API
  // const brandStatusUpdate = async () => {
  //     const response = await changeStatus({
  //     brand_model_id: selectedBrandId,
  //     });
  //     if (response.statusCode == StatusCode.success) {
  //     setStatusUpdate(response?.data?.list);
  //     showSnackbar(response.message, "success");
  //     } else {
  //     commonLoader("hide");
  //     showSnackbar(response.message, "error");
  //     }
  // };
  
  //Function call during Yes or no clicked on apply popup
  // const statusClose = (value) => {
  //     if (value === "yes") {
  //     brandStatusUpdate();
  //     fetchBrandDetails();
  //     setStatusDialog(false);
  //     } else if (value === "no") setStatusDialog(false);
  // };
  
  // function changeStatusClick(row) {
  //     setStatusDialog(true);
  //     setselectedBrandId(row?.id);
  // }
  
  // const deleteClose = (value) => {
  //     if (value === "yes") {
  //     setDialogOpen(false);
  //     } else if (value === "no") setDialogOpen(false);
  // };
  
  // const handleDelete = async (id) => {
  //     try {
  //     const response = await deleteBrandModels({ brand_model_id: id });
  //     if (response.statusCode === StatusCode.success) {
  //         setdataList((prevBrands) =>
  //         prevBrands.filter((brand) => brand.id !== id)
  //         );
  //         setDialogOpen(false); // Close dialog after deletion
  //         fetchBrandDetails(); // Refresh list after deletion
  //         showSnackbar(response.message, "success");
  //     }
  //     } catch (error) {
  //     showSnackbar(response.message, "error");
  //     }
  // };
  
  // const confirmDelete = (id) => {
  //     setBrandToDelete(id); // Set brand to delete
  //     setDialogOpen(true); // Open confirmation dialog
  // };
  
  // const handleFileSelect1 = (file) => {
  //   setselectedFile(file);
  // };
  
  // const handleOpen = () => {
  //   setIsModalOpen(true);
  // };
  
  // const handleClose = () => {
  //   setIsModalOpen(false);
  // };
  
  // const fileShow = async (file_name) => {
  //     let file = await commonPatchValueForFile(file_name);
  //     if (file) {
  //     setResumeView(file);
  //     const fileURL = URL.createObjectURL(file);
  //     if (resumeView || fileURL) {
  //         window.open(fileURL, "_blank", "noopener,noreferrer");
  //     }
  //     }
  // };
  
  const empListingdata = {
      title: "Engine Oil",
  };
  
  return (
      <>
      {/* page heading */}
      <Grid container item xs={12} className="headingSeparate">
          <Grid item xs={12} sm={4} md={3} lg={1.5}>
          <Breadcrumb {...empListingdata} />
          </Grid>
  
          <Grid item xs={12} sm={5} md={5} lg={3.5} className="!mt-4 md:!mt-0">
          <InputBox
              size="small"
              type="text"
              className="bg-primary-Color6"
              placeholder="Search"
              // label="Search"
              // InputLabelProps={{
              // shrink: true,
              // }}
              name="search"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.search}
              // error={formik?.touched?.search && Boolean(formik?.errors?.search)}
              // helperText={formik?.touched?.search && formik?.errors?.search}
              endAdornment={
              <InputAdornment position="end">
                  <IconButton onClick={() => formik.handleSubmit()}>
                  <SearchOutlined className="text-lg" />
                  </IconButton>
              </InputAdornment>
              }
          />
          </Grid>
  
          <Grid item xs={12} sm={3} md={4} lg={7} className="rightSection">
          {/* <Tooltip title="Excel Upload" placement="bottom" arrow>
              <Button
              variant="outlined"
              color="warning"
              size="small"
              className="buttonStyle !mr-2"
              onClick={() => handleOpen()}
              >
              <UploadOutlined className="mr-0" />
              </Button>
          </Tooltip>
  
          <Tooltip title="Sample" placement="bottom" arrow>
              <Button
              variant="outlined"
              color="warning"
              size="small"
              className="buttonStyle !mr-2"
              >
              <FileTextOutlined className="mr-0" />
              </Button>
          </Tooltip> */}
  
          <Link className="mr-2"
          to = "/adminuser-add">
              <Tooltip title="Add Engine Oil" placement="bottom" arrow>
              <Button
                  variant="contained"
                  color="success"
                  size="small"
                  className="buttonStyle"
              >
                  <PlusOutlined className="mr-0" />
              </Button>
              </Tooltip>
          </Link>
              {/* <Tooltip title="Download" placement="bottom" arrow>
                  <Button
                      onClick={() => setCsvDownload(true)}
                      variant="contained"
                      color="success"
                      size="small"
                      className="buttonStyle"
                  >
                      <DownloadOutlined className="mr-0" />
                  </Button>
              </Tooltip> */}
          </Grid>
      </Grid>
          <div className="mb-5 w-full">
          <TotalRecords
              totalRecords={totalRecords}
          />
          </div>
  
      {/* listing */}
      <Grid item xs={12}>
          <TableContainer component={Paper} className="tableShadow">
          <TableSorting tableData={dataList} initialOrderBy="brandName">
              {({ order, orderBy, tablesBody, handleSortRequest }) => (
              <Table size="small" aria-label="a dense table">
                  <TableHead className="tableHeads">
                  <TableRow>
                      {tableHeading.map(
                      (column) =>
                          visibleColumns[column.id] && (
                          <TableCell
                              className="tableAdminStyle"
                              key={column.id}
                              sortDirection={
                              orderBy === column.id ? order : false
                              }
                          >
                              {column.header !== "Action" ? (
                              <TableSortLabel
                                  active={orderBy === column.id}
                                  direction={
                                  orderBy === column.id ? order : "asc"
                                  }
                                  // onClick={() => handleSortRequest(column.id)}
                              >
                                  {column.header}
                              </TableSortLabel>
                              ) : (
                              column.header
                              )}
                          </TableCell>
                          )
                      )}
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {tablesBody && tablesBody.length > 0 ? (
                      tablesBody?.map((row, index) => (
                      <TableRow key={index} className="tableOdd">
                          {tableHeading.map(
                          (column) =>
                              visibleColumns[column.id] && (
                              <TableCell
                                  key={column.id}
                                  className="tableAdminCellStyle"
                              >
                                  {column.id === "status" ? (
                                  row.status === 1 ? (
                                      <Link
                                      // onClick={() => changeStatusClick(row)}
                                      >
                                      <BadgeStatus variant="active">
                                          Active
                                      </BadgeStatus>
                                      </Link>
                                  ) : (
                                      <Link
                                      // onClick={() => changeStatusClick(row)}
                                      >
                                      <BadgeStatus variant="deactive">
                                          Inactive
                                      </BadgeStatus>
                                      </Link>
                                  )
                                  ) : column.id === "sNo" ? (
                                  index +
                                  1 +
                                  (selectedPage - 1) * paginationSize
                                  ) : column.id === "created_at" ? (
                                  formatDateTime(row.created_at)
                                  ) : column.id === "specify" ? (
                                  <Link
                                      className="flex items-center gap-3"
                                      // onClick={() => {
                                      // fileShow(row?.file);
                                      // }}
                                  >
                                      <Tooltip title="View" arrow>
                                      <EyeOutlined className="viewIcons" />
                                      </Tooltip>
                                  </Link>
                                  ) : column.id === "photo_1" ? (
                                  <div className="flex">
                                      <Link
                                      className="flex items-center gap-3"
                                      // onClick={() => {
                                      //     fileShow(row?.photo_1);
                                      // }}
                                      >
                                      <Tooltip title="View Photo 1" arrow>
                                          <EyeOutlined className="viewIcons" />
                                      </Tooltip>
                                      </Link>
  
                                      <Link
                                      className="flex items-center gap-3"
                                      // onClick={() => {
                                      //     fileShow(row?.photo_2);
                                      // }}
                                      >
                                      <Tooltip title="View Photo 2" arrow>
                                          <EyeOutlined className="viewIcons" />
                                      </Tooltip>
                                      </Link>
                                      {row?.photo_3 && <Link
                                      className="flex items-center gap-3"
                                      // onClick={() => {
                                      //     fileShow(row?.photo_3);
                                      // }}
                                      >
                                      <Tooltip title="View Photo 3" arrow>
                                          <EyeOutlined className="viewIcons" />
                                      </Tooltip>
                                      </Link>}
                                  {row?.photo_4 && <Link
                                      className="flex items-center gap-3"
                                      // onClick={() => {
                                      //     fileShow(row?.photo_4);
                                      // }}
                                      >
                                      <Tooltip title="View Photo 4" arrow>
                                          <EyeOutlined className="viewIcons" />
                                      </Tooltip>
                                      </Link>}
                                  </div>
                                  ) : column.id !== "action" ? (
                                  row[column.id]
                                  ) : (
                                  <>
                                  <Link
                                    to={{
                                      path: `/engineoil-edit/${row.id}`,
                                    }}
                                    state={{ row }}
                                  >
                                    <Tooltip title="Edit" arrow>
                                      <EditOutlined className="editIcons" />
                                    </Tooltip>
                                  </Link>
                                       <Tooltip title="View" arrow>
                                        <EyeOutlined className="viewIcons" />
                                        </Tooltip>
                                      <Tooltip title="Delete" arrow>
                                      <Link
                                          // onClick={() => confirmDelete(row.id)}
                                      >
                                          <DeleteOutlined className="deleteIcons" />
                                      </Link>
                                      </Tooltip>
                                  </>
                                  )}
                              </TableCell>
                              )
                          )}
                      </TableRow>
                      ))
                  ) : (
                      <TableRow>
                      <TableCell
                          colSpan={tableHeading.length}
                          className="!text-center"
                      >
                          No data available
                      </TableCell>
                      </TableRow>
                  )}
                  </TableBody>
              </Table>
              )}
          </TableSorting>
          </TableContainer>
  
          <TablePagination
          pageCount={pageCount}
          selectedPage={selectedPage}
          paginationSize={paginationSize}
          getPageSize={getPageSize}
          getPageCount={getPageCount}
          maxPage={pageCount}
          totalRecords={totalRecords}
          />
      </Grid>
  
      {/* file upload modal */}
      {/* <AddModal open={isModalOpen} handleClose={handleClose} classname="">
          <div>
          <h1 className="modalHeading">Excel Upload</h1>
          </div>
          <div className="mt-5">
          <FileUpload
              onFileSelect={handleFileSelect1}
              fileId="file1"
              buttonLabel="Upload Excel"
              acceptedFileTypes=".xlsx, .xls"
          />
          {selectedFile?.name && (
              <p className="fileNames">{selectedFile?.name}</p>
          )}
          </div>
          <div item xs={12} className="flex mt-5 gap-4 flex-row justify-end">
          <Button
              variant="contained"
              color="success"
              size="small"
              className="buttonStyle"
              onClick={handleClose}
          >
              <UploadOutlined className="mr-1" />
              Upload
          </Button>
  
          <Button
              variant="contained"
              color="info"
              size="small"
              className="buttonStyle"
              onClick={handleClose}
          >
              <CloseOutlined className="mr-1" />
              Cancel
          </Button>
          </div>
      </AddModal> */}
  
      {/* status update Dialog */}
      {/* <CommonDialog
          open={statusDialog}
          onClose={statusClose}
          title=""
          content={MessageActiveTitle.ApplyContent}
          actions={
          <>
              <Button
              type="button"
              variant="outlined"
              className="!mr-1"
              color="primary"
              size="small"
              onClick={() => statusClose("no")}
              >
              No
              </Button>
              <Button
              type="button"
              variant="contained"
              color="success"
              size="small"
              onClick={() => statusClose("yes")}
              >
              Yes, sure
              </Button>
          </>
          }
          errorAlert={statusAlert}
      /> */}
  
      {/* Delete Confirmation Dialog */}
      {/* <CommonDialog
          open={dialogOpen}
          onClose={deleteClose}
          title=""
          content={MessageAndTitle.ApplyContent}
          actions={
          <>
              <Button
              type="button"
              variant="outlined"
              className="!mr-1"
              color="primary"
              size="small"
              onClick={() => deleteClose("no")}
              >
              No
              </Button>
              <Button
              type="button"
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleDelete(brandToDelete)}
              >
              Yes, sure
              </Button>
          </>
          }
          errorAlert={errorAlert}
      /> */}
      </>
  );
};

export default AdminUserLists
