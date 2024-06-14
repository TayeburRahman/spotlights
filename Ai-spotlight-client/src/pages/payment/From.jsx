import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const FromCheckout = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const onSubmit = () => { 
        navigate('/order/pay')
     };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} className='d-grid-s'>
                        <label>First name<span className='required'>*</span></label>
                        <input className='input-filed' id={`${errors.firstname && 'border-red'}`} {...register("firstname", { required: true })} />
                        {errors.firstname && <span className='required'>This field is required</span>}
                    </Grid>
                    <Grid item xs={12} md={6} className='d-grid-s'>
                        <label>Last name<span className='required'>*</span></label>
                        <input className='input-filed' id={`${errors.lastname && 'border-red'}`} {...register("lastname", { required: true })} />
                        {errors.lastname && <span className='required'>This field is required</span>}
                    </Grid>
                    <Grid item xs={12} md={6} className='d-grid-s'>
                        <label>Email<span className='required'>*</span></label>
                        <input className='input-filed' id={`${errors.email && 'border-red'}`} {...register("email", { required: true })} />
                        {errors.email && <span className='required'>This field is required</span>}
                    </Grid>
                    <Grid item xs={12} md={6} className='d-grid-s'>
                        <label>Phone number<span className='required'>*</span></label>
                        <input className='input-filed' id={`${errors.phone && 'border-red'}`} {...register("phone", { required: true })} />
                        {errors.phone && <span className='required'>This field is required</span>}
                    </Grid>
                    <Grid item xs={12} md={6} className='d-grid-s'>
                        <label>Tool Name<span className='required'>*</span></label>
                        <input className='input-filed' id={`${errors.toolname && 'border-red'}`} {...register("toolname", { required: true })} />
                        {errors.toolname && <span className='required'>This field is required</span>}
                    </Grid>
                    <Grid item xs={12} md={6} className='d-grid-s'>
                        <label>
                            Tool URL<span className='required'>*</span></label>
                        <input className='input-filed' id={`${errors.toolurl && 'border-red'}`} {...register("toolurl", { required: true })} />
                        {errors.toolurl && <span className='required'>This field is required</span>}
                    </Grid>
                    <Grid item xs={12} md={12} className='d-grid-s'>
                        <label>Provide Assets (recommended)</label>
                        <p className='pb-1 p-sm'> Help us make your listing great. Provide us with assets like YouTube video URL, logo/icon URL, integrations list and social channels.</p>
                        <textarea className='textarea-filed'  {...register("assets")} />
                        <p className='pt-2 p-sm'>Help us make your listing great. Provide us with assets like YouTube video URL, logo/icon URL, integrations list and social channels.</p>
                    </Grid>
                </Grid>
                <div className='pt-3 pb-5 mt-3'>
                    <input className='input-button' type='submit' value="Continue to payment" />
                </div>
            </form> 
        </div>
    )
};

export default FromCheckout;