*This script plots the total precipitation from the GFS over a polar stereographic
*projection of the NE Pacific. It then saves the output to a .png file named total-precip-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*Basic commands to clear everything, make background white, turn off timestamp, and fix display area.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 0.3 10.3 0.15 7.5'

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170319/gfs_0p25_12z'
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_1p00/gfs20170319/gfs_1p00_12z'

* *** SET YOUR VARIABLES!!! :)

*Model info
run = 12Z
day = Sun
date = 19Mar2017
model = GFS

*frame (goes from 1-81 in 3-hour intervals, hours=(frame-1)*3)
frame=81

*Forecast time (format: __Z day, DDMonYYYY)
forecasttime="12Z Wed, 29Mar2017"

*Set spatial domain for Grads to retrieve data from
'set lat 18 70'
'set lon -190 -80'

*Set map projection 
'set mpvals -160 -110 23 65'
'set mproj nps'

*style map
'set mpdset mres'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 1'
'set grid on 5 1 1'

*Plot total precip with with colormaps and xcbar scripts
'set dfile 1'
'set gxout shaded'
'colormaps -map s3pcpn -custom 0 .01 .05 .1 .2 .3 .4 .5 .75 1 1.25 1.5 1.75 2 2.5 3 3.5 4 4.5 5 6 7 8 9 10 12 14 16 18 20' 
'define totalprecip =  sum(apcpsfc/25.4,t=1,t=81,2)'
*'set dfile 2'
*'define totalprecip2 = sum(apcpsfc/25.4,t=22,t=33)'
*'define finalprecip = totalprecip+totalprecip2'
'd totalprecip'
'xcbar.gs -line on -edge circle -direction v 9.8 10 .15 7.5'
*'define totalprecip = sum(apcpsfc,t=1,t=81,2)'

*Set hours variable
hours = (frame-1)*3
            
*Draw shapefiles
'set line 1 1 1'
'draw shp Shapefiles/PROVINCE.shp'
'draw shp Shapefiles/mexstates.shp'

*draw titles and strings for map!
'set strsiz .12'
'draw string .85 7.7 '"Total Precip from "''run%' '%day''","' '%date' '"to"' '%forecasttime 
'set string 4 br'
'set strsiz .12'
'draw string 9.75 8.3 '"Model: "''run%' '%date' '%model
'draw string 9.75 8.1 '"Valid: "''%forecasttime
'draw string 9.75 7.9 '%hours' '"- hour forecast"
'set strsiz .13'
'set string 11 br'
'draw string 9.75 7.6 weathertogether.us'   

*Save output as .png file in current directory
'gxprint Total-Precip-NE-Pacific.png x1024 y768'
