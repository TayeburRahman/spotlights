import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import StrollerIcon from '@mui/icons-material/Stroller';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { TiArrowUnsorted } from "react-icons/ti";

function SortTools({ setSortBy, sort }) {

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };


    return (
        <div >
            <FormControl sx={{ m: 1, mr: 0, minWidth: 120 }}>
                <Select
                    value={sort}
                    onChange={handleChange}
                    displayEmpty
                    className="selectGrid font-sans max-sm:text-[12px]"
                >
                    <MenuItem className='MenuItemButton bg-white text-white' value={null}>
                        <Button className='buttonText bg-white text-white'>Sort by</Button>
                    </MenuItem>

                    <MenuItem className='MenuItemButton text-left' value="verified">
                        <Button className='buttonText text-left'><VerifiedIcon className='icon-co buttonIcon' sx={{ marginRight: "10px", fontSize: "20px" }} /> Verified</Button>
                    </MenuItem>
                    <MenuItem className='MenuItemButton' value="new">
                        <Button className='buttonText'> <StrollerIcon className='icon-co buttonIcon' sx={{ marginRight: "10px", fontSize: "20px" }} /> New</Button>
                    </MenuItem>
                    <MenuItem className='MenuItemButton' value="popular">
                        <Button className='buttonText'><BookmarkAddedIcon className='icon-co buttonIcon' sx={{ marginRight: "10px", fontSize: "20px" }} /> Popular</Button>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SortTools
