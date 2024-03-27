import { Checkbox } from "@mui/material";
import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { FaArrowDown91, FaArrowLeft, FaArrowLeftLong } from "react-icons/fa6";


const label = { inputProps: { "aria-label": "Checkbox demo" } };



export default function ToolsFilter({ pricing, setPricing, setFeatures, features, setIsFilterClicked, isFilterClicked }) {

  const [checkedFree, setCheckedFree] = useState(false)
  const [checkedFreeTrial, setCheckedFreeTrial] = useState(false)
  const [checkedContent, setCheckedContact] = useState(false)
  const [checkedFreemium, setCheckedFreemium] = useState(false)
  const [checkedPaid, setCheckedPaid] = useState(false)
  const [checkedDeals, setCheckedDeals] = useState(false)

  const [waitlist, setCheckedWaitlist] = useState(false)
  const [app, setCheckedApp] = useState(false)
  const [api, setCheckedApi] = useState(false)
  const [browser, setCheckedBrowser] = useState(false)
  const [source, setCheckedOpen] = useState(false)
  const [discord, setCheckedDiscord] = useState(false)
  const [signup, setCheckedSignup] = useState(false)

  const [isOpen, setIsOpen] = useState(false);





  const handelOnChangePricing = (event) => {
    if (event?.target?.value === "free") {
      setCheckedFree(checkedFree === true ? false : true)
    }
    if (event.target.value === "free_trial") {
      setCheckedFreeTrial(checkedFreeTrial === true ? false : true)
    }
    if (event.target.value === "contact_for_pricing") {
      setCheckedContact(checkedContent === true ? false : true)
    }
    if (event.target.value === "freemium") {
      setCheckedFreemium(checkedFreemium === true ? false : true)
    }
    if (event.target.value === "paid") {
      setCheckedPaid(checkedPaid === true ? false : true)
    }
    if (event.target.value === "deals") {
      setCheckedDeals(checkedDeals === true ? false : true)
    }


    const value = event.target.value;
    const currentIndex = pricing.indexOf(value);
    const newChecked = [...pricing];



    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setPricing(newChecked);
  };


  const handelOnChangeFeatures = (event) => {
    if (event?.target?.value === "waitlist") {
      setCheckedWaitlist(waitlist === true ? false : true)
    }
    if (event.target.value === "mobile_app") {
      setCheckedApp(app === true ? false : true)
    }
    if (event.target.value === "api") {
      setCheckedApi(api === true ? false : true)
    }
    if (event.target.value === "browser_extension") {
      setCheckedBrowser(browser === true ? false : true)
    }
    if (event.target.value === "open_source") {
      setCheckedOpen(source === true ? false : true)
    }
    if (event.target.value === "discord_community") {
      setCheckedDiscord(discord === true ? false : true)
    }
    if (event.target.value === "no_signup_required") {
      setCheckedSignup(signup === true ? false : true)
    }


    const value = event.target.value;
    const currentIndex = features.indexOf(value);
    const newChecked = [...features];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setFeatures(newChecked);
  };

  return (
    <div className={`bg-cyprus/95 toolscard dark:toolscard1 max-sm:w-full dark:text-black text-white p-10 pe-16 z-20 rounded-2xl border-2 border-gray-300 space-y-3 max-sm:absolute relative`}>
      <button
        onClick={() => setIsFilterClicked(!isFilterClicked)}
        className="flex md:hidden text-2xl absolute right-5"
      >
        <FaArrowLeft />
      </button>
      <div>
        <p p={0} m={0} className="text-[21px] mb-2 font-semibold text-white dark:text-gray-700">Pricing</p>
        <p p={0} m={0} >

          <Checkbox className={`"chackbox text-white" `}
            value="free"
            checked={checkedFree}
            onChange={handelOnChangePricing}
            {...label}
            sx={{
              // color: "#ffff",'
              "checked1" : {
                color: "white"
              }
            }}
          />
          Free
        </p>
        <p>

          <Checkbox className="chackbox"
            value="free_trial"
            checked={checkedFreeTrial}
            onChange={handelOnChangePricing}
            {...label}
          />
          Free Trial
        </p>
        {/* <p>
           
          <Checkbox className="chackbox"
            value="contact_for_pricing"
            checked={checkedContent}
            onChange={handelOnChangePricing}
            {...label}
          /> 
          Contact for Pricing 
        </p> */}
        <p>

          <Checkbox className="chackbox"
            value="freemium"
            checked={checkedFreemium}
            onChange={handelOnChangePricing}
            {...label}
          />
          Freemium
        </p>
        <p>

          <Checkbox className="chackbox"
            value="paid"
            checked={checkedPaid}
            onChange={handelOnChangePricing}
            {...label}
          />
          Paid
        </p>
        <p>

          <Checkbox className="chackbox"
            value="deals"
            checked={checkedDeals}
            onChange={handelOnChangePricing}
            {...label}
          />
          Deals
        </p>
      </div>
      <div className="">
        <p p={0} m={0} className="text-[21px] mb-2 font-semibold">Features</p>
        <p p={0} m={0}>

          <Checkbox className="chackbox"
            value="waitlist"
            checked={waitlist}
            onChange={handelOnChangeFeatures}
            {...label}
          />
          Waitlist
        </p>
        <p>

          <Checkbox className="chackbox"
            value="mobile_app"
            checked={app}
            onChange={handelOnChangeFeatures}
            {...label}
          />
          Mobile App
        </p>
        <p>

          <Checkbox className="chackbox"
            value="api"
            checked={api}
            onChange={handelOnChangeFeatures}
            {...label}
          />
          API
        </p>
        <p>
          <Checkbox className="chackbox"
            value="browser_extension"
            checked={browser}
            onChange={handelOnChangeFeatures}
            {...label}
          />
          Browser Extension
        </p>
        <p>

          <Checkbox className="chackbox"
            value="open_source"
            checked={source}
            onChange={handelOnChangeFeatures}
            {...label}
          />
          Open Source
        </p>
        <p>

          <Checkbox className="chackbox"
            value="discord_community"
            checked={discord}
            onChange={handelOnChangeFeatures}
            {...label}
          />
          Discord Community
        </p>
        <p>

          <Checkbox className="chackbox"
            value="no_signup_required"
            checked={signup}
            onChange={handelOnChangeFeatures}
            {...label}
          />
          No Signup Required
        </p>
      </div>

    </div>
  );
}