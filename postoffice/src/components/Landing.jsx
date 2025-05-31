import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader';
import Query from './Query';



const Landing = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [inputText, setInputText] = useState('');
    const [loading, setLoadng] = useState(false);
    const [postCodeDetails, setPostCodeDetails] = useState(null);
    const clickHandler = () => {
        if (inputText.trim().length > 6) {
            setErrorMessage('Postal code cant be more than 6 digits');
            return;
        }
        if (Number.isNaN(inputText.trim())) {
            setErrorMessage('Only numbers are allowed');
            return;
        }
        setErrorMessage('');
        setLoadng(true);
        fetch(`https://api.postalpincode.in/pincode/${inputText}`).then((res) => {
            return res.json()
        }).then((res) => {
            setPostCodeDetails(res)
        }).catch((err) => {
            setErrorMessage('Could not fetch details for above postcode');

        }).finally(() => {
            setLoadng(false);
        })
    }


    return (
        <>
            {loading ? <div style={{ position: 'absolute', top: '50%', left: '50%' }}><ClipLoader color="#36d7b7" loading={true} size={50} /></div> :
                postCodeDetails ? <Query data={postCodeDetails} pincode={inputText} goback={()=>{setPostCodeDetails(null)}} /> : <div>
                    <h1>Welcome to Indian Post office</h1>
                    <h3>Enter Pincode</h3>
                    <input type='number' onChange={(event) => { setInputText(event.target.value) }} value={inputText} placeholder='Pincode' style={{ display: 'block', marginBottom: '20px', padding: '5px' }} />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '5px 10px', width: '100px' }} onClick={clickHandler}>Lookup</button>

                </div>
            }
        </>

    )
}

export default Landing