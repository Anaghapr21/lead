import React, { useState,useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Grid,
  Menu,
  // FormControl, // Add this import
  FormLabel, // Add this import
  // EmailField
} from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox } from '@material-ui/core';
import QuestionTableForm from '../QuestionTableForm/questiontableform';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';

const Implementation = (props) => {
  const {
    onImplementationChange,
    onRequiredFieldsChange,
  }=props;

  const { setIsNextButtonEnabled } = props;

  const [currentPage, setCurrentPage] = useState(1);

    const [implementationType, setImplementationType] = useState('');
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [country, setCountry] = useState('');
  const [companyHeadquarter,setCompanyHeadquarter]=useState('');
  const [designation,setDesignation]=useState('');
  const [countryCode,setCountryCode]=useState('+91');
  const [isMultiCompanyMultiCountry, setIsMultiCompanyMultiCountry] = useState(1);
  const [isMultiCompanySingleCountry, setIsMultiCompanySingleCountry] = useState('');
  const [isSingleCompany, setIsSingleCompany] = useState('');
  const [isSingleCompanyMultiBranches,setIsSingleCompanyMultiBranches]=useState('');
  const [multiCompanyMultiCountryDetails,setIsMultiCompanyMultiCountryDetails]=useState({
    company:'',
    country:'',
    contactPerson:'',
    designation:'',
    email:'',
    mobileNo:'',
    businessVerticals:'',
  });
  const [companyDetailsList,setCompanyDetailsList]=useState([]);
  const [newCompanyDetails, setNewCompanyDetails] = useState({
    companyName: '',
    // country: '',
    contactPerson: '',
    designation: '',
    email: '',
    mobileNo: '',
    // businessVerticals: ''
  });


const [companyType,setCompanyType]=useState('');
const [additionalDetails, setAdditionalDetails] = useState('');
const [detailsText, setDetailsText] = useState('');
useEffect(() => {
  // Update isNextButtonEnabled after required fields change
  props.setIsNextButtonEnabled(areRequiredFieldsFilled());
}, [newCompanyDetails]); 

const handleFormInputChange=(e)=>{
  const {name,value}=e.target;
  setNewCompanyDetails((prevState)=>({
    ...prevState,
    [name]:value,
  }));
};


const handleAddCompany=()=>{
  setCompanyDetailsList(prevList=>[...prevList,newCompanyDetails]);
  setNewCompanyDetails({
    company:'',
    country:'',
    contactPerson:'',
    designation:'',
    email:'',
    mobileNo:'',
    businessVerticals:''
  });
}


// Function to handle changes in the new company details form
const handleNewCompanyInputChange = (e) => {
  const { name, value } = e.target;
  setNewCompanyDetails(prevState => ({
    ...prevState,
    [name]: value
  }));
};

const handleRemoveCompany = (index) => {
  setCompanyDetailsList(prevList => prevList.filter((_, idx) => idx !== index));
};

// const handleCompanyTypeChange=(e)=>{
//   setCompanyType(e.target.value);
// }

const handleCompanyTypeChange=(e)=>{
  const selectedCompanyType=e.target.value;
  setCompanyType(selectedCompanyType);
  setIsMultiCompanyMultiCountry('');
  setIsMultiCompanySingleCountry('');
  setIsSingleCompanyMultiBranches('');
  setAdditionalDetails('');
  props.onImplementationChange(selectedCompanyType);
}

const handleNextToClientInfo = () => {
  props.onRequiredFieldsChange(areRequiredFieldsFilled());
  // Handle the logic to navigate to the ClientInformationForm or perform any other action
  // For simplicity, let's increment the currentPage to navigate to the next page
  setCurrentPage(currentPage + 1);
};

const handlePreviousPage = () => {
  setCurrentPage(currentPage - 1);
};
const handleMultiCompanyMultiCountryChange=(value)=>{
  setIsMultiCompanyMultiCountry(value);
  setAdditionalDetails('');
  props.onImplementationChange(value);
}

const handleMultiCompanySingleCountry=(value)=>{
  setIsMultiCompanySingleCountry(value);
  setAdditionalDetails('');
  props.onImplementationChange(value);
}

const handleSingleCompanyMultiBanches=(value)=>{
  setIsSingleCompanyMultiBranches(value);
  setAdditionalDetails('');
  props.onImplementationChange(value);
}
const handleAdditionalDetailsChange = (event) => {
  setAdditionalDetails(event.target.value);
};

const handleDetailsTextChange = (event) => {
  setDetailsText(event.target.value);
};


const areRequiredFieldsFilled = () => {
  // Logic to check if required fields are filled
  // For example, assuming companyName, contactPerson, email, and mobileNo are required fields
  return (
    newCompanyDetails.companyName !== '' &&
    newCompanyDetails.contactPerson !== '' &&
    newCompanyDetails.email !== '' &&
    newCompanyDetails.mobileNo !== '' &&
    newCompanyDetails.designation !== ''
  );
};

const handleClearForm=()=>{
  setNewCompanyDetails({
    companyName:'',
    country:'',
    contactPerson:'',
    designation:'',
    email:'',
    mobileNo:'',
    businessVerticals:''
  });
};


    return (
      <>
      <FormControl component="fieldset" >
        <FormLabel component="legend">Type of Company:</FormLabel>
        <RadioGroup
  aria-label="company-type"
  name="company-type"
  value={companyType}
  onChange={(e) => {
    handleCompanyTypeChange(e);
    if (e.target.value === 'single-company') {
      // Enable the Next button directly if Single Company is selected
      setIsNextButtonEnabled(true);
    } else {
      props.onImplementationChange(e.target.value); // Call the function to update next button based on user's input
    }
  }}
>
          <FormControlLabel value="multi-country-multi-company" control={<Radio />} label="Multi-country Multi-company" />
          <FormControlLabel value="single-country-multiple-company" control={<Radio />} label="Single Country Multiple Company" />
          <FormControlLabel value="single-company-multiple-branches" control={<Radio />} label="Single Company Multiple Branches" />
          <FormControlLabel value="single-company" control={<Radio />} label="Single Company" />
        </RadioGroup>
      </FormControl>
      {companyType === 'multi-country-multi-company' && (
        <FormControl component="fieldset" style={{marginTop:'80px'}}>
          <FormLabel component="legend">Is it a multi country multi company  implementation?</FormLabel>
          <RadioGroup
            row
            aria-label="multi-company-multi-country"
            name="multi-company-multi-country"
            value={isMultiCompanyMultiCountry}
            // onChange={(e) => setIsMultiCompanyMultiCountry(e.target.value)}
            // onChange={(e)=>{
            //   setIsMultiCompanyMultiCountry(e.target.value);
            //   props.onRequiredFieldsChange(e.target.value === 'no' ? true : areRequiredFieldsFilled());
            //   props.onImplementationChange(e.target.value);
            // }}
            onChange={(e)=>handleMultiCompanyMultiCountryChange(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        
        
      )}
  
    
        {isMultiCompanyMultiCountry === 'yes' && (
        <>
          {companyDetailsList.map((companyDetails, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '20px' }}>
              
             <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Lead No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="leadNo"
              value={companyDetails.leadNo}
              onChange={handleFormInputChange}
              InputProps={{ disabled: true }}
            />
            <br/><br/>
            <TextField
  label="Company Name"
  variant="outlined"
  color="primary"
  focused
  style={{ width: '100%' }}
  name="companyName"
  value={companyDetails.companyName}
  onChange={(e) => {
    handleFormInputChange(e);
    props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
  }}
  required
/>
            <br/><br/>

            <TextField
              label="Country"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="country"
              value={companyDetails.country}
              onChange={handleFormInputChange}
            />
            <br/><br/>
            <TextField
              label="Contact Person"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="contactPerson"
              value={companyDetails.contactPerson}
              onChange={handleFormInputChange}
              required
            />
            <br/><br/>
            </Grid>
            <Grid item xs={6}>

            <TextField
              label="Email"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="email"
              value={companyDetails.email}
              onChange={handleFormInputChange}
              required
            />
            <br/><br/>
            <TextField
              label="Mobile No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="mobileNo"
              value={companyDetails.mobileNo}
              onChange={handleFormInputChange}
              required
            />
            <br/><br/>
            <TextField
              label="Designation"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="designation"
              value={companyDetails.designation}
              onChange={handleFormInputChange}
              required
            />
            <br/><br/>
            {/* <TextField
              label="Business Verticals"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="businessVerticals"
              value={companyDetails.businessVerticals}
              onChange={handleFormInputChange}
            /> */}
            <TextField
  label="Business Verticals"
  variant="outlined"
  color="primary"
  focused
  style={{ width: '100%' }}
  name="businessVerticals"
  value={newCompanyDetails.businessVerticals}
  onChange={handleFormInputChange}
  select
  SelectProps={{
    native: true,
  }}
>
  <option value=""></option>
  <option value="Retail">Retail</option>
  <option value="Manufacturing">Manufacturing</option>
  <option value="Trading">Trading</option>
  <option value="Hospital">Hospital</option>
  <option value="Education">Education</option>
  <option value="Rental">Rental</option>
</TextField>

          </Grid>
          {/* <Grid item xs={6}> */}
            {/* Other fields such as Date, Address, etc. */}
          {/* </Grid> */}
        </Grid>
              <Button variant="contained" color="primary" onClick={() => handleRemoveCompany(index)} style={{width:'100px',height:'40px',marginLeft:'30px'}}>
                Remove 
              </Button>
            </div>
          ))}

          {/* Form for adding new company details */}
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          
                  <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Lead No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="leadNo"
              value={newCompanyDetails.leadNo}
              onChange={handleFormInputChange}
              InputProps={{ disabled: true }}
            />
            <br/><br/>
           <TextField
  label="Company Name"
  variant="outlined"
  color="primary"
  focused
  style={{ width: '100%' }}
  name="companyName"
  value={newCompanyDetails.companyName}
  onChange={(e) => {
    handleFormInputChange(e);
    props.onRequiredFieldsChange(e.target.value !== ''); // Call the function to update next button based on required fields
  }}
  required
/>
            <br/><br/>

            <TextField
              label="Country"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="country"
              value={newCompanyDetails.country}
              onChange={handleFormInputChange}
            />
            <br/><br/>
            <TextField
              label="Contact Person"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="contactPerson"
              value={newCompanyDetails.contactPerson}
              onChange={handleFormInputChange}
              required
            />
            <br/><br/>
            </Grid>
            <Grid item xs={6}>

            <TextField
              label="Email"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="email"
              value={newCompanyDetails.email}
              onChange={handleFormInputChange}
              required
            />
            <br/><br/>
            <TextField
              label="Mobile No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="mobileNo"
              value={newCompanyDetails.mobileNo}
              onChange={handleFormInputChange}
              required
            />
            <br/><br/>
            <TextField
              label="Designation"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="designation"
              value={newCompanyDetails.designation}
              onChange={handleFormInputChange}
              required
            />
            <br/><br/>
            {/* <TextField
              label="Business Verticals"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="businessVerticals"
              value={newCompanyDetails.businessVerticals}
              onChange={handleFormInputChange}
            /> */}
            <TextField
  label="Business Verticals"
  variant="outlined"
  color="primary"
  focused
  style={{ width: '100%' }}
  name="businessVerticals"
  value={newCompanyDetails.businessVerticals}
  onChange={handleFormInputChange}
  select
  SelectProps={{
    native: true,
  }}
>
  <option value=""></option>
  <option value="Retail">Retail</option>
  <option value="Manufacturing">Manufacturing</option>
  <option value="Trading">Trading</option>
  <option value="Hospital">Hospital</option>
  <option value="Education">Education</option>
  <option value="Rental">Rental</option>
</TextField>

          </Grid>
         
        </Grid>
      </div>

      {/* Button to add a new company */}
      <Button variant="contained" color="primary" onClick={handleAddCompany} style={{ marginLeft: '300px', marginBottom: '-45px' }}>
        Add Company
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClearForm} style={{ marginBottom: '50px' }}>
  Clear Form
</Button>
          <br/><br/>
        <FormControl component="fieldset">
        <FormLabel component="legend">Any Additional Details?</FormLabel>
        <RadioGroup
          aria-label="additional-details"
          name="additional-details"
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        {additionalDetails === 'yes' && (
        // <TextField
        //   id="details-text"
        //   label="Enter Details"
        //   value={detailsText}
        //   onChange={handleDetailsTextChange}
        // />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:'70px',width:'150%', marginTop:'40px' }}>
        <TextField
          label="Enter Details"
          variant="outlined"
          color="primary"
          focused
          style={{ width: '100%' }} // Adjust width as needed
          multiline
          rows={4}
          value={detailsText}
          onChange={handleDetailsTextChange}
          placeholder="Add details here..."

        />
      </div>
      )}
      </FormControl>
        </>
        
      )}
      <br/><br/>

{isMultiCompanyMultiCountry === 'no' && (
  <FormControl component="fieldset">
    <FormLabel component="legend">Any Additional Details?</FormLabel>
    <RadioGroup
      aria-label="additional-details"
      name="additional-details"
      value={additionalDetails}
      onChange={(e) => setAdditionalDetails(e.target.value)}
    >
      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="no" control={<Radio />} label="No" />
    </RadioGroup>
    {additionalDetails === 'yes' && (
        // <TextField
        //   id="details-text"
        //   label="Enter Details"
        //   value={detailsText}
        //   onChange={handleDetailsTextChange}
        // />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:'70px',width:'150%', marginTop:'40px' }}>
        <TextField
          label="Enter Details"
          variant="outlined"
          color="primary"
          focused
          style={{ width: '100%' }} // Adjust width as needed
          multiline
          rows={4}
          value={detailsText}
          onChange={handleDetailsTextChange}
          placeholder="Add details here..."

        />
      </div>
      )}
  </FormControl>
)}




        {/* Render similar form fields for other options */}
        {companyType === 'single-country-multiple-company' && (
        // <FormControl component="fieldset">
        <FormControl component="fieldset" style={{marginTop:'60px'}}>

          <FormLabel component="legend">Is it a single country multiple company  implementation?</FormLabel>
          <RadioGroup
            row
            aria-label="multi-company-single-country"
            name="multi-company-single-country"
            value={isMultiCompanySingleCountry}
            // onChange={(e) => setIsMultiCompanySingleCountry(e.target.value)}
            // onChange={(e)=>{
            //   setIsMultiCompanySingleCountry(e.target.value);
            //   props.onRequiredFieldsChange(e.target.value === 'no' ? true : areRequiredFieldsFilled());
            //   props.onImplementationChange(e.target.value);
            // }}
            onChange={(e)=>handleMultiCompanySingleCountry(e.target.value)}

          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        )}
        {isMultiCompanySingleCountry === 'yes' && (
        <>
          {companyDetailsList.map((companyDetails, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '20px' }}>
            
                   <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Lead No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="leadNo"
              value={companyDetails.leadNo}
              onChange={handleFormInputChange}
              InputProps={{ disabled: true }}
            />
            <br/><br/>
            <TextField
              label="Company Name"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="companyName"
              value={companyDetails.companyName}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>

            <TextField
              label="Country"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="country"
              value={newCompanyDetails.country}
              onChange={handleFormInputChange}
            />
            <br/><br/>
            <TextField
              label="Contact Person"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="contactPerson"
              value={companyDetails.contactPerson}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            </Grid>
            <Grid item xs={6}>

            <TextField
              label="Email"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="email"
              value={companyDetails.email}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            <TextField
              label="Mobile No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="mobileNo"
              value={companyDetails.mobileNo}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            <TextField
              label="Designation"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="designation"
              value={companyDetails.designation}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            {/* <TextField
              label="Business Verticals"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="businessVerticals"
              value={newCompanyDetails.businessVerticals}
              onChange={handleFormInputChange}
            /> */}
            <TextField
  label="Business Verticals"
  variant="outlined"
  color="primary"
  focused
  style={{ width: '100%' }}
  name="businessVerticals"
  value={companyDetails.businessVerticals}
  onChange={handleFormInputChange}
  select
  SelectProps={{
    native: true,
  }}
>
  <option value=""></option>
  <option value="Retail">Retail</option>
  <option value="Manufacturing">Manufacturing</option>
  <option value="Trading">Trading</option>
  <option value="Hospital">Hospital</option>
  <option value="Education">Education</option>
  <option value="Rental">Rental</option>
</TextField>

          </Grid>
         
        </Grid>
              <Button variant="contained" color="primary" onClick={() => handleRemoveCompany(index)} style={{width:'100px',height:'40px',marginLeft:'30px'}}>
                Remove 
              </Button>
            </div>
          ))}


          {/* Form for adding new company details */}
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
         
                 <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Lead No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="leadNo"
              value={newCompanyDetails.leadNo}
              onChange={handleFormInputChange}
              InputProps={{ disabled: true }}
            />
            <br/><br/>
            <TextField
              label="Company Name"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="companyName"
              value={newCompanyDetails.companyName}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>

            <TextField
              label="Country"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="country"
              value={newCompanyDetails.country}
              onChange={handleFormInputChange}
            />
            <br/><br/>
            <TextField
              label="Contact Person"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="contactPerson"
              value={newCompanyDetails.contactPerson}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            </Grid>
            <Grid item xs={6}>

            <TextField
              label="Email"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="email"
              value={newCompanyDetails.email}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            <TextField
              label="Mobile No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="mobileNo"
              value={newCompanyDetails.mobileNo}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            <TextField
              label="Designation"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="designation"
              value={newCompanyDetails.designation}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            {/* <TextField
              label="Business Verticals"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="businessVerticals"
              value={newCompanyDetails.businessVerticals}
              onChange={handleFormInputChange}
            /> */}
            <TextField
  label="Business Verticals"
  variant="outlined"
  color="primary"
  focused
  style={{ width: '100%' }}
  name="businessVerticals"
  value={newCompanyDetails.businessVerticals}
  onChange={handleFormInputChange}
  select
  SelectProps={{
    native: true,
  }}
>
  <option value=""></option>
  <option value="Retail">Retail</option>
  <option value="Manufacturing">Manufacturing</option>
  <option value="Trading">Trading</option>
  <option value="Hospital">Hospital</option>
  <option value="Education">Education</option>
  <option value="Rental">Rental</option>
</TextField>

          </Grid>
          
        </Grid>
          </div>

          {/* Button to add a new company */}
          <Button variant="contained" color="primary" onClick={handleAddCompany} style={{marginLeft:'300px',marginBottom:'-45px'}}>
            Add Company
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClearForm} style={{ marginBottom: '50px' }}>
  Clear Form
</Button>
          <br/><br/>
        <FormControl component="fieldset">
        <FormLabel component="legend">Any Additional Details?</FormLabel>
        <RadioGroup
          aria-label="additional-details"
          name="additional-details"
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        {/* {additionalDetails === 'yes' && (
        <TextField
          id="details-text"
          label="Enter Details"
          value={detailsText}
          onChange={handleDetailsTextChange}
        />
      )} */}
       {additionalDetails === 'yes' && (
        // <TextField
        //   id="details-text"
        //   label="Enter Details"
        //   value={detailsText}
        //   onChange={handleDetailsTextChange}
        // />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:'70px',width:'150%', marginTop:'40px' }}>
        <TextField
          label="Enter Details"
          variant="outlined"
          color="primary"
          focused
          style={{ width: '100%' }} // Adjust width as needed
          multiline
          rows={4}
          value={detailsText}
          onChange={handleDetailsTextChange}
          placeholder="Add details here..."

        />
      </div>
      )}
      </FormControl>
        </>
      )}

<br/><br/>

{isMultiCompanySingleCountry === 'no' && (
  <FormControl component="fieldset">
    <FormLabel component="legend">Any Additional Details?</FormLabel>
    <RadioGroup
      aria-label="additional-details"
      name="additional-details"
      value={additionalDetails}
      onChange={(e) => setAdditionalDetails(e.target.value)}
    >
      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="no" control={<Radio />} label="No" />
    </RadioGroup>
    {/* {additionalDetails === 'yes' && (
      <TextField
        id="details-text"
        label="Enter Details"
        value={detailsText}
        onChange={handleDetailsTextChange}
      />
    )} */}
     {additionalDetails === 'yes' && (
        // <TextField
        //   id="details-text"
        //   label="Enter Details"
        //   value={detailsText}
        //   onChange={handleDetailsTextChange}
        // />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:'70px',width:'150%', marginTop:'40px' }}>
        <TextField
          label="Enter Details"
          variant="outlined"
          color="primary"
          focused
          style={{ width: '100%' }} // Adjust width as needed
          multiline
          rows={4}
          value={detailsText}
          onChange={handleDetailsTextChange}
          placeholder="Add details here..."

        />
      </div>
      )}
  </FormControl>
)}




      {companyType === 'single-company-multiple-branches' && (
        // <FormControl component="fieldset">
        <FormControl component="fieldset" style={{marginTop:'20px'}}>

          <FormLabel component="legend">Is it a Single company Multiple Branch implementation?</FormLabel>
          <RadioGroup
            row
            aria-label="single-company-multiple-branches"
            name="single-company-multiple-branches"
            value={isSingleCompanyMultiBranches}
            // onChange={(e) => setIsSingleCompanyMultiBranches(e.target.value)}
            onChange={(e)=>{
              setIsSingleCompanyMultiBranches(e.target.value);
              props.onRequiredFieldsChange(e.target.value === 'no' ? true : areRequiredFieldsFilled());
              props.onImplementationChange(e.target.value);
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        )}
        {isSingleCompanyMultiBranches === 'yes' && (
        <>
          {companyDetailsList.map((companyDetails, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: '20px' }}>
            
                   <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Lead No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="leadNo"
              value={companyDetails.leadNo}
              onChange={handleFormInputChange}
              InputProps={{ disabled: true }}
            />
            <br/><br/>
            <TextField
              label="Company Name"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="companyName"
              value={companyDetails.companyName}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required            />
            <br/><br/>

            <TextField
              label="Country"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="country"
              value={companyDetails.country}
              onChange={handleFormInputChange}
            />
            <br/><br/>
            <TextField
              label="Contact Person"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="contactPerson"
              value={companyDetails.contactPerson}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required            />
            <br/><br/>
            </Grid>
            <Grid item xs={6}>

            <TextField
              label="Email"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="email"
              value={companyDetails.email}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            <TextField
              label="Mobile No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="mobileNo"
              value={companyDetails.mobileNo}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required            />
            <br/><br/>
            <TextField
              label="Designation"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="designation"
              value={companyDetails.designation}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            {/* <TextField
              label="Business Verticals"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="businessVerticals"
              value={newCompanyDetails.businessVerticals}
              onChange={handleFormInputChange}
            /> */}
            <TextField
  label="Business Verticals"
  variant="outlined"
  color="primary"
  focused
  style={{ width: '100%' }}
  name="businessVerticals"
  value={companyDetails.businessVerticals}
  onChange={handleFormInputChange}
  select
  SelectProps={{
    native: true,
  }}
>
  <option value=""></option>
  <option value="Retail">Retail</option>
  <option value="Manufacturing">Manufacturing</option>
  <option value="Trading">Trading</option>
  <option value="Hospital">Hospital</option>
  <option value="Education">Education</option>
  <option value="Rental">Rental</option>
</TextField>

          </Grid>
          
        </Grid>
              <Button variant="contained" color="primary" onClick={() => handleRemoveCompany(index)} style={{width:'100px',height:'40px',marginLeft:'30px'}}>
                Remove 
              </Button>
            </div>
          ))}


          {/* Form for adding new company details */}
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
         
                 <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="Lead No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="leadNo"
              value={newCompanyDetails.leadNo}
              onChange={handleFormInputChange}
              InputProps={{ disabled: true }}
            />
            <br/><br/>
            <TextField
              label="Company Name"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="companyName"
              value={newCompanyDetails.companyName}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>

            <TextField
              label="Country"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="country"
              value={newCompanyDetails.country}
              onChange={handleFormInputChange}
            />
            <br/><br/>
            <TextField
              label="Contact Person"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="contactPerson"
              value={newCompanyDetails.contactPerson}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            </Grid>
            <Grid item xs={6}>

            <TextField
              label="Email"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="email"
              value={newCompanyDetails.email}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            <TextField
              label="Mobile No"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="mobileNo"
              value={newCompanyDetails.mobileNo}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            <TextField
              label="Designation"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="designation"
              value={newCompanyDetails.designation}
              onChange={(e) => {
                handleFormInputChange(e);
                props.onRequiredFieldsChange(areRequiredFieldsFilled()); // Call the function to update next button based on required fields
              }}
              required
            />
            <br/><br/>
            {/* <TextField
              label="Business Verticals"
              variant="outlined"
              color="primary"
              focused
              style={{ width: '100%' }}
              name="businessVerticals"
              value={newCompanyDetails.businessVerticals}
              onChange={handleFormInputChange}
            /> */}
            <TextField
  label="Business Verticals"
  variant="outlined"
  color="primary"
  focused
  style={{ width: '100%' }}
  name="businessVerticals"
  value={newCompanyDetails.businessVerticals}
  onChange={handleFormInputChange}
  select
  SelectProps={{
    native: true,
  }}
>
  <option value=""></option>
  <option value="Retail">Retail</option>
  <option value="Manufacturing">Manufacturing</option>
  <option value="Trading">Trading</option>
  <option value="Hospital">Hospital</option>
  <option value="Education">Education</option>
  <option value="Rental">Rental</option>
</TextField>

          </Grid>
          
        </Grid>
          </div>

          {/* Button to add a new company */}
          <Button variant="contained" color="primary" onClick={handleAddCompany} style={{marginLeft:'300px',marginBottom:'-45px'}}>
            Add Company
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClearForm} style={{ marginBottom: '50px' }}>
  Clear Form
</Button>
         <br/><br/>
        <FormControl component="fieldset">
        <FormLabel component="legend">Any Additional Details?</FormLabel>
        <RadioGroup
          aria-label="additional-details"
          name="additional-details"
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        {/* {additionalDetails === 'yes' && (
        <TextField
          id="details-text"
          label="Enter Details"
          value={detailsText}
          onChange={handleDetailsTextChange}
        />
      )} */}
       {additionalDetails === 'yes' && (
        // <TextField
        //   id="details-text"
        //   label="Enter Details"
        //   value={detailsText}
        //   onChange={handleDetailsTextChange}
        // />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:'70px',width:'150%', marginTop:'40px' }}>
        <TextField
          label="Enter Details"
          variant="outlined"
          color="primary"
          focused
          style={{ width: '100%' }} // Adjust width as needed
          multiline
          rows={4}
          value={detailsText}
          onChange={handleDetailsTextChange}
          placeholder="Add details here..."

        />
      </div>
      )}
      </FormControl>
        </>
      )}
 <br/><br/>

{isSingleCompanyMultiBranches === 'no' && (
  <FormControl component="fieldset">
    <FormLabel component="legend">Any Additional Details?</FormLabel>
    <RadioGroup
      aria-label="additional-details"
      name="additional-details"
      value={additionalDetails}
      onChange={(e) => setAdditionalDetails(e.target.value)}
    >
      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="no" control={<Radio />} label="No" />
    </RadioGroup>
    {/* {additionalDetails === 'yes' && (
      <TextField
        id="details-text"
        label="Enter Details"
        value={detailsText}
        onChange={handleDetailsTextChange}
      />
    )} */}
     {additionalDetails === 'yes' && (
        // <TextField
        //   id="details-text"
        //   label="Enter Details"
        //   value={detailsText}
        //   onChange={handleDetailsTextChange}
        // />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:'70px',width:'150%', marginTop:'40px' }}>
        <TextField
          label="Enter Details"
          variant="outlined"
          color="primary"
          focused
          style={{ width: '100%' }} // Adjust width as needed
          multiline
          rows={4}
          value={detailsText}
          onChange={handleDetailsTextChange}
          placeholder="Add details here..."

        />
      </div>
      )}
  </FormControl>
)}

    



{companyType === 'single-company' && (
  <FormControl component="fieldset">
    <FormLabel component="legend">Any Additional Details?</FormLabel>
    <RadioGroup
      aria-label="additional-details"
      name="additional-details"
      value={additionalDetails}
      onChange={(e) => setAdditionalDetails(e.target.value)}
    >
      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="no" control={<Radio />} label="No" />
    </RadioGroup>
    {/* {additionalDetails === 'yes' && (
      <TextField
        id="details-text"
        label="Enter Details"
        value={detailsText}
        onChange={handleDetailsTextChange}
      />
    )} */}
     {additionalDetails === 'yes' && (
        // <TextField
        //   id="details-text"
        //   label="Enter Details"
        //   value={detailsText}
        //   onChange={handleDetailsTextChange}
        // />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginRight:'70px',width:'150%', marginTop:'40px' }}>
        <TextField
          label="Enter Details"
          variant="outlined"
          color="primary"
          focused
          style={{ width: '100%' }} // Adjust width as needed
          multiline
          rows={4}
          value={detailsText}
          onChange={handleDetailsTextChange}
          placeholder="Add details here..."

        />
      </div>
      )}
  </FormControl>
)}
     

        
   
    </>
  );
   
  };

  export default Implementation;