
*This script generates a time series at a lat/lon point of the temperature at a specified level and the 6-hour precip from the GFS ensemble.


*Basic commands to clear everything, set background white, turn off timestamp/grads.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 1 10 1 7.5'


*open file (be sure to change it to the model you want to open!)
*GFS ensembles
'sdfopen  http://nomads.ncep.noaa.gov:9090/dods/gens/gens20170313/gep_all_00z'
*GFS high resolution operational
'sdfopen http://nomads.ncep.noaa.gov:80/dods/gfs_0p25/gfs20170313/gfs_0p25_00z'

* *** SET YOUR VARIABLES!!! :)

*Model info
run = 00z
date = 13Mar2017
model = GFS

*location
city = Portland
state = OR
latitude = 45.59
longitude = 237.41

*KPDX is 45.59, 237.41
*KTTD is 45.55, 237.60
*KHIO is 45.54, 237.05

*level (hPa)
level = 850

*Precipitation y-axis range (inches)
precipmin=0
precipmax=2

*Temperature y-axis range (Celsius)
tempmin=-20
tempmax=20

*ensemble time range (each step is 6 hours, model has 65 steps). Numbers must be >=1 and <=65.
tmin = 1
tmax= 65


* Done with variable setting, begin script commands

'set lat 'latitude
'set lon 'longitude

*set time
'set t 'tmin%' '%tmax


* *** TEMPERATURE

*set level for Temperature
'set lev 'level

*set range for y-axis
'set vrange 'tempmin%' '%tempmax

*change to first file opened with sdfopen
'set dfile 1'

*plot ensembles
ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 2'
 'set cthick 1'
 'set csmooth on'
 'set e 'ens
 'd (tmpprs-273.15)'
endwhile


*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 10'
'd (tmpprs-273.15)'

*Plot high-resolution operational
'set dfile 2'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 10'
'd (tmpprs-273.15)'

*Plot ensemble mean
'set dfile 1'
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave((tmpprs-273.15),e=1,e=21)'
*END TEMP


* *** PRECIPITATION ***


*Set axis range, put labels on right side, set grid off
'set vrange 'precipmin%' '%precipmax
'set ylpos 0 r'
'set grid off'

*change to first file opened with sdfopen
'set dfile 1'

*plot ensembles
'define precip=0'
ens=0;while(ens<21);ens=ens+1
 'set gxout line'
 'set cmark 0'
 'set ccolor 3'
 'set cthick 1'
 'set csmooth on'
 'set e 'ens
 'd apcpsfc/25.4'
endwhile

*plot control
'set e 1'
'set gxout line'
'set cmark 0'
'set ccolor 1' 
'set cthick 10'
'd apcpsfc/25.4'

*Plot high-resolution operational
'set dfile 2'
'set gxout line'
'set cmark 0'
'set ccolor 14' 
'set cthick 10'
'd apcpsfc/25.4'

*Plot ensemble mean
'set dfile 1'
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave(apcpsfc/25.4,e=1,e=21)'


*END PRECIP

*Draw titles and strings

'set strsiz 0.12' 
'set string 1 bl 5 0'
'draw string 1.05 7.9 '%city''","' '%state' '%level' '"hPa Temperature (`ao`nC)" 
'draw string 1.05 7.6 6-hour Precipitation (inches)' 

'set strsiz .1'
'draw string 5.5 8 Control = black'
'set string 4'
'draw string 5.5 7.8 Ens. mean = blue' 
'set string 14'
'draw string 5.5 7.6 Operational = purple'

'set strsiz .11'
'set string 1 br'
'draw string 9.95 7.9 '"Model: "''run%' '%date' '%model
 
'set strsiz .12'
'set string 11 br' 
'draw string 9.95 7.6 weathertogether.us'

'set strsiz 0.15' 
'set string 1 c 3 -90' 
'draw string .5 4.25 'level%' hPa Temperature (`ao`nC)'

'set strsiz 0.15' 
'set string 1 c 3 -90' 
'draw string 10.5 4.25 6-hour Precipitation (inches)'

*draw box (not quite working right now)

*'set strsiz 0.1' 
*'set string 0 '
*'draw recf 8 6.9 10 7.5'
*'set string 0 bl 3 0'
*'draw string 8.1 7.3 Control = Black'
*'set string 4'
*'draw string 8.1 7.1 Ensemble Mean = Blue'


*print to leveltemp.png in current directory

'gxprint leveltemp.png x1024 y768'
