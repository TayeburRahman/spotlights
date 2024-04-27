import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import StrollerIcon from '@mui/icons-material/Stroller';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useContext } from 'react';
import DarkModeContext from '../providers/DarkModeContext ';

function SortTools({ setSortBy, sort }) {

    const { darkMode } = useContext(DarkModeContext);

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };


    return (
        <div >
            <FormControl sx={{ m: 1, mr: 0, minWidth: 120, }} 
            >
                <Select
                    value={sort}
                    onChange={handleChange}
                    displayEmpty
                    className="max-sm:text-[12px]"   
                    sx={{  background: `${darkMode? "linear-gradient( 181deg, rgba(16, 29, 64, 0.95), rgba(0, 0, 0, 24%)  )":"white"}`,
                    height: "50px",
                    border:"1px solid #65abf142",  
                    
                }} 
                    >
                    <MenuItem className=' text-white' value={null} 
                    >
                        <Button className=' text-white' sx={{ color: `${darkMode? "#e3e3e3":"#676767"}`}} >Sort by</Button>
                    </MenuItem>

                    <MenuItem className='  text-left' value="verified" >
                        <Button className='buttonText text-left'><VerifiedIcon className='icon-co buttonIcon' sx={{ marginRight: "10px", fontSize: "20px",  color: `${darkMode? "#e3e3e3":"#676767"}` }} 
                        /> Verified</Button>
                    </MenuItem>
                    <MenuItem className=' ' value="new">
                        <Button className='buttonText'> <StrollerIcon className='icon-co buttonIcon' sx={{ marginRight: "10px", fontSize: "20px",   }} /> New</Button>
                    </MenuItem>
                    <MenuItem className=' ' value="popular">
                        <Button className='buttonText'><BookmarkAddedIcon className='icon-co buttonIcon' sx={{ marginRight: "10px", fontSize: "20px",  }} /> Popular</Button>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SortTools
