#!/bin/bash 

RUNDATE=`date +%y%m%d`
RUNHOUR=`date +%H`

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

/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/conus2mtemp.gs $RUNDATE $runhour"
/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/Contents/plotscripts/conus2mtemp_ext.gs $RUNDATE $runhour"


export conus2mtemprundate=$RUNDATE
export conus2mtemprunhour=$runhour

# example call: (. /home/mint/opengrads/Contents/bashscripts/conus2mtemp.sh && sh /home/mint/opengrads/Contents/bashscripts/conus2mtemp_ftp.sh)


