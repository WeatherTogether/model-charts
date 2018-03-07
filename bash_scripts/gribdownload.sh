#!/bin/bash

#$1=URL
#$2=GRIBFILE
#$3=CTLFILE

wget -O $2 $1 

#use g2ctl to make control file
/home/mint/opengrads/Contents/g2ctl $2 > $3

#use gribmap to make index file
/home/mint/opengrads/Contents/gribmap -i $3


