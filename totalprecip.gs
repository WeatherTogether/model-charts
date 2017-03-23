*This script plots the total precipitation from the GFS over a polar stereographic
*projection of the NE Pacific. It then saves the output to a .png file named total-precip-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*Basic commands to clear everything, make background white, turn off timestamp, and fix display area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 0.3 10.3 0.15 7.5'

* *** SET YOUR VARIABLES!!! :)

*Model date
run = "12z"
day = "23"
month = "03"
year = "2017"

*frame (goes from 1-81 in 3-hour intervals, hours=(frame-1)*3)

endframe=6

*** End variables

*to do: calculate precip from startframe to endframe
*startframe=


*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'%year''%month''%day'/gfs_0p25_'%run

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
'define totalprecip =  sum(apcpsfc/25.4,t=3,t='endframe',2)'
*'set dfile 2'
*'define totalprecip2 = sum(apcpsfc/25.4,t=22,t=33)'
*'define finalprecip = totalprecip+totalprecip2'
'd totalprecip'
'xcbar.gs -line on -edge circle -direction v 9.8 10 .15 7.5'

*** End plotting

*Get time of startframe
*'set t '%startframe
*'q time'
*startutc=substr(result, 8, 3)
*startdate=substr(result, 11, 2)
*startmonth=substr(result, 13, 3)
*startyear=substr(result, 16, 4)
*startday=substr(result, 38, 3)

*Get time of endframe (same time as forecast)
'set t '%endframe
'q time'
forecastutc=substr(result, 24, 3)
forecastdate=substr(result, 27, 2)
forecastmonth=substr(result, 29, 3)
forecastyear=substr(result, 32, 4)
forecastday=substr(result, 45, 3)

*Get time of model run
'set t 1' 
'q time'
initutc=substr(result, 8, 3)
initdate=substr(result, 11, 2)
initmonth=substr(result, 13, 3)
inityear=substr(result, 16, 4)
initday=substr(result, 38, 3)

*Set hours of forecast and precipitation period
*preciphours = ((endframe-startframe)*3)
hours = (endframe-1)*3
            
*Draw shapefiles
'set line 1 1 1'
'draw shp Shapefiles/PROVINCE.shp'
'draw shp Shapefiles/mexstates.shp'

*draw titles and strings for map!
'set strsiz .145'
'draw string .85 7.68 '"Total Precip from"' '%initutc' '%initday' '%initdate''%initmonth''%inityear' '"to"' '%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
'set string 4 br'
'set strsiz .14'
'draw string 9.75 8.30 '"Model: "''initutc%' '%initdate''%initmonth''%inityear' '"GFS"
'set font 12'
'draw string 9.75 7.95 '%hours' '"- hour forecast"
'set font 11'
'set strsiz .17'
'set string 11'
'draw string 9.75 7.58 weathertogether.us'  

*Save output as .png file in current directory
'gxprint Total-Precip-NE-Pacific.png'
