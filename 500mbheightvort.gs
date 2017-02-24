*This script plots 500 hPa heights/absolute vorticity from the GFS in decameters and inverse seconds, respectively, over a polar stereographic
*projection of the contiguous U.S. and some of Canada/Mexico. It then saves the output to a .png file named 500-hPa-Height-Vorticity 
*in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html



*Basic commands to clear everything, make background white, and turn off timestamp
'reinit'
'set display color white'
'clear'
'set timelab off'

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170223/gfs_0p25_18z'

*Set time-step you want to plot (for this GFS, time-steps are in 3 hour intervals from t=1 to t=81 (240 hours, where t=1 is the initialization (0 hour forecast). 
*To find how many hours in advance you are plotting: hours=(t-1)*3
'set t 3'

*Set horizontal coordinates and map projection 
'set lat 15 80'
'set lon -150 -40'
'set mpvals -120 -75 25 65'
'set mproj nps'
'set mpdset hires'

*Set vertical coordinate
'set lev 500'

*Plot absolute vorticity with colormaps and xcbar scripts
'set gxout shaded'
'colormaps.gs -l 0 50e-5 1e-5 -map paired'
'd absvprs'
'xcbar.gs -fstep 5 -line on -edge circle'

*plot the 500hPa height contours in intervals of 4 decameters
'set gxout contour'
'set cint 4'
'set clab masked'
'd hgtprs/10'

*draw titles, caption, and axis label for map. Make sure to change the times so they are accurate!
'draw title '"500 hPa Geopotential Height and Absolute Vorticity"
'draw string 1.7 0.5 Model: GFS   Init: 18Z 23FEB2017   Valid: 00Z 24FEB2017 (6-hour forecast)'
'draw string 10 7.8 s`a-1'
'draw string 9.15 .125 weathertogether.us'
'draw string 3.5 .125 This is really fun and not too difficult!'
*Save output as .png file in current directory
'gxprint 500-hPa-Height-Vorticity.png'
