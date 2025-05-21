import React from "react";
import { Grid, Typography } from "@mui/material";
import classes from "../../Landing/Landing.module.scss";

function SmartSolar() {
    return (
      <Grid container className={`${classes.smartSolarContainer}`}>
        <Grid container className={`${classes.smartSolarWrapper1}`} spacing={7}>
          {/* Section 1 */}
          <Grid item xs={12} sm={4} className={`${classes.smartSolarSection}`}>
          <Grid item className={`${classes.smartSolarSection}`}>
          <svg
              className={`${classes.smartSolarSvg}`}
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 47.5V12.5C5 11.1739 5.52678 9.90215 6.46447 8.96447C7.40215 8.02678 8.67392 7.5 10 7.5H50C51.3261 7.5 52.5979 8.02678 53.5355 8.96447C54.4732 9.90215 55 11.1739 55 12.5V47.5C55 48.8261 54.4732 50.0979 53.5355 51.0355C52.5979 51.9732 51.3261 52.5 50 52.5H10C8.67392 52.5 7.40215 51.9732 6.46447 51.0355C5.52678 50.0979 5 48.8261 5 47.5Z"
                stroke="white"
                stroke-width="3"
              />
              <path
                d="M5 17.5001H55M12.5 12.5251L12.525 12.4976M20 12.5251L20.025 12.4976M27.5 12.5251L27.525 12.4976M29.1675 27.5001L25 35.0001H35L30.8325 42.5001"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <Grid container direction="column" className={`${classes.smartSolarContent}`}>
              <Typography className={`${classes.smartSolarText1}`}>
                Smart Solar with no Hassle
              </Typography>
              <Typography className={`${classes.smartSolarText2}`}>
                Instant Access, No Rooftop Required!
              </Typography>
            </Grid>
            </Grid>
          </Grid>
  
          {/* Section 2 */}
          <Grid item xs={12} sm={4} className={`${classes.smartSolarSection}`}>
          <Grid item className={`${classes.smartSolarSection}`}>
          <svg
               className={`${classes.smartSolarSvg}`}
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 36.25V52.5C15 53.163 14.7366 53.7989 14.2678 54.2678C13.7989 54.7366 13.163 55 12.5 55H7.5C6.83696 55 6.20107 54.7366 5.73223 54.2678C5.26339 53.7989 5 53.163 5 52.5V36.25C5 35.587 5.26339 34.9511 5.73223 34.4822C6.20107 34.0134 6.83696 33.75 7.5 33.75H12.5C13.163 33.75 13.7989 34.0134 14.2678 34.4822C14.7366 34.9511 15 35.587 15 36.25ZM15 36.25H29.375C30.2038 36.25 30.9987 36.5792 31.5847 37.1653C32.1708 37.7513 32.5 38.5462 32.5 39.375C32.5 40.2038 32.1708 40.9987 31.5847 41.5847C30.9987 42.1708 30.2038 42.5 29.375 42.5H23.75"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M27.5 42.5H36.73C38.8545 42.4997 40.9236 41.8228 42.6375 40.5675L49.21 35.755C49.901 35.2202 50.7629 34.955 51.6351 35.0088C52.5072 35.0626 53.33 35.4318 53.95 36.0475C54.3005 36.3973 54.5745 36.8161 54.7546 37.2774C54.9347 37.7387 55.017 38.2323 54.9963 38.7271C54.9757 39.2218 54.8524 39.7069 54.6344 40.1515C54.4164 40.5962 54.1085 40.9907 53.73 41.31L42.7375 50.255C40.9541 51.7069 38.7247 52.4998 36.425 52.5H15M47.5 17.5C47.5 20.8152 46.183 23.9946 43.8388 26.3388C41.4946 28.683 38.3152 30 35 30C31.6848 30 28.5054 28.683 26.1612 26.3388C23.817 23.9946 22.5 20.8152 22.5 17.5C22.5 14.1848 23.817 11.0054 26.1612 8.66117C28.5054 6.31696 31.6848 5 35 5C38.3152 5 41.4946 6.31696 43.8388 8.66117C46.183 11.0054 47.5 14.1848 47.5 17.5Z"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M35.38 26L28.44 20.5V18.1H34.04C34.5333 18.1 34.96 18.0067 35.32 17.82C35.68 17.62 35.96 17.3467 36.16 17C36.36 16.6533 36.46 16.2533 36.46 15.8C36.46 15.3333 36.36 14.9333 36.16 14.6C35.96 14.2533 35.68 13.9867 35.32 13.8C34.96 13.6 34.5333 13.5 34.04 13.5H28.44V11.1H40.38V12.78H36.98L37.66 12.24C38.14 12.6533 38.5133 13.16 38.78 13.76C39.0467 14.3467 39.18 15.0267 39.18 15.8C39.18 16.7867 38.9533 17.6333 38.5 18.34C38.06 19.0333 37.4533 19.5667 36.68 19.94C35.9067 20.3133 35.0133 20.5 34 20.5H31.32L31.58 19.74L39.38 26H35.38ZM28.44 16.62V14.96H40.38V16.62H28.44Z"
                fill="white"
              />
            </svg>
            <Grid container direction="column" className={`${classes.smartSolarContent}`}>
              <Typography className={`${classes.smartSolarText1}`}>
               lorem4
              </Typography>
              <Typography className={`${classes.smartSolarText2}`}>
                20% more efficient than rooftop solar
              </Typography>
            </Grid>
            </Grid>
          </Grid>
  
          {/* Section 3 */}
          <Grid item xs={12} sm={4} className={`${classes.smartSolarSection}`}>
          <Grid item className={`${classes.smartSolarSection}`}>
          <svg
              className={`${classes.smartSolarSvg}`}
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 25V37.5C11.25 42.215 11.25 44.57 12.715 46.035C13.8925 47.215 15.65 47.445 18.75 47.49M48.75 25V37.5C48.75 42.215 48.75 44.57 47.285 46.035C46.1075 47.215 44.35 47.445 41.25 47.49M32.5 35L26.015 42.6675C25.2225 43.6925 24.8275 44.2075 25.0725 44.605C25.3175 45 26.03 45 27.4575 45H32.5425C33.9675 45 34.6825 45 34.9275 45.395C35.1725 45.7925 34.7775 46.305 33.985 47.3325L27.46 55M25 5L22.5 25M35 5L37.5 25M10 15H50M9.91502 14.495L11.4225 10.9925C12.675 8.085 13.3 6.63 14.5275 5.8175C15.755 5 17.3175 5 20.4425 5H39.5575C42.6825 5 44.245 5 45.4725 5.815C46.6975 6.63 47.325 8.085 48.5775 10.99L50.085 14.495C52.1275 19.235 53.1475 21.605 52.055 23.3025C50.9625 25 48.415 25 43.32 25H16.6775C11.585 25 9.03752 25 7.94502 23.3025C6.85252 21.605 7.87252 19.235 9.91502 14.495Z"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
  
            <Grid container direction="column" className={`${classes.smartSolarContent}`}>
              <Typography className={`${classes.smartSolarText1}`}>
                Activate Solar Power Now
              </Typography>
              <Typography className={`${classes.smartSolarText2}`}>
                Switch to Solar in Minutes, Not Months!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    );
  }
  
  export default SmartSolar;