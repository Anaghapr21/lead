import React, { useState ,useEffect} from 'react';
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
import Implementation from '../Implementation/implementation';
import axios from 'axios';
import './leadinformation.css'; // Import your CSS file
import BASE_URL from '../config';


const LeadInformationForm = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [decisionMakerType, setDecisionMakerType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showQuestions, setShowQuestions] = useState(false);
const [leadNo, setLeadNo] = useState('');
// const [selectedDate, setSelectedDate] = useState('');
const [companyName, setCompanyName] = useState('');
const [companyAddress, setCompanyAddress] = useState('');
const [isCompanyAddressValid, setIsCompanyAddressValid] = useState(true);
const [runningPromotions,setRunningPromotions]=useState('');
const [additionalNotes, setAdditionalNotes] = useState('');
const [divisionalOperations,setDivisionalOperations]=useState('');
const [businessVerticals,setBusinessVerticals]=useState('');


const [contactPerson, setContactPerson] = useState('');
const [contactNo, setContactNo] = useState('');
const [emailAddress, setEmailAddress] = useState('');
const [clientRepresentative,setClientRepresentative]=useState('');
const [clientRepresentativeDesignation,setClientRepresentativeDesignation]=useState('');
const [decisionMaker,setDecisionMaker]=useState('');
const [contactDetails,setContactDetails]=useState('');
const [contactedBy,setContactedBy]=useState('');
const [contactedDate,setContactedDate]=useState('');
const [repliedDate,setRepliedDate]=useState('');
const [nextMeeting,setNextMeeting]=useState('');
const [isEmailValid, setIsEmailValid] = useState(true);
const [isContactNoValid,setIsContactNoValid]=useState(true);
const [openModal, setOpenModal] = useState(false);
const [implementationType, setImplementationType] = useState('');
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [companyHeadquarter,setCompanyHeadquarter]=useState('');
  const [designation,setDesignation]=useState('');
  const [countryCode,setCountryCode]=useState('+91');

  const [companyDetailsList,setCompanyDetailsList]=useState([]);
  const [contactPersonTitle, setContactPersonTitle] = useState('');
  const [isCompanyNameTouched,setIsCompanyNameTouched]=useState(false);
  const [isCompanyAddressTouched,setIsCompanyAddressTouched]=useState(false);
  const [isContactPersonTouched,setIsContactPersonTouched]=useState(false);
  const [isContactNoTouched,setIsContactNoTouched]=useState(false);
  const [isEmailTouched,setIsEmailTouched]=useState(false);
  const [isDesignationTouched,setIsDesignationTouched]=useState(false);
  const [isPage1Valid,setIsPage1Valid]=useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10); // Format: YYYY-MM-DD
    setCurrentDate(formattedDate);
  }, []);

useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (response.ok) {
        const data = await response.json();
        // Sort countries alphabetically by name
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
      } else {
        console.error('Failed to fetch countries:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchCountries();
}, []);

  const [questions, setQuestions] = useState([
    {
      srNo: 1,
      subject: 'Knowledge About ERP Systems',
      subQuestions: [],
    },
    {
      srNo: 2,
      subject: 'Do you have a clarity of your Business process requirements?',
      subQuestions: [],
    },
    {
      srNo: 3,
      subject: 'Did you document the process as below?',
      subQuestions: [
        'a. Procure to pay cycle (Purchase Cycle)',
        'b. Order to Cash Cycle (Sales Cycle)',
        'c. Hire to Retire (HR & Payroll Cycle)',
        'd. Record to Report (Finance & Accounting)',
        'e. Manufacturing Process',
        'f. Contracting and Services Distribution and Warehouse Management',
      ],
    },
    {
      srNo: 4,
      subject: 'Do your team have a clear understanding about the integrations and reporting requirements for?',
      subQuestions: [
        'a. Procurement process and integrations to Sales, Inventory, Manufacturing, Contracting, Project Management, Accounting and Financial reporting.',
        'b. Sales Process and integrations to Procurement, Inventory, Manufacturing, Contracting, Project Management, Accounting and Financial reporting.',
        'c. Manufacturing Process and integrations to Procurement, Sales, Inventory, Project Management Accounting and Financial reporting.',
        'd. Contracting and Services integrations to Procurement, Sales, Inventory, Project Management, Accounting and Financial reporting.',
        'e. HR and Payroll process and its integrations to Project Management, Accounting and Financial process.',
      ],
    },
    {
      srNo: 5,
      subject: 'Do you have a dedicated team to be part of the Project from start to end as required below?',
      subQuestions: [
        'a. Project Sponsor: for Approving and driving the implementation.',
        'b. Project Manager/Project Lead: Planning, directing, staffing and managing the project.',
        'c. Project Analyst: Collecting, documenting, analyzing the business process.',
        'd. Business Process Experts: Who carry out business process and provide recommendations.',
      ],
    },
    {
      srNo: 6,
      subject: 'Do you have clear information about?',
      subQuestions: ['a. The project budgets',
       'b. By when you would you like to start the project.'],
    },
    {
      srNo: 7,
      subject: 'Current Software details that’s within your organization',
      subQuestions: [],
    },
    
    {
          srNo: 8,
          subject: (
            <div>
            Your Concern’s with respect to your software that is in place.   
            <div>Example</div>
            <div> a. Financial pain points: Current solution is costing too much to access and maintain.</div>
            <br/>
              <div>b. Productivity pain points: Current solution may be too time consuming and you are looking for a solution that makes work more streamlined.</div>
              <br/>
              <div>c. Process pain points: Looking to improve internal processes such as lead generation, hiring, app integrations or social media campaigns.</div>
              <br/>
              <div>d. Support pain points: Customer support is scattered and not available at all. You are looking to solve support pain points by installing a hotline for urgent issues, a help desk, chat bots or a knowledge base for more common, less urgent issues.</div>
            </div>
          ),
          subQuestions: [],

         
        },
    {
      srNo: 9,
      subject: 'Any Questions to us can be put in the remarks for our further analysis and as a next step towards a long-term business partner Journey.',
      subQuestions: [],
    },
  ]);

 
  const renderSubQuestions = (subQuestions) => {
    return (
      <TableCell colSpan={5}>
        {subQuestions.map((subQuestion, index) => (
          <TableRow key={index}>
            <TableCell>{subQuestion}</TableCell>

            <TableCell>
              <Radio />
            </TableCell>
            <TableCell>
              <Radio />
            </TableCell>
            <TableCell>
              <Checkbox />
            </TableCell>
          </TableRow>
        ))}
      </TableCell>
    );
  };

 

  const handleRadioChange = (index, option) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      // Deselect the other option
      if (option === 'yes') {
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          yes: true,
          no: null,
        };
      } else if (option === 'no') {
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          yes: null,
          no: true,
        };
      }
      return updatedQuestions;
    });
  };


  const handleSubquestionRadioChange = (mainIndex, subIndex, option, value) => {
  setQuestions((prevQuestions) => {
    const updatedQuestions = [...prevQuestions];
    // Update the selected option for the subquestion
    updatedQuestions[mainIndex].subquestions[subIndex] = {
      ...updatedQuestions[mainIndex].subquestions[subIndex],
      [option]: value,
    };
    return updatedQuestions;
  });
};




  
  
  

  const handleSupportNeededChange = (index, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], supportNeeded: value };
      return updatedQuestions;
    });
  };

  const handleRemarksChange = (index, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], remarks: value };
      return updatedQuestions;
    });
  };
  
  
  const getPageHeading = () => {
    switch (currentPage) {
      case 1:
        // return 'Lead Information' ;
        return '' ;

      case 2:
        return '';
      case 3:
        return 'Questions'
      case 4:
        return 'Client Information Area';
      case 5:
        return 'Loyal IT Solutions Area';
      default:
        return 'Lead Information';
    }
  };
  // const getPageHeadingStyle = () => {
  //   switch (currentPage) {
  //     case 1:
  //       return { fontSize: '24px', fontWeight: 'bold', color: 'black',fontFamily: 'Apple Color Emoji' };
  //     case 2:
  //       return { fontSize: '20px', fontStyle: 'italic', color: 'black',fontFamily: 'Apple Color Emoji' };
  //     case 3:
  //       return { fontSize: '28px', fontWeight: 'bold', color: 'black' ,fontFamily: 'Apple Color Emoji'};
  //     case 4:
  //       return { fontSize: '22px', fontFamily: 'Arial', color: 'black' ,fontFamily: 'Apple Color Emoji'};
  //     case 5:
  //       return { fontSize: '26px', fontWeight: 'bold', textDecoration: 'underline', color: 'black' ,fontFamily: 'Apple Color Emoji'};
  //     default:
  //       return { fontSize: '24px', fontWeight: 'bold', color: 'black' ,fontFamily: 'Apple Color Emoji'};
  //   }
  // };
  // const getPageHeading = () => {
  //   const headingStyle = getPageHeadingStyle();
  
  //   return (
  //     <h1 style={headingStyle}>
  //       {(() => {
  //         switch (currentPage) {
  //           case 1:
  //             return 'Lead Information';
  //           case 2:
  //             return '';
  //           case 3:
  //             return 'Questions';
  //           case 4:
  //             return 'Client Information Area';
  //           case 5:
  //             return 'Loyal IT Solutions Area';
  //           default:
  //             return 'Lead Information';
  //         }
  //       })()}
  //     </h1>
  //   );
  // };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDecisionMakerTypeChange = (event) => {
    setDecisionMakerType(event.target.value);
  };


  const handleNextPage = () => {
    if (currentPage === 1) {
      const isPage1Valid = companyName && companyAddress && contactPerson && contactNo && emailAddress && designation;
      if (!isPage1Valid) {
        // Alert or handle invalid form data
        return;
      }
    }
  
    setCurrentPage(currentPage + 1);
    if (currentPage === 1) {
      setShowQuestions(true);
    }
  };
  const handleNextToClientInfo = () => {
    // Handle the logic to navigate to the ClientInformationForm or perform any other action
    // For simplicity, let's increment the currentPage to navigate to the next page
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };


  const handleOpenModal = () => {
    setOpenModal(true);
  };
  
  const handleCloseModal = () => {
    setLeadNo('');
  setSelectedDate('');
  setCompanyName('');
  setCompanyAddress('');
  setContactPerson('');
  setContactNo('');
  setEmailAddress('');
    setOpenModal(false);
    setCurrentPage(1);

  };
  


  // const handleSubmit = () => {
  //   // Add your submit logic here
  //   // For example, you can send the form data to a server or perform other actions
  //   // console.log('Form submitted!');
  //   handleOpenModal();
  // };

  const handleBusinessVerticalsChange = (event) => {
    setBusinessVerticals(event.target.value);
};

const handleDivisionalOperationsChange = (event) => {
    setDivisionalOperations(event.target.value);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leadData = {
        company_name: companyName,
        company_address: companyAddress,
        contact_person: `${contactPersonTitle} ${contactPerson}`,
        contact_no: `${countryCode} ${contactNo}`,
        email: emailAddress,
        designation: designation,
        country: country,
        company_headquarters:companyHeadquarter,
        business_verticals:businessVerticals,
        running_promotions:runningPromotions,
        divisional_operations:divisionalOperations,
        additional_notes: additionalNotes,
    };

    try {
        const response = await fetch(`http://localhost:8000/save/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData),
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Lead data submitted successfully');
            clearFormFields(); // Clear form fields after successful submission if needed
            alert('Thank you for your submission!'); // Show a thank you message
            window.location.href = 'https://loyalitsolutions.com/'; // Redirect to another website

        } else {
            console.error('Failed to submit lead data');
            alert('Failed to submit lead data. Please try again later.'); // Show an error message
        }
    } catch (error) {
        console.error('Error submitting lead data:', error);
        alert('Error submitting lead data. Please try again later.'); // Show an error message
    }
};



const clearFormFields = () => {
    // Reset form fields
    setCompanyName('');
    setCompanyAddress('');
    setContactPersonTitle('Mr');
    setContactPerson('');
    setCountryCode('+1');
    setContactNo('');
    setEmailAddress('');
    setDesignation('');
    setCountry('');
    setAdditionalNotes('');
    setBusinessVerticals('');
    setCompanyHeadquarter('');
    setRunningPromotions('');
    setDivisionalOperations('');
    setIsCompanyNameTouched(false);
    setIsCompanyAddressTouched(false);
    setIsContactPersonTouched(false);
    setIsContactNoTouched(false);
    setIsEmailTouched(false);
    setIsDesignationTouched(false);
    setIsPage1Valid(false);
};


  
  const handleQuestionsUpdate = (updatedQuestions) => {
    setQuestions(updatedQuestions);
  };
 
  const handleCompanyHeadquarterChange=(e)=>{
    setCompanyHeadquarter(e.target.value);
  };
  


  const renderPage1 = () => {
  
    
    const isPage1Valid = companyName && companyAddress && contactPerson && contactNo && isEmailValid && designation && isCompanyAddressValid && country ;
  
    const validateEmail = (email) => {
      // Use a regular expression for basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validateContactNo=(contactNo)=>{
      return contactNo.length===10 && /^\d+$/.test(contactNo);
    }
    const handleEmailChange = (e) => {
      const email = e.target.value;
      setEmailAddress(email);
      setIsEmailValid(validateEmail(email));
      setIsEmailTouched(true);
    };

    // const handleContactNoChange=(e)=>{
    //   const contactNoValue=e.target.value;
    //   setContactNo(contactNoValue);
    //   setIsContactNoValid(validateContactNo(contactNoValue));
    // };


    // const handleContactNoChange = (e) => {
    //   const contactNoValue = e.target.value;
      
    //   // Check if the entered contact number has more than 10 digits
    //   const isValidLength = contactNoValue.length <= 10;
    
    //   // If the length is valid, set the contact number and validate it
    //   if (isValidLength) {
    //     setContactNo(contactNoValue);
    //     setIsContactNoValid(validateContactNo(contactNoValue));
    //   } else {
    //     // If the length is not valid, set an error state or display an error message
    //     // Here, you can set an error state or display an error message using state management or directly
    //     // For example, you can set an error state like setIsContactNoValid(false) to indicate an invalid contact number
    //     setIsContactNoValid(false);
    //   }
    //   setIsContactNoTouched(true);
    // };
    const handleContactNoChange=(e)=>{
      const contactNoValue=e.target.value;
      const isValidLength=contactNoValue.length<=10;
      const isContactNoValidFormat=/^\d+$/.test(contactNoValue);
      if (isValidLength && isContactNoValidFormat){
        setContactNo(contactNoValue);
        setIsContactNoValid(validateContactNo(contactNoValue));
      }else{
        setIsContactNoValid(false);
      }
      if (contactNoValue === '') {
        setContactNo(''); // Clear the contact number state
      }
      setIsContactNoTouched(true);
    }

    const handleImplementationChange = (event) => {
      setImplementationType(event.target.value);
      setShowAdditionalForm(event.target.value === 'multiCompanyMultiCountry');
    };
  
    const handleCountryChange = (event) => {
      setCountry(event.target.value);
    };
  
    const handleDesignationChange=(event)=>{
      setDesignation(event.target.value);
    };

    const handleRemoveCompany = (index) => {
      setCompanyDetailsList(prevList => prevList.filter((_, i) => i !== index));
    };
    
    const validateCompanyAddress = (address) => {
      // Split the address into parts (assuming comma as the delimiter)
      const addressParts = address.split(',');
    
      // Check if the address has at least three parts (name, place, pincode)
      if (addressParts.length >= 3) {
        const name = addressParts[0].trim();
        const place = addressParts[1].trim();
        const pincode = addressParts[2].trim();
    
        // Add your specific criteria for each part (you can customize this)
        const isNameValid = name.length > 0;
        const isPlaceValid = place.length > 0;
        const isPincodeValid = /^\d{5}$/.test(pincode); // assuming pincode is a 5-digit number
    
        // Return true only if all parts are valid
        return isNameValid && isPlaceValid && isPincodeValid;
      }
    
      // If there are not enough parts, the address is invalid
      return false;
    };
    
   
    const handleCompanyAddressChange = (e) => {
      const address = e.target.value;
      setCompanyAddress(address);
      setIsCompanyAddressValid(validateCompanyAddress(address));
      setIsCompanyAddressTouched(true);
    };
    

    const handleCompanyNameChange=(e)=>{
      setCompanyName(e.target.value);
      setIsCompanyNameTouched(true);
    };

    
    return (
      // <form  onSubmit={handleSubmit}>
        
      <div className="container">
      <div className="title">Lead Information</div>
      {/* <form action="#" onSubmit={handleSubmit} > */}
          <div className="user-details" style={{width:'500px'}}>
              <div className="input-box">
                  <span className="details">Lead No</span>
                  <input type="text" name='lead_no'disabled/>
              </div>
              <div className="input-box">
                  <span className="details">Date</span>
                  <input type="text" name='date' value={currentDate} onChange={(e)=>setCurrentDate(e.target.value)}disabled/>
              </div>
              {/* <div class="input-box">
                  <span class="details">Company Name<span style={{color:'red'}}>*</span></span>
                  <input type="text" placeholder="Enter company name" required/>
              </div> */}
              <div className="input-box">
  <span className="details">Company Name<span style={{color:'red'}}>*</span></span>
  <input 
    type="text" 
    placeholder="Enter company name" 
    value={companyName} 
    onChange={(e) => setCompanyName(e.target.value)} 
    onBlur={()=>setIsCompanyNameTouched(true)}
    required
    name='company_name'
    
  />
  {isCompanyNameTouched && !companyName && <span className="error-message">Please enter company name</span>}
</div>
              <div className="input-box">
                  <span className="details">Company Address<span style={{color:'red'}}>*</span></span>
                  <input type="text" placeholder="Enter Address"  
                  onChange={(e) => setCompanyAddress(e.target.value)} 
                  onBlur={()=>setIsCompanyAddressTouched(true)}
                  name='company_address'
                  required/>
                  {isCompanyAddressTouched && !companyAddress && <span className='error-message'>Please enter company address</span>}
              </div>
              {/* <div class="input-box">
                  <span class="details">Contact Person<span style={{color:'red'}}>*</span></span>
                  <input type="text" placeholder="Enter Name" required/>
              </div> */}
  <div className="input-container">
  <div className="input-box">
    <span className="details">Contact Person<span style={{ color: 'red' }}>*</span></span>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <select
        value={contactPersonTitle}
        onChange={(e) => setContactPersonTitle(e.target.value)}
        style={{ marginRight: '4px', width: '50px' }}
      >
        <option value="Mr">Mr</option>
        <option value="Ms">Ms</option>
        <option value="Mrs">Mrs</option>
      </select>
      <input
        type="text"
        placeholder="Enter Name"
        required
        value={contactPerson}
        onChange={(e) => setContactPerson(e.target.value)}
        onBlur={()=>setIsContactPersonTouched(true)}
        name='contact_person'
      />
    </div>
    {isContactPersonTouched && !contactPerson && <span className='error-message'>Please enter contact person name</span>}
  </div>

  <div className="input-box">
    <span className="details">Contact No<span style={{ color: 'red' }}>*</span></span>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <select
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        style={{ marginRight: '4px', width: '50px' }}
      >
        <option value="+1">+1</option>
        <option value="+91">+91</option>
      </select>
      <input
        type="text"
        placeholder="Contact No"
        required
        value={contactNo}
        onChange={handleContactNoChange}
        onBlur={()=>setIsContactNoTouched(true)}
        name='contact_no'
      />
    </div>
    {isContactNoTouched && !contactNo && <span className="error-message">Please enter contact no</span>}
    {isContactNoTouched && contactNo && !isContactNoValid && <span className='error-message'>Invalid contact number format</span>}
  </div>
</div>


              <div className="input-box">
                  <span className="details">Email<span style={{color:'red'}}>*</span></span>
                  <input type="text" placeholder="Enter Your Email" 
                      // onChange={(e) => setEmailAddress(e.target.value)} 
                      onChange={handleEmailChange}
                      onBlur={()=>setIsEmailTouched(true)}
                      name='email'
                   required/>
                   {isEmailTouched && !emailAddress && <span className='error-message'>Please enter email</span>}
                   {isEmailTouched && emailAddress && !isEmailValid && <span className='error-message'>Invalid email format</span>}

              </div>
              {/* <div class="input-box">
                  <span class="details">Designation<span style={{color:'red'}}>*</span></span>
                  <input type="text" placeholder="Enter Designation" required/>
              </div> */}
              <div className="input-box">
  <span className="details">Designation<span style={{color:'red'}}>*</span></span>
  <input 
    type="text" 
    placeholder="Enter Designation" 
    value={designation} 
    onChange={(e) => setDesignation(e.target.value)} 
    onBlur={()=>setIsDesignationTouched(true)}
    required
    name='designation'
  />
  {isDesignationTouched && !designation && <span className='error-message'>Please enter designation</span>}
</div>
              <div className="input-box">
                  <span className="details">Contact Person's Country<span style={{color:'red'}}>*</span></span>
                  {/* <input type="text" placeholder="Select Country" required/> */}
                  <select
                  style={{width:'100%',height:'44px',borderColor:'#9b59b6',transition: 'all 0.3s ease',border:'1px solid #ccc',outline:'none',borderRadius:'5px',paddingLeft:'15px',fontSize:'16px',borderBottomWidth:'2px'}}
                  value={country}
                  onChange={handleCountryChange}
                  required
                  name='country'
                  >
                  <option value="" disabled>Select Country</option>
                            {countries && countries.length > 0 && countries.map((countryData) => (
                                <option key={countryData.name?.common} value={countryData.name?.common}>
                                    {countryData.name?.common}
                                </option>
                  ))}
                  </select>
              </div>
              <div className="input-box">
                  <span className="details">Company HeadQuarters</span>
                  <input type="text" placeholder="HeadQuarters Name" name='company_headquarters'  onChange={(e) => setCompanyHeadquarter(e.target.value)} 
/>
              </div>
              <div className="input-box">
                        <span className="details">Business Verticals</span>
                        <select
                            value={businessVerticals}
                            style={{width:'100%',height:'44px',borderColor:'#9b59b6',transition: 'all 0.3s ease',border:'1px solid #ccc',outline:'none',borderRadius:'5px',paddingLeft:'15px',fontSize:'16px',borderBottomWidth:'2px'}}

                            onChange={handleBusinessVerticalsChange}
                            name='business_verticals'
                        >
                            <option value="" disabled>Select Verticals</option>
                            <option value="Retail">Retail</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Trading">Trading</option>
                            <option value="Hospital">Hospital</option>
                            <option value="Education">Education</option>
                            <option value="Rental">Rental</option>
                        </select>
                    </div>
              <div className="input-box">
                  <span className="details">Running Promotions</span>
                  <input type="text" placeholder="Running Promotions" name='running_promotions'     onChange={(e) => setRunningPromotions(e.target.value)} 
 />
              </div>
              <div className="input-box">
                        <span className="details">Divisional Operations</span>
                        <select
                            value={divisionalOperations}
                            style={{width:'500px',height:'44px',borderColor:'#9b59b6',transition: 'all 0.3s ease',border:'1px solid #ccc',outline:'none',borderRadius:'5px',paddingLeft:'15px',fontSize:'16px',borderBottomWidth:'2px'}}
                            onChange={handleDivisionalOperationsChange}
                            name='divisional_operations'
                        >
                            <option value="" disabled>Select Divisional Operation</option>
                            <option value="Odoo ERP Solutions">Odoo ERP Solutions</option>
                            <option value="Sales Force">Sales Force</option>
                            <option value="VCIO Services">VCIO Services</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Infrastructure Services">Infrastructure Services</option>
                        </select>
                    </div>
          </div>
          {/* <div class="input-box">
                  <span class="details">Additional Notes</span>
                  <input type="text" placeholder="Add additional notes here..." />
              </div> */}
              <div className="input-box">
  <span className="details">Additional Notes</span>
  <br/>
  <input
    type="text"
    style={{width:'500px',height:'90px',borderColor:'#9b59b6',transition: 'all 0.3s ease',border:'1px solid #ccc',outline:'none',borderRadius:'5px',paddingLeft:'15px',fontSize:'16px',borderBottomWidth:'2px'}}
    placeholder="Add additional notes here..."
    value={additionalNotes}
    onChange={(e) => setAdditionalNotes(e.target.value)}
    name='additional_notes'
  />
</div>
          <div className="button" style={{marginLeft:'450px'}}>
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit"disabled={!isPage1Valid}>
Submit
</Button>
  
             </div>
        {/* </form> */}
    </div>
    // </form>
    );
    
    // return (
    //   <>
        {/* <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="Lead No" variant="filled" color="primary" focused style={{ width: '100%' }}InputProps={{ disabled: true }} />
            <br/><br/>

            <TextField label="Company Name" variant="filled" color="primary" focused style={{ width: '100%' }} required value={companyName} onChange={(e)=>setCompanyName(e.target.value)}  />

            <br/><br/>
            <TextField
  label="Contact Person"
  variant="filled"
  color="primary"
  focused
  style={{ width: '100%' }}
  required
  InputProps={{
    startAdornment: (
      <TextField
        select
        value={contactPersonTitle}
        onChange={(e) => setContactPersonTitle(e.target.value)}
        style={{ width: '80px' }}
      >
        <MenuItem value="Mr">Mr</MenuItem>
        <MenuItem value="Ms">Ms</MenuItem>
        <MenuItem value="Mrs">Mrs</MenuItem>
      </TextField>
    ),
  }}
  value={contactPerson}
  onChange={(e) => setContactPerson(e.target.value)}
/>


            <br/><br/>
            <TextField
              type="email"
              label="Email Address"
              variant="filled"
              color="primary"
              focused
              style={{ width: '100%' }}
              value={emailAddress}
              onChange={handleEmailChange}
              required
              error={!isEmailValid}
              helperText={!isEmailValid ? 'Enter a valid email address' : ''}
            />
           <br/><br/>
           <TextField
            label=" Contact Person's Country"
            variant='filled'
            color='primary'
            focused
            style={{width:'100%'}}
            select
            value={country}
            onChange={handleCountryChange}
            required
            >
              
              {countries.map((countryData) => (
              <MenuItem key={countryData.name.common} value={countryData.name.common}>
                {countryData.name.common}
              </MenuItem>
            ))}
              </TextField>
              <br/><br/>
              <TextField
              label="Business Verticals"
              variant="filled"
              color="success"
              focused
              style={{ width: '100%' }}
              select
              value={decisionMakerType}
              onChange={handleDecisionMakerTypeChange}
            >
              <MenuItem value="Option1">Retail</MenuItem>
              <MenuItem value="Option2">Manufacturing</MenuItem>
              <MenuItem value="Option3">Trading</MenuItem>
              <MenuItem value="Option4">Hospital</MenuItem>
              <MenuItem value="Option5">Education</MenuItem>
              <MenuItem value="Option6">Rental</MenuItem>
            </TextField>
            
             
           <br/><br/>
           <TextField
              label="Divisional Operations"
              variant="filled"
              color="success"
              focused
              style={{ width: '208%' }}
              select
              value={decisionMakerType}
              onChange={handleDecisionMakerTypeChange}
            >
              <MenuItem value="Option1">Odoo ERP Solutions</MenuItem>
              <MenuItem value="Option2">Sales Force</MenuItem>
              <MenuItem value="Option3">VCIO Services</MenuItem>
              <MenuItem value="Option4">Web Development</MenuItem>
              <MenuItem value="Option5">Infrastructure Services</MenuItem>
            </TextField>
          

          </Grid>
          <Grid item xs={6}>
          <TextField
              label="Date"
              variant="filled"
              color="primary"
              focused style={{ width: '100%' }}
              type="date"
              InputLabelProps={{ shrink: true }}
              InputProps={{ disabled: true }}
            />
            <br/><br/>
            <TextField label="Company Address" variant="filled" color="primary" focused style={{ width: '100%' }} required value={companyAddress} onChange={handleCompanyAddressChange} />

         {!isCompanyAddressValid && (
            <span style={{ color: 'red' }}>Please provide a valid company address containing name, place, and pincode.</span>
          )}
            <br/><br/>
           
            <TextField
        label="Contact No"
        variant="filled"
        color="primary"
        focused
        style={{ width: '100%' }}
        required
        value={contactNo}
        onChange={handleContactNoChange}
        error={!isContactNoValid}
        helperText={!isContactNoValid ? 'Enter a valid contact number' : ''}
        InputProps={{
          startAdornment: (
            <TextField
              select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              style={{ width: '80px' }}
            >
              <MenuItem value="+1">+1</MenuItem>
              <MenuItem value="+91">+91</MenuItem>
            </TextField>
          ),
        }}
      />  
           
            <br/><br/>
            <TextField
            label="Designation"
            variant='filled'
            color='primary'
            focused
            style={{width:'100%'}}
            required
            value={designation}
            onChange={handleDesignationChange}
            />
          
            <br/><br/>
            <TextField
           label="Company Headquarters"
           variant='filled'
           color='primary'
           focused
           style={{width: '100%'}}
           value={companyHeadquarter}
           onChange={handleCompanyHeadquarterChange}
           />
           <br/><br/>
             
              <TextField label="Running Promotions" variant="filled" color="primary" focused style={{ width: '100%' }}  value={runningPromotions} onChange={(e)=>setRunningPromotions(e.target.value)}/>
            
             
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginLeft:'-330px',width:'207%', marginTop:'100px' }}>
      <TextField
        label="Additional Notes"
        variant="filled"
        color="primary"
        focused
        style={{ width: '100%' }} // Adjust width as needed
        multiline
        rows={4}
        value={additionalNotes}
        onChange={(e) => setAdditionalNotes(e.target.value)}
        placeholder="Add any additional notes here..."
      />
    </div>
          </Grid>
        </Grid> */}
         {/* <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="leadno"
            name="leadNo"
            label="Lead No"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            InputProps={{ disabled: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="date"
            name="date"
            label="Date"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            InputProps={{ disabled: true }}

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="companyName"
            name="companyName"
            label="Company Name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={companyName} onChange={(e)=>setCompanyName(e.target.value)} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="companyaddress"
            name="companyaddress"
            label="Company Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={companyAddress} 
            onChange={handleCompanyAddressChange} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="contactperson"
            name="contactperson"
            label="Contact person"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            InputProps={{
              startAdornment: (
                <TextField
                  select
                  value={contactPersonTitle}
                  onChange={(e) => setContactPersonTitle(e.target.value)}
                  style={{ width: '80px' }}
                >
                  <MenuItem value="Mr">Mr</MenuItem>
                  <MenuItem value="Ms">Ms</MenuItem>
                  <MenuItem value="Mrs">Mrs</MenuItem>
                </TextField>
              ),
            }}
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="contactno"
            name="contactno"
            label="Contact No"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={contactNo}
            onChange={handleContactNoChange}
            error={!isContactNoValid}
            helperText={!isContactNoValid ? 'Enter a valid contact number' : ''}
            InputProps={{
              startAdornment: (
                <TextField
                  select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={{ width: '80px' }}
                >
                  <MenuItem value="+1">+1</MenuItem>
                  <MenuItem value="+91">+91</MenuItem>
                </TextField>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={emailAddress}
              onChange={handleEmailChange}
              error={!isEmailValid}
              helperText={!isEmailValid ? 'Enter a valid email address' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="desigantion"
            name="designation"
            label="Designation"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={designation}
            onChange={handleDesignationChange}
          />
        </Grid>
       
         <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Contact Person's Country"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            select
            value={country}
            onChange={handleCountryChange}
            
            >
              
              {countries.map((countryData) => (
              <MenuItem key={countryData.name.common} value={countryData.name.common}>
                {countryData.name.common}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="companyheadquarters"
            name="companyheadquarters"
            label="Company HeadQuarters"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={companyHeadquarter}
           onChange={handleCompanyHeadquarterChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="businessverticals"
            name="businessverticals"
            label="Business Verticals"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            select
            value={decisionMakerType}
            onChange={handleDecisionMakerTypeChange}
          >
            <MenuItem value="Option1">Retail</MenuItem>
            <MenuItem value="Option2">Manufacturing</MenuItem>
            <MenuItem value="Option3">Trading</MenuItem>
            <MenuItem value="Option4">Hospital</MenuItem>
            <MenuItem value="Option5">Education</MenuItem>
            <MenuItem value="Option6">Rental</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="runningpromotions"
            name="runningpromotions"
            label="Running Promotions"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={runningPromotions} onChange={(e)=>setRunningPromotions(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            id="divisionaloperations"
            name="divisionaloperations"
            label="Divisional Operations"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            select
            value={decisionMakerType}
            onChange={handleDecisionMakerTypeChange}
          >
            <MenuItem value="Option1">Odoo ERP Solutions</MenuItem>
            <MenuItem value="Option2">Sales Force</MenuItem>
            <MenuItem value="Option3">VCIO Services</MenuItem>
            <MenuItem value="Option4">Web Development</MenuItem>
            <MenuItem value="Option5">Infrastructure Services</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} >
          <TextField
            id="additionalnotes"
            name="additionalnotes"
            label="Additional Notes"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            multiline
            rows={4}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Add any additional notes here..."          />
        </Grid>
       
       
      </Grid>
       
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          {(
            <Button variant="contained" color="primary" onClick={handleNextPage} disabled={!isPage1Valid}>
              Next
            </Button>
          )}
        </div> */}
      {/* </>
    ); */}
  };
  

const [isNextButtonEnabled,setIsNextButtonEnabled]=useState(true);
const [requiredFields, setRequiredFields] = useState({
  companyName: '',
  contactPerson:'',
  email:'',
  mobileNo:'',
  designation:''
  // Add other required fields here
});
const handleImplementationChange=(value)=>{
  setIsNextButtonEnabled(value === 'no');
};

const handleRequiredFieldsChange = (isRequiredFieldsFilled) => {
  // Check if all required fields are filled
  const allRequiredFieldsFilled = areRequiredFieldsFilled(); // Assuming this function checks all required fields

  // Update state to enable/disable the Next button
  setIsNextButtonEnabled(allRequiredFieldsFilled && isRequiredFieldsFilled);
};
const areRequiredFieldsFilled = () => {
  for (const key in requiredFields) {
    if (requiredFields[key] === '') {
      return false;
    }
  }
  return true;
};

  const renderPage2 = () => {
    return (
      <>
      <Implementation // Render the ImplementationComponent from implementation.js
        implementationType={implementationType}
        setImplementationType={setImplementationType}
        showAdditionalForm={showAdditionalForm}
        setShowAdditionalForm={setShowAdditionalForm}
        country={country}
        setCountry={setCountry}
        onImplementationChange={handleImplementationChange}
        onRequiredFieldsChange={handleRequiredFieldsChange}
        setIsNextButtonEnabled={setIsNextButtonEnabled}

        // Pass any other props or state variables needed by ImplementationComponent
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button variant="contained" color="primary" onClick={handlePreviousPage} style={{marginBottom:'300px'}}>
        Back
      </Button>
      {currentPage === 2 && (
        <Button variant="contained" color="primary" onClick={handleNextToClientInfo} disabled={!isNextButtonEnabled} style={{marginBottom:'300px'}}>
          Next
        </Button>
      )} 
    </div>
    </>
    );
  };

  const renderPage3 = () => {
    return (
      <>
        {showQuestions && (
        <QuestionTableForm
          questions={questions}
          handleRadioChange={handleRadioChange}
          // handleSubquestionRadioChange={handleSubquestionRadioChange}
          handleSupportNeededChange={handleSupportNeededChange}
          handleRemarksChange={handleRemarksChange}
          handleQuestionsUpdate={setQuestions} // Pass the setQuestions function

        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handlePreviousPage}>
          Back
        </Button>
        {currentPage === 3 && (
          <Button variant="contained" color="primary" onClick={handleNextToClientInfo}>
            Next
          </Button>
        )}
      </div>
      </>
    );
        };
  
  const renderPage4=()=>{
    const isPage3Valid = clientRepresentative && clientRepresentativeDesignation && decisionMaker && contactDetails;

    return (
        <>     
        <TableCell>
              <TextField label="Client Representative Name" variant="filled" color="success" focused  style={{width:'300px'}} required value={clientRepresentative} onChange={(e)=>setClientRepresentative(e.target.value)}/>
      
           <br/><br />
              <TextField label="Client Representative Designation" variant="filled" color="success" focused style={{width:'300px'}} required value={clientRepresentativeDesignation} onChange={(e)=>setClientRepresentativeDesignation(e.target.value)}/>
           <br/>
           </TableCell>

           <TableCell>
              {/* <TextField label="Type of Decision Maker" variant="filled" color="success" focused style={{width:'300px'}}/> */}
              <TextField
            label="Type of Decision Maker"
            variant="filled"
            color="success"
            focused
            style={{ width: '300px' }}
            select
            // value={decisionMakerType}
            // onChange={handleDecisionMakerTypeChange}
            value={decisionMaker}
            onChange={(e)=>setDecisionMaker(e.target.value)}
            required
          >
            <MenuItem value="Option1">Primary Contact</MenuItem>
            <MenuItem value="Option2">Influencer</MenuItem>
            <MenuItem value="Option3">Decision Maker</MenuItem>
            {/* Add more options as needed */}
          </TextField>
        <br/><br/>
            
              <TextField label="Contact Details" variant="filled" color="success" focused style={{width:'300px'}} required value={contactDetails} onChange={(e)=>setContactDetails(e.target.value)}/>
            </TableCell>
            
            {currentPage > 1 && currentPage < 5 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handlePreviousPage}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNextPage} disabled={!isPage3Valid}>
              Next
            </Button>
          </div>
        )}
        </>
    );
  };

  const renderPage5=()=>{
    const isPage4Valid = contactedBy && contactedDate && repliedDate && nextMeeting;

    return(
        <>
        <TableCell>
              <TextField label="Contacted By" variant="filled" color="success" focused  style={{width:'300px'}} required  value={contactedBy} onChange={(e)=>setContactedBy(e.target.value)}/>
      
           <br/><br />
           <TextField
          label="Replied Date"
          variant="filled"
          color="primary"
          focused style={{ width: '100%' }}
          type="date"
          InputLabelProps={{ shrink: true }}
          required value={repliedDate} onChange={(e)=>setRepliedDate(e.target.value)}
        />
              {/* <TextField label="Replied Date" variant="filled" color="success" focused style={{width:'300px'}} required value={repliedDate} onChange={(e)=>setRepliedDate(e.target.value)}/> */}
           <br/>
           </TableCell>

           <TableCell>
           <TextField
          label="Contacted Date"
          variant="filled"
          color="primary"
          focused style={{ width: '180%' }}
          type="date"
          InputLabelProps={{ shrink: true }}
          required value={contactedDate} onChange={(e)=>setContactedDate(e.target.value)}
        />
              {/* <TextField label="Contacted Date" variant="filled" color="success" focused style={{width:'300px'}} required value={contactedDate} onChange={(e)=>setContactedDate(e.target.value)}/> */}
        <br/><br/>
        <TextField
          label="Next Meeting Date"
          variant="filled"
          color="primary"
          focused style={{ width: '180%' }}
          type="date"
          InputLabelProps={{ shrink: true }}
          required value={nextMeeting} onChange={(e)=>setNextMeeting(e.target.value)}
/>
              {/* <TextField label="Next Meeting Date" variant="filled" color="success" focused style={{width:'300px'}} required value={nextMeeting} onChange={(e)=>setNextMeeting(e.target.value)}/> */}
            </TableCell>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handlePreviousPage}>
          Back
        </Button>
        {/* <Button variant="contained" color="primary" onClick={handleSubmit}> */}
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isPage4Valid}>

          Submit
        </Button>
      </div>

            </>
    )
  }

return (
  <div style={{marginTop:'60px',width:'900px'}}>
        <style>{`
    body {
      // background-color: #7986cb; 
      /* Set your desired background color */
      margin: 0; /* Remove default body margin */
      padding: 0; /* Remove default body padding */
    }
   

  `}</style>
    {/* <TableContainer component={Paper} style={{ margin: 'auto', width: '70%', marginTop: '50px'}}> */}
    <TableContainer style={{ margin: 'auto', width: '70%', marginTop: '50px'}}>

      <Typography variant="h5" style={{ marginLeft: '390px' }}>
      {getPageHeading()}
      </Typography>
      {/* <form style={{ marginTop: '50px' }}> */}
      <form>
        <Table style={{ width: '70%', margin: 'auto'}}>
          <TableBody>
            <TableRow>
              <TableCell>
                {currentPage === 1 && renderPage1()}
                {currentPage === 2 && renderPage2()}
                {currentPage === 3 && renderPage3()}
                {currentPage === 4 && renderPage4()}
                {currentPage === 5 && renderPage5()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
      </form>
    </TableContainer>
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle style={{fontFamily:'cursive'}}>Thank You!</DialogTitle>
      <DialogContent>
        <Typography>
          Your form has been submitted successfully.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} variant='contained' color='secondary' style={{marginRight:'140px'}}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
};
export default LeadInformationForm;
