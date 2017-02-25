*This script plots 500 hPa heights/absolute vorticity from the GFS in decameters and inverse seconds, respectively, over a polar stereographic
*projection of the NE Pacific. It then saves the output to a .png file named 500-hPa-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*To do list: *Get local maxima and minima for 500 hPa height contours using 'mfhilo' function



*Basic commands to clear everything, make background white, turn off timestamp, and fix window output to 1100x850.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set xsize 1100 850'

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170224/gfs_0p25_12z'

*Set time-step you want to plot. For this GFS, time-steps are in 3 hour intervals from t=1 to t=81, where t=1 is the initialization (0 hour forecast). 
*To find how many hours in advance you are plotting: hours=(t-1)*3
'set t 3'

*Set spatial domain for Grads to retrieve data from
'set lat 18 70'
'set lon -190 -80'

*Set vertical coordinate
'set lev 500'

*Set map projection 
'set mpvals -160 -110 23 65'
'set mproj nps'

*style map
'set mpdset mres'
'set mpt 0 0 1 6'
'set mpt 1 0 1 6'
'set mpt 2 0 3 3'
'set grid on 5 0 1'

*Plot absolute vorticity with colormaps and xcbar scripts
'set gxout shaded'
'colormaps.gs -l 0 50e-5 1e-5 -map paired'
'd absvprs'
'xcbar.gs -fstep 5 -line on -edge circle -direction v 9.8 10 .6 7.9'

*plot the 500hPa height contours in intervals of 3 decameters
'set gxout contour'
'set cint 3'
'set cthick 5'
'set clab masked'
'd hgtprs/10'

*draw titles, caption, and axis label for map. Make sure to change the times so they are accurate!
'draw string 1.3 8.1 500 hPa Geopotential Height (contours, dam)'
'draw string 1.3 7.9 Absolute Vorticity (shaded, s`a-1`n)'      
'draw string 1.3 0.6 Model: __Z DDMONYYYY GFS                Valid: __Z DDMONYYYY (_-hour forecast)'
'draw string 7.9 7.9 weathertogether.us'
*Save output as .png file in current directory
'gxprint 500-hPa-NE-Pacific.png'
