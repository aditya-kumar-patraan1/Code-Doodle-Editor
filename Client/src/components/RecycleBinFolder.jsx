import React from 'react';

function RecycleBinFolder() {
    return  (
        <>
        <div className="bg-red-500 w-full h-full">
            <div className='h-[20%] bg-green-400 p-4 flex justify-between'>
                <div className='bg-blue-600'>
                    <p className='text-4xl font-semibold '>Recycle Bin</p>
                    <p>search</p>
                </div>
                <div>
                    Options
                </div>
            </div>
            <div className='h-[80%] bg-pink-600'></div>
        </div>
        </>
    )
}

export default RecycleBinFolder;