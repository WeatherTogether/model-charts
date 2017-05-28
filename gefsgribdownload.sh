#!/bin/bash 

CTLFILE="BLAH"
INIT_STRINGDATE=`date +%d%^b%Y`
INIT_INTDATE=`date +%Y%m%d`
INITHOUR=$1
MODEL="GFS_ENSEMBLE_1.00_DEGREE"
MODELFORTITLE="GEFS"
LEVEL=$2

DAYOFYEAR=`date +%j`

ICAO="KPDX"
FILENAME="${ICAO}_${LEVEL}hPaTemp.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempens.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 $ICAO Oregon USA 45.59 -122.60 -30 30 0 2.0000001 "" "" "" Portland Int'\''l Airport"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

ICAO="KSEA"
FILENAME="${ICAO}_${LEVEL}hPaTemp.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempens.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 $ICAO Washington USA 47.45 -122.31 -30 30 0 2.0000001 "" "" "" Seattle-Tacoma Int'\''l Airport"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

ICAO="KDLS"
FILENAME="${ICAO}_${LEVEL}hPaTemp.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempens.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 $ICAO Oregon USA 45.62 -121.17 -30 30 0 2.0000001 "" "" The Dalles Municipal Airport"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

ICAO="CYVR"
FILENAME="${ICAO}_${LEVEL}hPaTemp.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempens.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 $ICAO BC Canada 48.36 -122.66 -30 30 0 2.0000001 "" "" "" Vancouver Int'\''l Airport"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

ICAO="KTTD"
FILENAME="${ICAO}_${LEVEL}hPaTemp.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempens.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 $ICAO Oregon USA 45.55 -122.40 -30 30 0 2.0000001 "" "" "" "" Troutdale Airport"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

ICAO="KHIO"
FILENAME="${ICAO}_${LEVEL}hPaTemp.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempens.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 $ICAO Oregon USA 45.54 -122.95 -30 30 0 2.0000001 "" "" "" "" Hillsboro Airport"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

ICAO="CYVR"
FILENAME="${ICAO}_${LEVEL}hPaTemp.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempens.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 $ICAO BC Canada 48.36 -122.66 -30 30 0 2.0000001 "" "" "" Vancouver Int'\''l Airport"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL

ICAO="KNUW"
FILENAME="${ICAO}_${LEVEL}hPaTemp.png" 
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltempens.gs $CTLFILE $INIT_STRINGDATE $INIT_INTDATE $INITHOUR $FILENAME $MODEL $MODELFORTITLE $LEVEL $DAYOFYEAR 16 $ICAO Washington USA 48.36 -122.66 -30 30 0 2.0000001 "" Whidbey Island Naval Air Station"
sh /home/mint/opengrads/Contents/bashscripts/ftpsample.sh $INIT_INTDATE $INITHOUR $FILENAME $MODEL



# example call: (. /home/mint/opengrads/Contents/bashscripts/gefsgribdownload.sh 
