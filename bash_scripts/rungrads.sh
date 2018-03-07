#!/bin/bash

#$1=script
#$2=stringdate
#$3=intdate
#$4=inithour
#$5=region
#$6=forecasthour
#$7=h
#$8=model
#$9=modelfortitle
#$10=dayofyear (or 6th hour of year in some cases)

f=${1}
filename=${f::-3}
echo ${filename}

/home/mint/opengrads/Contents/opengrads -lbc "run /home/mint/opengrads/myscripts/${1} $2 $3 $4 $5 $6 $7 $8 $9 ${filename} ${10}"

 



