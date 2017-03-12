
*This script generates a time series at a lat/lon point of the temperature at a specified level and the 6-hour precip from the GFS ensemble.

*To do: add climotologies!

*Basic commands to clear everything, set background white, turn off timestamp/grads.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 1 10 1 7.5'


*open file (be sure to change it to the model you want to open!)
'sdfopen  http://nomads.ncep.noaa.gov:9090/dods/gens/gens20170312/gep_all_00z'

* *** SET YOUR VARIABLES!!! :)

*Model info
run = 00z
date = 12Mar2017
model = GEFS

*location
city = Seattle
state = WA
latitude = 47.60
longitude = 237.67

*Portland is 45.52, 237.32

*level (hPa)
level = 850

*time range (each step is 6 hours, model has 65 steps)
tmin = 1
tmax= 65

*Precipitation y-axis range (inches)
precipmin=0
precipmax=1.5

*Temperature y-axis range (Celsius)
tempmin=-25
tempmax=25




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

*Plot ensemble mean
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave((tmpprs-273.15),e=1,e=21)'

'set strsiz 0.15' 
'set string 1 c 3 -90' 
'draw string .5 4.25 'level%' hPa Temperature (`ao`nC)'

*END TEMP



* *** PRECIPITATION ***

*Set axis range, put labels on right side, set grid off
'set vrange 'precipmin%' '%precipmax
'set ylpos 0 r'
'set grid off'

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

*Plot ensemble mean
'set cmark 0'
'set ccolor 4' 
'set cthick 12'
'd ave(apcpsfc/25.4,e=1,e=21)'




*END PRECIP

*Draw titles and strings

'set strsiz 0.1' 
'set string 1 bl 5 0'
'draw string 1.05 7.9 '%city''","' '%state' '%level' '"hPa Temperature (`ao`nC)" 
'draw string 1.05 7.6 6-hour Precipitation (inches)' 
'draw string 5 7.9 Control = black'
'set string 4'
'draw string 5 7.6 Ens. mean = blue' 
'set string 1'
'draw string 8 7.9 'run%' '%date' '%model   
'draw string 8 7.6 weathertogether.us'

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
