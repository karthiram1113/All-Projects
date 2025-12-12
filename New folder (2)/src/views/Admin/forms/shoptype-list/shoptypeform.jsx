import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { shopEditFunction, shopTypeCreate, shopTypeGet } from '../../services/api-services';
import { toast } from 'react-toastify';
import ADMINAPI from '../../../../api/services/AdminLogin/adminAPI';

function Shoptypeform() {

  
      // Loading State

  const [loading,setLoading] = useState('')

    // Shoptype Create Method

    const [shopType,setShopType] = useState('')
    const [status,setStatus] = useState('')
    const [shopTypeId,setShopTypeId] = useState('')
    const [submit, setSubmit] = useState(false);


        // Useeffect Method

  useEffect(() => {

    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setUrlName(myArray[2]) 

    const shopId = myArray[3];
    setShopTypeId(shopId);
    shoTypeGetMethod(shopId);

   }, []);

    // Navigate
    const Navigate = useNavigate()
    const [urlName,setUrlName] = useState('')



    // Shoptype Create Api

    const shopTypeApi = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSubmit(true)
      if(!shopType){
        return;
      }
    
const apidata={
    shopName: shopType,
    status: status
}

      
      try {
      
        const responseData = await ADMINAPI.adminShopCreate(apidata);
    
        console.log('shoptype', responseData);
    
        if (responseData.apiStatus.code == '200') {
          Navigate('/adminshoplist');
          setSubmit(false)
          toast.success(responseData.apiStatus.message);
        } else {
          toast.error(responseData.apiStatus.message);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    // ShopType Edit Api Method

    const shopEdit = async (e) => {
      e.preventDefault();
      setLoading(true);
    setSubmit(true)

    const apidata ={
      shopId: shopTypeId,
      shopName: shopType,
      status
    }
    
      try {    
        // Pass the parameters in the correct order
        const responseData = await ADMINAPI.adminShopUpdate(apidata);
    
        console.log('API Response:', responseData);
    
        if (responseData.apiStatus.code == '200') {
        setSubmit(false)
          Navigate('/adminshoplist');
          toast.success(responseData.apiStatus.message);
        } else {
          toast.error(responseData.apiStatus.message);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    // ShopType Get Api Method

   const shoTypeGetMethod = async (shopId) => {
    try {
   
        const response = await ADMINAPI.adminShopGet(shopId);

        if (!response || !response.result || !response.result.ShopTypeListData) {
            throw new Error("Invalid response data");
        }

        // Extract the client data
        const dat = response.result.ShopTypeListData;
        console.log(dat, "dat");

        setShopType(dat.name)
        setStatus(dat.status)
      
    } catch (error) {
        console.log("Error handled =", error);
    }
};

  return (
    <div>
       <div class="card">
        <div class="card-body">
          <form class="forms-sample">
            <div className='row'>
              <div className='col-md-6'>
                <div class="form-group">
                  <label class="required" for="exampleInputUsername1">Shop Type</label>
                  <input type="text" class="form-control" id="exampleInputUsername1"
                  onChange={(e)=>setShopType(e.target.value)}
                  style={
                    submit && shopType.length == 0
                      ? { borderColor: "red" }
                      : { borderColor: "" }
                  }
                  value={shopType}
                  placeholder="Shop Type" />
                {submit && shopType.length==0?<div className="text-danger">shopType is required</div>:<></>}

                </div>
                
              </div>

              <div className="col-md-6">
  <div className="form-group">
    <label htmlFor="exampleInputGender">Status</label>
    <select value={status} onChange={(e)=>setStatus(e.target.value)} className="form-control" id="exampleInputGender" style={{ height: '44px', fontSize: '12px',borderColor:"red" }}>
      <option hidden>Select Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>
</div>
        


            </div>

            <div className='button-center'>
            <button onClick={()=>Navigate("/adminshoplist")} class="btn btn-light">Cancel</button>
       {urlName=="Create"? <button type="submit" onClick={shopTypeApi} class="btn btn-gradient-primary me-2">Submit</button>:
        <button type="submit"
           onClick={shopEdit} 
         class="btn btn-gradient-primary me-2">Submit</button>}    

            </div>

         
        </form>
        </div>
    </div>
    </div>
  )
}

export default Shoptypeform
