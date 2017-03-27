*This script plots 500 hPa heights and surface-based CAPE in decameters and J/kg over a Mercator Projection of the Continental US
*It then saves the output to a .png file named sfccape-CONUS in the current directory. To run this script,you will need to have xcbar.gs, color.gs and colormaps.gs installed. 

*color.gs http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/color.gs?lang=en
*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
'set parea 0.4 10.0 0.3 7.5'
basemap='basemaps/usbasemap.png'

* *** SET YOUR VARIABLES!!! :)

*Model date
run = "18z"
day = "26"
month = "03"
year = "2017"

*frame (goes from 1-81 in 3-hour intervals, hours=(frame-1)*3)
frame=5

*vertical level
level=500
*** End variables

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'%year''%month''%day'/gfs_0p25_'%run

*** Begin plotting
*Set spatial domain for Grads to retrieve data from
'set lat 19 55'
'set lon -130 -65'

*style map
'set mpdset hires'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 3'
'set grid on 5 1 1'

*set time to plot
'set t '%frame

***Plot CAPE
'set gxout shaded'
*'set ccols 0 14 4 11 5 13 7 12 8 2 6 0'
*'set clevs 100 200 300 400 500 750 1000 1250 1500 2000 2500'
int=4000/50
'color 0 4000 'int' -kind white-(0)->lightgray->blue->yellow->orange->red'
*'colormaps.gs  -l 0 4000 100 -map s3pcpn'
'd capesfc'

*Add xcbar
'xcbar.gs -fstep 5 -line on -edge circle -direction v 10.04 10.24 .7 7.10'

*** END CAPE

*** Plot 500 hPa heights
*Set vertical coordinate
'set lev 'level

*plot the 500hPa height contours in intervals of 3 decameters
'set gxout contour'
'set cint 3'
'set cthick 5'
'set clab masked'
'd hgtprs/10'

*** End 500 hPA heights

*Draw shapefiles
'set line 1 1 1'
'draw shp Shapefiles//caprovinces/PROVINCE.shp'
'draw shp Shapefiles/mexstates/mexstates.shp'

*** End plotting

*Get time of forecast
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

*Get hour of forecast          
hours = (frame-1)*3

*draw titles and strings for map!
'set strsiz .18'
'draw string .45 7.56 '%level' '"hPa Geopotential Height (contours, dam)"
'draw string .45 7.27 Surface-based CAPE (shaded, J/kg)'  
'set strsiz .14'
'set string 1 br'
'draw string 9.95 7.89 '"Model: "''initutc%' '%initdate''%initmonth''%inityear' '"GFS"
'set font 12'
'set string 4'
'draw string 9.95 7.64 '"Valid: "''%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
'draw string 9.95 7.44 '%hours' '"- hour forecast"
'set font 11'
'set strsiz .17'
'set string 11'
'draw string 9.95 7.17 weathertogether.us'   

*NOTE: I would eventually like to have this format when I can figure out how to convert uppercase strings to lowercase
*'draw string 9.75 8.30 '"Model: "''initutc%' '%initmonth' '%initdate' '%inityear' '"GFS"
*'draw string 9.75 8.05 '"Valid: "''%forecastutc' '%forecastday''","' '%forecastmonth' '%forecastdate' '%forecastyear


*Save output as .png file in current directory
'gxprint US-Surface-Cape.png png -b 'basemap' -t 16 x1200 y927'   
