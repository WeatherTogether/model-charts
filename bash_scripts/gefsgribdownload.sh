#!/bin/bash

#set variables
INIT_INTDATE=`date +%Y%m%d`
INIT_STRINGDATE=`date +%d%^b%Y`
INITHOUR=$1
RUNDATE=${INIT_INTDATE}${INITHOUR}
FORECASTHOUR="00" #hour used in grib URL
DAYOFYEAR=$(date +%j)
h=0 #hour used as a counter in while loop
j=0 #used specifically for cities in for loop because the city array has them in groups of 6

LEFTLON="0"
RIGHTLON="360"
TOPLAT="90"
BOTTOMLAT="-90"
MODEL="GFS_ENSEMBLE_1.00_DEGREE"
MODELFORTITLE="GEFS" #model displayed in title for grads plot
LEVEL="850"
UPLOADURL="http://weathertogether.net/models/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/"

BIGGRIB="/home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGGRIB"
BIGCTL="/home/mint/opengrads/Contents/controlfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGCTL.ctl"

#define end date of model
d="`echo $RUNDATE | cut -c1-8` `echo $RUNDATE | cut -c9-10`"
ENDDATE=`date --date="$d +384 hours" "+%Y%m%d%H"`

#define url for first grib file of run
URL="http://nomads.ncep.noaa.gov/cgi-bin/filter_gens.pl?file=gec00.t${INITHOUR}z.pgrb2f384&lev_850_mb=on&lev_surface=on&var_APCP=on&var_TMP=on&leftlon=${LEFTLON}&rightlon=${RIGHTLON}&toplat=${TOPLAT}&bottomlat=${BOTTOMLAT}&dir=%2Fgefs.${INIT_INTDATE}%2F${INITHOUR}%2Fpgrb2"

#declare arrays
declare -a ENSEMBLES=("gec00" "gep01" "gep02" "gep03" "gep04" "gep05" "gep06" "gep07" "gep08" "gep09" "gep10" "gep11" "gep12" "gep13" "gep14" "gep15" "gep16" "gep17" "gep18" "gep19" "gep20")
declare -a ICAO=("KPDX" "KDLS" "KTTD" "KHIO" "KSEA" "KNUW" "CYVR")
declare -a LATITUDE=("45.59" "45.62" "45.55" "45.54" "47.45" "48.35" "49.20")
declare -a LONGITUDE=("-122.60" "-121.17" "-122.40" "-122.95" "-122.31" "-122.66" "-123.18")
declare -a STATE=("Oregon" "Oregon" "Oregon" "Oregon" "Washington" "Washington" "BC")
declare -a COUNTRY=("USA" "USA" "USA" "USA" "USA" "USA" "Canada")
declare -a CITY=("" "" "" "Portland Int'\''l" "Airport" "" "" "The" "Dalles" "Municipal" "Airport" "" "" "" "" "Troutdale" "Airport" "" "" "" "" "Hillsboro" "Airport" "" "" "" "Seattle-Tacoma" "Int'\''l" "Airport" "" "Whidbey" "Island" "Naval" "Air" "Station" "" "" "" "Vancouver Int'\''l" "Airport")

cd /home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}

### BEGIN WHILE LOOP

#while the date of the current chart is less than or equal to the date of the last chart for this model run, check to see if the grib file exists. If it does exist, download it, make control and index files, run grads script to make image output, send image output to server via scp, then define the new forecast hour/rundate and increment it accordingly. If the grib file does not exist, wait 60 seconds and run through the loop again.

while [ ${RUNDATE} -lt $ENDDATE ] ;do

#check to see if grib file exists
if [[ `wget -S --spider $URL  2>&1 | grep 'HTTP/1.1 200 OK'` ]]; then 

    #download ensembles
    for ((i=0;i<${#ENSEMBLES[@]};i++)); do
        for ((h=0;h<=384;h=h+6)); do
            if [ $h -le 9 ] ; then 
                FORECASTHOUR="0"${h}
            else
                FORECASTHOUR=${h}
            fi
            GRIBFILE="/home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/${INIT_INTDATE}${INITHOUR}_${ENSEMBLES[i]}_${FORECASTHOUR}"
            URL="http://nomads.ncep.noaa.gov/cgi-bin/filter_gens.pl?file=${ENSEMBLES[i]}.t${INITHOUR}z.pgrb2f${FORECASTHOUR}&lev_850_mb=on&lev_surface=on&var_APCP=on&var_TMP=on&leftlon=${LEFTLON}&rightlon=${RIGHTLON}&toplat=${TOPLAT}&bottomlat=${BOTTOMLAT}&dir=%2Fgefs.${INIT_INTDATE}%2F${INITHOUR}%2Fpgrb2"
            wget -O ${GRIBFILE} ${URL}
            cat ${GRIBFILE} >> /home/mint/opengrads/Contents/gribfiles/${MODEL}/${INIT_INTDATE}${INITHOUR}/BIGGRIB
            rm ${GRIBFILE} -rf
        done
    done
    RUNDATE=${ENDDATE}
    #use g2ctl to make control file
    /home/mint/opengrads/Contents/g2ctl $BIGGRIB > $BIGCTL

    #use gribmap to make index file
    /home/mint/opengrads/Contents/gribmap -i $BIGCTL

    #define BIGCTL from GFS operational
    GFSBIGCTL="/home/mint/opengrads/Contents/controlfiles/GFS_0.25_DEGREE/${INIT_INTDATE}${INITHOUR}/BIGCTLFORENS.ctl"
    GFSBIGCTLEXT="/home/mint/opengrads/Contents/controlfiles/GFS_0.25_DEGREE/${INIT_INTDATE}${INITHOUR}/BIGCTLEXTFORENS.ctl"

    ### RUN GRADS SCRIPTS/FTP SCRIPTS

    for ((i=0;i<${#ICAO[@]};i++)); do
        /home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempensnew.gs $BIGCTL $GFSBIGCTL $GFSBIGCTLEXT $INIT_INTDATE $INIT_STRINGDATE $INITHOUR ${ICAO[i]}_${LEVEL}hPaTemp.png $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 ${ICAO[i]} ${STATE[i]} ${COUNTRY[i]} ${LATITUDE[i]} ${LONGITUDE[i]} -30 30 0 2.0000001 ${CITY[j]} ${CITY[j+1]} ${CITY[j+2]} ${CITY[j+3]} ${CITY[j+4]} ${CITY[j+5]}"
        j=$j+6

        #find /home/mint/grads_pics/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/ -type f -name "${ICAO[i]}_850hPaTemp.png" -printf "${UPLOADURL//%/%%}"'%f\n' | cat - ~/${ICAO[i]}_850hPaTemp".txt" > temp && mv temp ~/${ICAO[i]}_850hPaTemp".txt"
        find /home/mint/grads_pics/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/ -type f -name "${ICAO[i]}_850hPaTemp.png" -printf "${UPLOADURL//%/%%}"'%f\n' >> ~/${ICAO[i]}_850hPaTemp".txt" 

        #sed -i.bak -e '5,10d;12d' /home/mint/grads_pics/${MODEL}/${ICAO[i]}_850hPaTemp".txt"
        sed -i.bak -e '1d' ~/${ICAO[i]}_850hPaTemp".txt"
    done

    scp -i ~/.ssh/id_rsa ~/grads_pics/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/*hPaTemp.png ~/*_850hPaTemp".txt" weathfc0@weathertogether.net:public_html/models/${MODEL}/${INIT_INTDATE}/${INITHOUR}z/ 

    scp -i ~/.ssh/id_rsa ~/*_850hPaTemp".txt" weathfc0@weathertogether.net:public_html/models/${MODEL}/latest/  

else
	echo "Url : $URL doesn't exist.."
    sleep 60
fi
done

