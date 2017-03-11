*This script plots 500 hPa heights/absolute vorticity from the GFS in decameters and inverse seconds, respectively, over a polar stereographic
*projection of the NE Pacific. It then saves the output to a .png file named 500-hPa-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*To do list: *Clean up the high and low values when the heights go over the terrain of the Western US with 'mfhilo' function



*Basic commands to clear everything, make background white, turn off timestamp/grads,  and set plotting area.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 0.3 10.3 0.4 7.75'

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170311/gfs_0p25_00z'

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
'xcbar.gs -fstep 5 -line on -edge circle -direction v 9.8 10 .4 7.75'
*This script plots 500 hPa heights/absolute vorticity from the GFS in decameters and inverse seconds, respectively, over a polar stereographic
*projection of the NE Pacific. It then saves the output to a .png file named 500-hPa-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*To do list: *Clean up the high and low values when the heights go over the terrain of the Western US with 'mfhilo' function



*Basic commands to clear everything, make background white, turn off timestamp, and fix window output to 1100x850.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 0.3 10.3 0.4 7.75'

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170311/gfs_0p25_00z'

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
'xcbar.gs -fstep 5 -line on -edge circle -direction v 9.8 10 .4 7.75'

*plot the 500hPa height contours in intervals of 3 decameters
'set gxout contour'
'set cint 3'
'set cthick 5'
'set clab masked'
'd hgtprs/10'

*draw titles, caption, and axis label for map. Make sure to change the times so they are accurate!
'draw string .85 8.1 500 hPa Geopotential Height (contours, dam)'
'draw string .85 7.9 Absolute Vorticity (shaded, s`a-1`n)'      
'draw string .85 0.25 Model: 00Z 11Mar2017 GFS                Valid: 06Z 11Mar2017 (6-hour forecast)'
'draw string 7.9 7.9 weathertogether.us'

*plot high and low centers via mfhilo function
radius=1500
cint=500

*   ******************************DRAW L's******************************

'mfhilo hgtprs/10 CL l 'radius', 'cint

Low_info=result
i=2         ;*Since the data starts on the 2nd line
minmax=sublin(Low_info,i)

while(subwrd(minmax,1) = 'L') 

  min_lat = subwrd(minmax, 2)
  min_lon = subwrd(minmax, 3)
  min_val = subwrd(minmax, 5)
  minval = math_nint(min_val)

  'q w2xy 'min_lon' 'min_lat      ;*Translate lat/lon to page coordinates
   x_min = subwrd(result,3)
   y_min = subwrd(result,6)


  'q gxinfo'                      ;*Get area boundaries
  xline=sublin(result,3)
  yline=sublin(result,4)
  xs=subwrd(xline,4)' 'subwrd(xline,6)
  ys=subwrd(yline,4)' 'subwrd(yline,6)

  if(y_min > subwrd(ys,1)+0.1 & y_min < subwrd(ys,2)-0.1 & x_min > subwrd(xs,1)+0.1 & x_min < subwrd(xs,2)-0.5)
    'set strsiz .1'
    'set string 1 c 5'
    'draw string 'x_min' 'y_min' 'minval
        
  endif

  i=i+1
  minmax = sublin(Low_info,i)
endwhile


*   ******************************DRAW H's******************************

'mfhilo hgtprs/10 CL h 'radius', 'cint

High_info=result
i=2         ;*Since the data starts on the 2nd line
minmax=sublin(High_info,i)

while(subwrd(minmax,1) = 'H') 

  min_lat = subwrd(minmax, 2)
  min_lon = subwrd(minmax, 3)
  min_val = subwrd(minmax, 5)
  minval = math_nint(min_val)

  'q w2xy 'min_lon' 'min_lat      ;*Translate lat/lon to page coordinates
   x_min = subwrd(result,3)
   y_min = subwrd(result,6)


  'q gxinfo'                      ;*Get area boundaries
  xline=sublin(result,3)
  yline=sublin(result,4)
  xs=subwrd(xline,4)' 'subwrd(xline,6)
  ys=subwrd(yline,4)' 'subwrd(yline,6)

  if(y_min > subwrd(ys,1)+0.1 & y_min < subwrd(ys,2)-0.1 & x_min > subwrd(xs,1)+0.1 & x_min < subwrd(xs,2)-0.5)
    'set strsiz .1'
    'set string 1 c 5'
    'draw string 'x_min' 'y_min' 'minval
  endif

  i=i+1
  minmax = sublin(High_info,i)
endwhile

*Save output as .png file in current directory
'gxprint 500-hPa-NE-Pacific.png x1024 y768'
*plot the 500hPa height contours in intervals of 3 decameters
'set gxout contour'
'set cint 3'
'set cthick 5'
'set clab masked'
'd hgtprs/10'

*draw titles, caption, and axis label for map. Make sure to change the times so they are accurate!
'draw string .85 8.1 500 hPa Geopotential Height (contours, dam)'
'draw string .85 7.9 Absolute Vorticity (shaded, s`a-1`n)'      
'draw string .85 0.25 Model: 00Z 11Mar2017 GFS                Valid: 06Z 11Mar2017 (6-hour forecast)'
'draw string 7.9 7.9 weathertogether.us'

*plot high and low centers via mfhilo function
radius=1500
cint=500

*   ******************************DRAW L's******************************

'mfhilo hgtprs/10 CL l 'radius', 'cint

Low_info=result
i=2         ;*Since the data starts on the 2nd line
minmax=sublin(Low_info,i)

while(subwrd(minmax,1) = 'L') 

  min_lat = subwrd(minmax, 2)
  min_lon = subwrd(minmax, 3)
  min_val = subwrd(minmax, 5)
  minval = math_nint(min_val)

  'q w2xy 'min_lon' 'min_lat      ;*Translate lat/lon to page coordinates
   x_min = subwrd(result,3)
   y_min = subwrd(result,6)


  'q gxinfo'                      ;*Get area boundaries
  xline=sublin(result,3)
  yline=sublin(result,4)
  xs=subwrd(xline,4)' 'subwrd(xline,6)
  ys=subwrd(yline,4)' 'subwrd(yline,6)

  if(y_min > subwrd(ys,1)+0.1 & y_min < subwrd(ys,2)-0.1 & x_min > subwrd(xs,1)+0.1 & x_min < subwrd(xs,2)-0.5)
    'set strsiz .1'
    'set string 1 c 5'
    'draw string 'x_min' 'y_min' 'minval
        
  endif

  i=i+1
  minmax = sublin(Low_info,i)
endwhile


*   ******************************DRAW H's******************************

'mfhilo hgtprs/10 CL h 'radius', 'cint

High_info=result
i=2         ;*Since the data starts on the 2nd line
minmax=sublin(High_info,i)

while(subwrd(minmax,1) = 'H') 

  min_lat = subwrd(minmax, 2)
  min_lon = subwrd(minmax, 3)
  min_val = subwrd(minmax, 5)
  minval = math_nint(min_val)

  'q w2xy 'min_lon' 'min_lat      ;*Translate lat/lon to page coordinates
   x_min = subwrd(result,3)
   y_min = subwrd(result,6)


  'q gxinfo'                      ;*Get area boundaries
  xline=sublin(result,3)
  yline=sublin(result,4)
  xs=subwrd(xline,4)' 'subwrd(xline,6)
  ys=subwrd(yline,4)' 'subwrd(yline,6)

  if(y_min > subwrd(ys,1)+0.1 & y_min < subwrd(ys,2)-0.1 & x_min > subwrd(xs,1)+0.1 & x_min < subwrd(xs,2)-0.5)
    'set strsiz .1'
    'set string 1 c 5'
    'draw string 'x_min' 'y_min' 'minval
  endif

  i=i+1
  minmax = sublin(High_info,i)
endwhile

*Save output as .png file in current directory
'gxprint 500-hPa-NE-Pacific.png x1024 y768'
