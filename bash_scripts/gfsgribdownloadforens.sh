#!/bin/bash

#set variables
INIT_INTDATE=`date +%Y%m%d`
INIT_STRINGDATE=`date +%d%^b%Y`
INITHOUR=$1
RUNDATE=${INIT_INTDATE}${INITHOUR}
FORECASTHOUR="000" #hour used in grib URL
h=0 #hour used as a counter in while loop

LEFTLON="0"
RIGHTLON="360"
TOPLAT="90"
BOTTOMLAT="-90"
MODEL="GFS_0.25_DEGREE"
MODELFORTITLE="GFS" #model displayed in title for grads plot

BIGGRIB="/home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGGRIBFORENS" #useful for meteograms, total precip, etc. (any instance you need more than one time frame)
BIGGRIBEXT="/home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGGRIBEXTFORENS"
BIGCTL="/home/mint/opengrads/Contents/controlfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGCTLFORENS.ctl"
BIGCTLEXT="/home/mint/opengrads/Contents/controlfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGCTLEXTFORENS.ctl"

#define end date of model
d="`echo $RUNDATE | cut -c1-8` `echo $RUNDATE | cut -c9-10`"
ENDDATE=`date --date="$d +384 hours" "+%Y%m%d%H"`

#define url for first grib file of run
URL="http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t${INITHOUR}z.pgrb2.0p25.f${FORECASTHOUR}&lev_850_mb=on&lev_surface=on&var_APCP=on&var_TMP=on&leftlon=${LEFTLON}&rightlon=${RIGHTLON}&toplat=${TOPLAT}&bottomlat=${BOTTOMLAT}&dir=%2Fgfs.${INIT_INTDATE}${INITHOUR}"

cd /home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}

### BEGIN WHILE LOOP

#this downloads grib2 files from the gfs operational and concatenates them into a larger grib file, then makes control files. These control files are passed to grads and plotted on the GEFS ensemble meteogram charts as the "GFS operational."

while [ ${RUNDATE} -le $ENDDATE ] ;do

    #check to see if grib file exists
    if [[ `wget -S --spider $URL  2>&1 | grep 'HTTP/1.1 200 OK'` ]]; then       

        #define locations for grib and ctl files
        GRIBFILE="/home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/${INIT_INTDATE}${INITHOUR}_${FORECASTHOUR}"
        CTLFILE="/home/mint/opengrads/Contents/controlfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/${INIT_INTDATE}${INITHOUR}_${FORECASTHOUR}.ctl"

        #download grib file
        wget -O $GRIBFILE $URL    

        #MAKE BIGGRIB AND BIGGRIBEXT FILES
        if [ ${FORECASTHOUR} -le 240 ] ; then
            cat ${GRIBFILE} >> ${BIGGRIB}
        fi

        if [ ${FORECASTHOUR} -ge 240 ] ; then
            cat ${GRIBFILE} >> ${BIGGRIBEXT}
        fi

        #remove gribfile
        rm ${GRIBFILE} -rf

        ### REDEFINE VARIABLES
        #CHANGE RUNDATE
        d="`echo $RUNDATE | cut -c1-8` `echo $RUNDATE | cut -c9-10`"
        if [ ${h} -ge 240 ] ; then
            RUNDATE=`date --date="$d +12 hours" "+%Y%m%d%H"`
        fi        
        if [ ${h} -lt 240 ] ; then
            RUNDATE=`date --date="$d +3 hours" "+%Y%m%d%H"`
        fi      

        #CHANGE h
        if [ $h -ge 240 ] ; then
            h=$((${h}+12))
        fi
        if [ $h -lt 240 ] ; then
            h=$((${h}+3))
        fi

        #CHANGE FORECASTHOUR
        if [ $h -le 9 ] ; then 
            FORECASTHOUR="00"${h}
        fi
        if [ $h -ge 10 ] && [ $h -le 99 ] ; then
            FORECASTHOUR="0"${h}
        fi
        if [ $h -ge 100 ] ; then
            FORECASTHOUR=${h}
        fi

        #CHANGE URL
        URL="http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t${INITHOUR}z.pgrb2.0p25.f${FORECASTHOUR}&lev_850_mb=on&lev_surface=on&var_APCP=on&var_TMP=on&leftlon=${LEFTLON}&rightlon=${RIGHTLON}&toplat=${TOPLAT}&bottomlat=${BOTTOMLAT}&dir=%2Fgfs.${INIT_INTDATE}${INITHOUR}"
    else
	    echo "Url : $URL doesn't exist.."
        sleep 60
    fi
done

#Convert BIGGRIB to BIGCTL afterwards (for Meteograms, etc.)
/home/mint/opengrads/Contents/g2ctl $BIGGRIB > $BIGCTL
/home/mint/opengrads/Contents/gribmap -i $BIGCTL
/home/mint/opengrads/Contents/g2ctl $BIGGRIBEXT > $BIGCTLEXT
/home/mint/opengrads/Contents/gribmap -i $BIGCTLEXT
