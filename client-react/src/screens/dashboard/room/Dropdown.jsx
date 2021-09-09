import React from 'react';


const Dropdown = ({ list, addItem }) => {


    return (<div id="dropdown" className=" shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto  ">

        <div className="flex flex-col w-full ">
            {list.map((item, key) => {
                return <div key={key}
                    className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue-400"
                    onClick={() => addItem(item.name)}>
                    <div className="flex w-full items-center  pl-2 border-transparent border-l-2 relative hover:border-blue-400" >
                        <div className="w-full items-center flex">
                            <div className="mx-2 leading-6  ">
                                {item.name}
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>);

};

export default Dropdown;