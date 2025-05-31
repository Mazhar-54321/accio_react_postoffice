import React, { useState } from 'react'

const Query = ({data,pincode,goback}) => {
    const [filter,setFilter]=useState('');
  return (
    <div>
       <button style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '5px 10px', width: '100px' }} onClick={goback}>Go back</button>
       <h3>Pincode:{pincode}</h3> 
       <h3>Message:{data?.[0]?.Message}</h3>
       <input type='text' placeholder='Filter' onChange={(event)=>{setFilter(event.target.value)}}  style={{marginBottom:'20px',padding:'5px',width:'200px'}}/>
       {
        <div style={{display:'flex',flexWrap:'wrap',rowGap:'10px',columnGap:'10px'}}>
            {data?.[0]?.PostOffice?.filter((el)=>el?.Name?.trim()?.toLowerCase()?.includes(filter?.trim()?.toLowerCase()))?.map((el)=>(
                <div style={{width:'300px',height:'300px',border:'1px solid black',padding:'10px'}}>
                    <p>Name:{el?.Name}</p>
                    <p>Branch Type:{el?.BranchType}</p>
                    <p>Dellivery Status:{el?.DeliveryStatus}</p>
                    <p>District:{el?.District}</p>
                    <p>Division:{el?.Division}</p>
                </div>
            ))}
        </div>
       
       }
    </div>
  )
}

export default Query