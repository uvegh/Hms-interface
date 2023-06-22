import React from 'react'

function SpinnerLoader() {
    return (
        <>

            <div className="container-fluid overlay">
                <div className="loader-vin m-auto">
                    <div className="lds-spinner text-center m-auto">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SpinnerLoader