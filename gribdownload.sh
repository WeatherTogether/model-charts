#!/bin/bash

#$1=URL
#$2=GRIBFILE
#$3=CTLFILE
#$4=MODEL
#$5=INIT_INTDATE
#$6=INITHOUR
#$7=FORECASTHOUR

wget -O $2 $1 

#use g2ctl to make control file
/home/mint/opengrads/Contents/g2ctl $2 > $3

#use gribmap to make index file
/home/mint/opengrads/Contents/gribmap -i $3
echo "gribdownload.sh"

#Concatenate Precipitation Files
if [ "${2}" == "/home/mint/gribfiles/${4}/${5}${6}/surface_APCP_${7}" ] ; then
    if [ ${7} -gt 240 ] ; then
         cat /home/mint/gribfiles/${4}/${5}${6}/surface_APCP_${7} >> /home/mint/gribfiles/${4}/${5}${6}/BIGGRIB_EXT_surface_APCP
        #use g2ctl to make control file
        /home/mint/opengrads/Contents/g2ctl /home/mint/gribfiles/${4}/${5}${6}/BIGGRIB_EXT_surface_APCP > /home/mint/controlfiles/${4}/${5}${6}/BIGGRIB_EXT_surface_APCP.ctl
        #use gribmap to make index file
        /home/mint/opengrads/Contents/gribmap -i /home/mint/controlfiles/${4}/${5}${6}/BIGGRIB_EXT_surface_APCP.ctl
    else
        cat /home/mint/gribfiles/${4}/${5}${6}/surface_APCP_${7} >> /home/mint/gribfiles/${4}/${5}${6}/BIGGRIB_surface_APCP
        #use g2ctl to make control file
        /home/mint/opengrads/Contents/g2ctl /home/mint/gribfiles/${4}/${5}${6}/BIGGRIB_surface_APCP > /home/mint/controlfiles/${4}/${5}${6}/BIGGRIB_surface_APCP.ctl
        #use gribmap to make index file
        /home/mint/opengrads/Contents/gribmap -i /home/mint/controlfiles/${4}/${5}${6}/BIGGRIB_surface_APCP.ctl
    fi
fi
    
