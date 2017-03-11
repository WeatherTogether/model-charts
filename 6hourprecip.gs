*This script plots sea-level-pressure (hPa), 3-hour precipitation (in), and 1000-500mb thicknesses (dam) over a polar *stereographic projection of the NE Pacific. It then saves the output to a .png file named SLP-Precip-NE-Pacific in the current directory. To run this script,you will need to have xcbar.gs and colormaps.gs installed. 

*xcbar.gs: http://kodama.fubuki.info/wiki/wiki.cgi/GrADS/script/xcbar.gs?lang=en
*colormaps_v2.gs (rename to colormaps.gs for script to run) http://gradsaddict.blogspot.com/2015/12/script-colormapsgs-version-20-create.html

*Basic commands to clear everything, make background white, turn off timestamp, and fix window output to 1100x850.
'reinit'
'set display color white'
'clear'
'set timelab off'
'set grads off'
'set parea 0.5 10.5 0.4 7.75'

*Open netcdf file from NOMADS server
'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs20170309/gfs_0p25_00z'

*Set time-step you want to plot. For this GFS, time-steps are in 3 hour intervals from t=1 to t=81, where t=1 is the *initialization (0 hour forecast). 
*To find how many hours in advance you are plotting: hours=(t-1)*3
'set t 3'

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
'set mpt 2 1 3 3'
'set grid on 5 1 1'



*Plot 6-hour precipitation with colormaps and xcbar scripts
'set gxout shaded'
'colormaps.gs -map s3pcpn -custom 0 .01 .02 .05 .1 .15 .20 .25 .30 .35 .40 .45 .50 .60 .70 .80 .90 1.00 1.20 1.50 2.00 5.00'
*'d sum(apcpsfc,t=1,t=81,2)'
'd apcpsfc/25.4'
'xcbar.gs -line on -edge circle -direction v 10.1 10.3 .4 7.75'

*plot 1000-500hPa thickness in intervals of 6 decameters
'set gxout contour'
'set cint 6'
'set cthick 5'
'set cstyle 3'
'set clab masked'
'set clevs 476 480 486 492 498 504 510 516 522 528 534 540 546 552 558 564 570 576 582 588 594 600'
'set ccols 4 4 4 4 4 4 4 4 4 4 4 2 2 2 2 2 2 2 2 2 2 2'

*if (hgtprs(lev=500)-hgtprs(lev=1000))/10 >= 540)
*'set ccolor 2'
*endif
*if (hgtprs(lev=500)-hgtprs(lev=1000))/10 < 540)
*'set ccolor 4'
*endif
'd (hgtprs(lev=500)-hgtprs(lev=1000))/10'

*plot the SLP contours in intervals of 3 hPa
'set gxout contour'
'set cint 3'
'set ccolor 1'
'set cstyle 1'
'set cthick 3'
'set clab masked'
'd prmslmsl/100'

*draw titles, caption, and axis label for map. Make sure to change the times so they are accurate!
'draw string 1.05 8.3 1000-500 hPa Thickness (dotted contours, dam)'
'draw string 1.05 8.1 Sea-Level Pressure (contours, hPa)'
'draw string 1.05 7.9 6-Hour Precipitation (shaded, inches)'      
'draw string 1.05 0.25 Model: 00Z 8Mar2017 GFS                Valid: 06Z 8Mar2017 (6-hour forecast)'
'draw string 8.1 7.9 weathertogether.us'

*plot high and low centers via mfhilo function
radius=1000
cint=300

*   ******************************DRAW L's******************************

'mfhilo prmslmsl/100 CL l 'radius', 'cint

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
    'set strsiz .2'
    'set string 2 c 7'
    'draw string 'x_min' 'y_min' L'

    'set strsiz 0.1'
    'set string 2 bl 4'
    'draw string 'x_min+0.1' 'y_min-0.15' 'minval
        
  endif

  i=i+1
  minmax = sublin(Low_info,i)
endwhile


*   ******************************DRAW H's******************************

'mfhilo prmslmsl/100 CL h 'radius', 'cint

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
    'set strsiz .2'
    'set string 4 c 7'
    'draw string 'x_min' 'y_min' H'

    'set strsiz 0.1'
    'set string 4 bl 4'
    'draw string 'x_min+0.1' 'y_min-0.15' 'minval
  endif

  i=i+1
  minmax = sublin(High_info,i)
endwhile

*Save output as .png file in current directory
'gxprint 6hourprecip.png x1024 y768'
