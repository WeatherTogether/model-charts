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
TOPLAT="60"
BOTTOMLAT="30"
REGION="Pacific_Northwest"
MODEL="GFS_0.25_DEGREE"
MODELFORTITLE="GFS" #model displayed in title for grads plot

#define end date of model
d="`echo $RUNDATE | cut -c1-8` `echo $RUNDATE | cut -c9-10`"
ENDDATE=`date --date="$d +16 days" "+%Y%m%d%H"`

#define url for first grib file of run
URL="http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t${INITHOUR}z.pgrb2.0p25.f${FORECASTHOUR}&lev_1000_mb=on&lev_10_m_above_ground=on&lev_2_m_above_ground=on&lev_500_mb=on&lev_700_mb=on&lev_850_mb=on&lev_925_mb=on&lev_entire_atmosphere_%5C%28considered_as_a_single_layer%5C%29=on&lev_mean_sea_level=on&lev_surface=on&var_ABSV=on&var_APCP=on&var_CAPE=on&var_CRAIN=on&var_CSNOW=on&var_DPT=on&var_HGT=on&var_PRES=on&var_PRMSL=on&var_PWAT=on&var_TMP=on&var_UGRD=on&var_VGRD=on&leftlon=${LEFTLON}&rightlon=${RIGHTLON}&toplat=${TOPLAT}&bottomlat=${BOTTOMLAT}&dir=%2Fgfs.${INIT_INTDATE}${INITHOUR}"

cd /home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}

### BEGIN WHILE LOOP

#while the date of the current chart is less than or equal to the date of the last chart for this model run, check to see if the grib file exists. If it does exist, download it, make control and index files, run grads script to make image output, send image output to server via ftp, then define the new forecast hour/rundate and increment it accordingly. If the grib file does not exist, wait 60 seconds and run through the loop again.

while [ ${RUNDATE} -le $ENDDATE ] ;do

#check to see if grib file exists
if wget $URL >/dev/null 2>&1 ; then

#define locations for grib and ctl files
GRIBFILE="/home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/${INIT_INTDATE}${INITHOUR}_${FORECASTHOUR}"
CTLFILE="/home/mint/opengrads/Contents/controlfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/${INIT_INTDATE}${INITHOUR}_${FORECASTHOUR}.ctl"

#download grib file
wget -O $GRIBFILE $URL

#use g2ctl to make control file
/home/mint/opengrads/Contents/g2ctl $GRIBFILE > $CTLFILE

#use gribmap to make index file
/home/mint/opengrads/Contents/gribmap -i $CTLFILE

### RUN GRADS SCRIPTS/FTP SCRIPTS

## REGION: PACIFIC NORTHWEST

# 500 HPA HEIGHTS/ABSOLUTE VORTICITY
#define filename
FILENAME="PNW_500hpavort_${FORECASTHOUR}hrfcst.png" 
#run grads script
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/pnw500hpavort.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $h $MODEL $MODELFORTITLE 500"
#run ftp script
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

# 2-METER TEMP, SLP, 1000-500 HPA THICKNESS
FILENAME="PNW_2mtemp_${FORECASTHOUR}hrfcst.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/pnw2mtemp.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $h $MODEL $MODELFORTITLE"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

# 2-METER DEWPOINT, SLP, 1000-500 HPA THICKNESS
FILENAME="PNW_2mdp_${FORECASTHOUR}hrfcst.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/pnw2mdp.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $h $MODEL $MODELFORTITLE"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL 

# PRECIPITABLE WATER, 500 HPA HEIGHTS
FILENAME="PNW_pwat_${FORECASTHOUR}hrfcst.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/pnwpwat.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $h $MODEL $MODELFORTITLE 500"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

# SURFACE-BASED CAPE
FILENAME="PNW_sfcCAPE_${FORECASTHOUR}hrfcst.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/pnwsfccape.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $h $MODEL $MODELFORTITLE"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

## REGION: CONUS

# 2-METER TEMP, SLP, 1000-500 HPA THICKNESS
FILENAME="CONUS_2mtemp_${FORECASTHOUR}hrfcst.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/conus2mtemp.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $h $MODEL $MODELFORTITLE"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL "CONUS"

## REGION: NE PACIFIC

# PRECIPITABLE WATER, 500 HPA HEIGHTS
FILENAME="NEPAC_pwat_${FORECASTHOUR}hrfcst.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/nepacpwat.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $h $MODEL $MODELFORTITLE 500"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL "NE_Pacific"


### REDEFINE VARIABLES

#CHANGE h
#increment by 3 hours
    if [ $h -lt 240 ] ; then
        h=$((${h}+3))
    fi
#  increment by 12 hours
    if [ $h -ge 240 ] ; then
        h=$((${h}+12))
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

#CHANGE RUNDATE
    d="`echo $RUNDATE | cut -c1-8` `echo $RUNDATE | cut -c9-10`"
    if [ ${h} -lt 240 ] ; then
        RUNDATE=`date --date="$d +3 hours" "+%Y%m%d%H"`
    fi
    if [ ${h} -ge 240 ] ; then
        RUNDATE=`date --date="$d +12 hours" "+%Y%m%d%H"`
    fi

#CHANGE URL
URL="http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t${INITHOUR}z.pgrb2.0p25.f${FORECASTHOUR}&lev_1000_mb=on&lev_10_m_above_ground=on&lev_2_m_above_ground=on&lev_500_mb=on&lev_700_mb=on&lev_850_mb=on&lev_925_mb=on&lev_entire_atmosphere_%5C%28considered_as_a_single_layer%5C%29=on&lev_mean_sea_level=on&lev_surface=on&var_ABSV=on&var_APCP=on&var_CAPE=on&var_CRAIN=on&var_CSNOW=on&var_DPT=on&var_HGT=on&var_PRES=on&var_PRMSL=on&var_PWAT=on&var_TMP=on&var_UGRD=on&var_VGRD=on&leftlon=${LEFTLON}&rightlon=${RIGHTLON}&toplat=${TOPLAT}&bottomlat=${BOTTOMLAT}&dir=%2Fgfs.${INIT_INTDATE}${INITHOUR}"

else
	echo "Url : $URL doesn't exist.."
    sleep 60
fi
done

# example call: sh /home/mint/opengrads/Contents/bashscripts/gribdownload.sh 12
