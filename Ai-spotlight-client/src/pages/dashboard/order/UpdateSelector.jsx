import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function UpdateSelector({
  setStatus,
  id,
  type,
  order,
  colorB,
}) {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState('');
  const [oderStatus, setOrderStatus] = useState({});
  const [oderPayment, setPayment] = useState({});
  const [typeUpdate, setApiStatus] = useState({});

  useEffect(() => {
    const updateData = async () => {
      try {
        const apiUrl = `https://ai-spotlights.com/api/v1/order/${typeUpdate}/update/${id}/`;
        const response = await axios.put(apiUrl, { oderStatus, oderPayment }); 
        if (response.data.status === 'success') {
          console.log(
            'response?.data?.order?.payment',
            response?.data?.order?.payment,
          ); 
          setStatus((e) => !e);
        } else {
        }
      } catch (error) {
        console.error(
          'Submission error:',
          error.response?.data || error.message,
        );
      }
    };

    updateData();
  }, [oderStatus, oderPayment]);

  const handleChangeStatus = (event) => {
    setOrderStatus(event.target.value);
    setApiStatus('status');
  };

  const handleChangePayment = (event) => {
    setPayment(event.target.value);
    setApiStatus('payment');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event,
    reason
  ) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        style={{
          backgroundColor: colorB,
          color: 'white',
        }}
      > 
        {type === 'payment' ? order?.payment : order?.status}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>
          {type === 'payment' ? 'Update Payment' : 'Update Status'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              {type === 'payment' && (
                <Select
                  native
                  value={order?.payment ? order?.payment : 'Loading..'}
                  onChange={handleChangePayment}
                  input={<OutlinedInput id="demo-dialog-native" />}
                >
                  <option value="UnPaid">A. Un Paid</option>
                  <option value="Paid">B. Paid </option>
                </Select>
              )}
              {type === 'status' && (
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={order?.status}
                  onChange={handleChangeStatus}
                  input={<OutlinedInput />}
                >
                  <MenuItem value="Pending">A. Pending</MenuItem>
                  <MenuItem value="Processing">B. Processing</MenuItem>
                  <MenuItem value="Compted">C. Completed</MenuItem>
                </Select>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}