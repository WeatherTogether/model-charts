#!/bin/bash 

RUNDATE=`date +%y%m%d`
RUNHOUR=`date +%H`
DAYOFYEAR=`date +%j`


#CITY="Seattle-Tacoma Int'\''l Airport"
ICAO="KSEA"
STATE="WA"
COUNTRY="USA"
LATITUDE="47.45"
LONGITUDE="-122.31"

#*KSEA is 47.45, -122.31
#*KPDX is 45.59, -122.60
#*KTTD is 45.55, -122.40
#*KHIO is 45.54, -122.95
#*KDLS is 45.62, -121.17

LEVEL="850"
TEMPMIN="-30"
TEMPMAX="30"
PRECIPMIN="0"
PRECIPMAX="2.0000001"

#put each string for city name on a separate line
CITY1="Seattle-Tacoma"
CITY2="Int'\''l"
CITY3="Airport"
CITY4=""
CITY5=""
CITY6=""

newhour=$(echo $RUNHOUR | sed 's/^0*//')

if [ "$newhour" -lt 1 ];
then
runhour=`expr $newhour + 22`
else
runhour=`expr $newhour - 2`  
fi

length=${#runhour}
echo $length

if [ "$length" -eq 1 ]
then
runhour=0"$runhour"
fi

echo $RUNDATE
echo $runhour

/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/leveltemp.gs $RUNDATE $runhour $DAYOFYEAR $ICAO $STATE $COUNTRY $LATITUDE $LONGITUDE $LEVEL $TEMPMIN $TEMPMAX $PRECIPMIN $PRECIPMAX $CITY1 $CITY2 $CITY3 $CITY4 $CITY5 $CITY6"

export leveltemprundate=$RUNDATE
export leveltemprunhour=$runhour
export leveltempicao=$ICAO
export leveltemplevel=$LEVEL

# example call: (. /home/mint/opengrads/Contents/bashscripts/leveltemp.sh && sh /home/mint/opengrads/Contents/bashscripts/leveltemp_ftp.sh)

