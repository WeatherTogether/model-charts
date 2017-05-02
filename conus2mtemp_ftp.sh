#!/bin/bash

echo "conus2mtemprundate="$conus2mtemprundate
echo "conus2mtemprunhour="$conus2mtemprunhour

HOST="ftp.weathertogether.us"
USER="weathfc0"
PASSWD="Cumulonimbus127!.us"
LOCALPATH=grads_pics/conus/slp10mwind/"$conus2mtemprunhour"z
DIR=public_html/models/gfs/20$conus2mtemprundate/"$conus2mtemprunhour"z


ftp -np $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
prompt
cd $DIR
lcd $LOCALPATH
binary
mput * 
quit
END_SCRIPT
exit 0

