#!/bin/bash

echo "leveltemprundate="$leveltemprundate
echo "leveltemprunhour="$leveltemprunhour
echo "leveltempicao="$leveltempicao
echo "leveltemplevel="$leveltemplevel

HOST="ftp.weathertogether.us"
USER="weathfc0"
PASSWD="Cumulonimbus127!.us"
LOCALPATH=grads_pics/spaghetti_plots/gefs/$leveltempicao
FILE="$leveltempicao"_"$leveltemplevel"temp_"$leveltemprunhour"zGEFS.png
DIR=public_html/models/plumes/gefs/20$leveltemprundate

ftp -np $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
binary
prompt
cd $DIR
lcd $LOCALPATH
put $FILE
quit
END_SCRIPT
exit 0
