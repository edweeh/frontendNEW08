import React, { useState,useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../Api'
import { useNavigate } from 'react-router-dom';


const PetForm = () => {
  const initialPetData = {
    Petcode: '',
    PetName: '',
    cid:'',
    Species: '',
    Age: '',
    Gender: 'Male', // default to Male
    Breed: '',
    Color: '',
    Image:null,
    Description: '',
    Status:'ACTIVE'
 
  };

  const [petData, setPetData] = useState(initialPetData);
  var[Category,setCategory] = useState([]);

  const navigate= useNavigate();
  const navigatetoview= () => {
    navigate('/PetV');
  }

  useEffect(()=>{
    axios.get(baseUrl + "/category/cfetch")
    .then(response =>{
        console.log(response.data)
        setCategory(response.data)
    })
    .catch(err=>console.log(err))
},[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((inputs) => ({ ...inputs, [name]: value }));
  };

//savedata code:
const SaveData = () => {
  console.log("Attempting to save data:", petData);
  const formData = new FormData();
  formData.append('Petcode', petData.Petcode);
  formData.append('PetName', petData.PetName);
  formData.append('cid', petData.cid);
  formData.append('Species', petData.Species);
  formData.append('Age', petData.Age);
  formData.append('Gender', petData.Gender);
  formData.append('Breed', petData.Breed);
  formData.append('Color', petData.Color);
  formData.append('Description', petData.Description);
  formData.append('Status', petData.Status);
  formData.append('Image', petData.Image);

  fetch(baseUrl+'/pet/petnew',
  {method:'post',body:formData,})
  .then((response)=>response.json())
  .then((data)=>{
      alert("Record Saved")
  })
  .catch((err)=>{
     console.log("Error")
  })
   
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPetData({ ...petData, Image: file });
  };

  

  const handleReset = () => {
    // Reset form data
    setPetData(initialPetData);
  };

  return (
    <div>
      <h1>Add a New Pet</h1>
      <form >
        <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
          <tbody>

          <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Petcode">Pet Code:</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <input type="text" name="Petcode" value={petData.Petcode} onChange={handleInputChange} required />
              </td>
            </tr>


            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="PetName">Pet Name:</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <input type="text" name="PetName" value={petData.PetName} onChange={handleInputChange} required />
              </td>
            </tr>

            <tr>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Category">Category</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>

              <select name="cid" value={petData.cid} onChange={handleInputChange}  >
                {
                  Category.map((value,index)=>{
                   return(
                    <option key={index} value={value._id}>{value.Categoryname}</option>
                )


            })
        }
    </select>
              </td>
            </tr>

            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Species">Species:</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <input type="text" name="Species" value={petData.Species} onChange={handleInputChange} required />
              </td>
            </tr>

          
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Age">Age(in months):</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <input type="text" name="Age" value={petData.Age} onChange={handleInputChange} required />
              </td>
            </tr>

            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Gender">Gender:</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <select name="Gender" value={petData.Gender} onChange={handleInputChange} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </td>
            </tr>

            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Breed">Breed:</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <input type="text" name="Breed" value={petData.Breed} onChange={handleInputChange} required />
              </td>
            </tr>

            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Color">Color:</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <input type="text" name="Color" value={petData.Color} onChange={handleInputChange} required />
              </td>
            </tr>

            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Image">Image:</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <input type="file" name="Image" accept="image/*" onChange={handleImageChange} required />
              </td>
            </tr>

            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <label htmlFor="Description">Description:</label>
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <textarea
                  name="Description"
                  value={petData.Description}
                  onChange={handleInputChange}
                  rows="4"
                  cols="50"
                  required
                />
              </td>
            </tr>

            <tr>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                    <label htmlFor="Status">Status :</label>
                    <select name="Status" value={petData.Status} onChange={handleInputChange} required >
                        <option value="ACTIVE" >ACTIVE</option>
                        <option value="INACTIVE" >INACTIVE</option>
                    </select>
                  </td>
                 
                </tr>
            
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button  onClick={() => { SaveData();
          }} style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
            ADD 
          </button>

          <button type="button" onClick={handleReset} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetForm;
