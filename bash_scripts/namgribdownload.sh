#!/bin/bash

#set variables
INIT_INTDATE=`date +%Y%m%d`
INIT_STRINGDATE=`date +%d%^b%Y`
INITHOUR=$1
RUNDATE=${INIT_INTDATE}${INITHOUR}
FORECASTHOUR="00" #hour used in grib URL
h=0 #hour used as a counter in while loop

LEFTLON="0"
RIGHTLON="360"
TOPLAT="90"
BOTTOMLAT="-90"
MODEL="NAM_CONUS_12KM"
MODELFORTITLE="NAM" #model displayed in title for grads plot
UPLOADURL="http://weathertogether.net/models/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/"

BIGGRIB="/home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGGRIB" #useful for meteograms, total precip, etc. (any instance you need more than one time frame)
BIGCTL="/home/mint/opengrads/Contents/controlfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGCTL.ctl"

#define end date of model
d="`echo $RUNDATE | cut -c1-8` `echo $RUNDATE | cut -c9-10`"
ENDDATE=`date --date="$d +84 hours" "+%Y%m%d%H"`

#define url for first grib file of run
URL="http://nomads.ncep.noaa.gov/cgi-bin/filter_nam.pl?file=nam.t${INITHOUR}z.awphys${FORECASTHOUR}.tm00.grib2&lev_1000_mb=on&lev_10_m_above_ground=on&lev_2_m_above_ground=on&lev_300_mb=on&lev_500_mb=on&lev_700_mb=on&lev_850_mb=on&lev_925_mb=on&lev_entire_atmosphere_%5C%28considered_as_a_single_layer%5C%29=on&lev_mean_sea_level=on&lev_surface=on&var_ABSV=on&var_APCP=on&var_CAPE=on&var_CRAIN=on&var_CSNOW=on&var_DPT=on&var_HGT=on&var_PRES=on&var_PRMSL=on&var_PWAT=on&var_TMP=on&var_UGRD=on&var_VGRD=on&leftlon=${LEFTLON}&rightlon=${RIGHTLON}&toplat=${TOPLAT}&bottomlat=${BOTTOMLAT}&dir=%2Fnam.${INIT_INTDATE}"

#declare arrays
declare -a SCRIPTS=("pnw500hpavort.gs" "pnw2mtemp.gs" "pnw2mdp.gs" "pnwpwat.gs" "pnwsfccape.gs" "pnw10mwind.gs" "conus10mwind.gs" "conus2mtemp.gs" "conuslevelvort.gs" "conuspwat.gs" "conussfccape.gs" "conus2mdp.gs")
declare -a FILENAMES=("PNW_500hpavort_" "PNW_2mtemp_" "PNW_2mdp_" "PNW_pwat_" "PNW_sfcCAPE_" "PNW_10mwind_" "CONUS_10mwind_" "CONUS_2mtemp_" "CONUS_500hpavort_" "CONUS_pwat_" "CONUS_sfcCAPE_" "CONUS_2mdp_")

cd /home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}

### BEGIN WHILE LOOP

#while the date of the current chart is less than or equal to the date of the last chart for this model run, check to see if the grib file exists. If it does exist, download it, make control and index files, run grads script to make image output, send image output to server via scp, then define the new forecast hour/rundate and increment it accordingly. If the grib file does not exist, wait 60 seconds and run through the loop again.

while [ ${RUNDATE} -le $ENDDATE ] ;do

 #check to see if grib file exists
    if [[ `wget -S --spider $URL  2>&1 | grep 'HTTP/1.1 200 OK'` ]]; then 
        
        #define locations for grib and ctl files
        GRIBFILE="/home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/${INIT_INTDATE}${INITHOUR}_${FORECASTHOUR}"
        CTLFILE="/home/mint/opengrads/Contents/controlfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/${INIT_INTDATE}${INITHOUR}_${FORECASTHOUR}.ctl"

        #download grib file
        wget -O $GRIBFILE $URL

        #use g2ctl to make control file
        /home/mint/opengrads/Contents/g2ctl $GRIBFILE > $CTLFILE

        #use gribmap to make index file
        /home/mint/opengrads/Contents/gribmap -i $CTLFILE

        ### RUN GRADS SCRIPTS
        for ((i=0;i<${#SCRIPTS[@]};i++)); do
            #run grads script
            /home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/${SCRIPTS[i]} $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR ${FILENAMES[i]}${FORECASTHOUR}hrfcst.png $h $MODEL $MODELFORTITLE 500"
            #create list of filenames for model chart
            find /home/mint/grads_pics/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/ -type f -name "${FILENAMES[i]}${FORECASTHOUR}hrfcst.png" -printf "${UPLOADURL//%/%%}"'%f\n' >> /home/mint/grads_pics/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/${FILENAMES[i]}".txt"   
        done

        scp -i ~/.ssh/id_rsa ~/grads_pics/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/*${FORECASTHOUR}hrfcst.png ~/grads_pics/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/*.txt weathfc0@weathertogether.net:public_html/models/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/   

        scp -i ~/.ssh/id_rsa ~/grads_pics/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/*.txt weathfc0@weathertogether.net:public_html/models/${MODEL}/latest/${INITHOUR}z/      
            
        ### REDEFINE VARIABLES

        #CHANGE RUNDATE
        d="`echo $RUNDATE | cut -c1-8` `echo $RUNDATE | cut -c9-10`"
        if [ ${h} -ge 24 ] ; then
            RUNDATE=`date --date="$d +3 hours" "+%Y%m%d%H"`
        fi
        if [ ${h} -lt 24 ] ; then
            RUNDATE=`date --date="$d +1 hours" "+%Y%m%d%H"`
        fi

        #CHANGE h
        #increment by 3 hours
        if [ $h -ge 24 ] ; then
            h=$((${h}+3))
        fi
        if [ $h -lt 24 ] ; then
            h=$((${h}+1))
        fi

        #CHANGE FORECASTHOUR
        if [ $h -le 9 ] ; then 
            FORECASTHOUR="0"${h}
        fi
        if [ $h -ge 10 ] ; then
            FORECASTHOUR=""${h}
        fi

        #CHANGE URL
        URL="http://nomads.ncep.noaa.gov/cgi-bin/filter_nam.pl?file=nam.t${INITHOUR}z.awphys${FORECASTHOUR}.tm00.grib2&lev_1000_mb=on&lev_10_m_above_ground=on&lev_2_m_above_ground=on&lev_300_mb=on&lev_500_mb=on&lev_700_mb=on&lev_850_mb=on&lev_925_mb=on&lev_entire_atmosphere_%5C%28considered_as_a_single_layer%5C%29=on&lev_mean_sea_level=on&lev_surface=on&var_ABSV=on&var_APCP=on&var_CAPE=on&var_CRAIN=on&var_CSNOW=on&var_DPT=on&var_HGT=on&var_PRES=on&var_PRMSL=on&var_PWAT=on&var_TMP=on&var_UGRD=on&var_VGRD=on&leftlon=${LEFTLON}&rightlon=${RIGHTLON}&toplat=${TOPLAT}&bottomlat=${BOTTOMLAT}&dir=%2Fnam.${INIT_INTDATE}"

    else
	    echo "Url : $URL doesn't exist.."
        sleep 60
    fi
done
