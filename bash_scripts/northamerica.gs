function args()



*Basic commands to clear everything, make background white, turn off timestamp/grads, set fonts, and set plotting area.
'reinit'
'set display color white'
'clear'
'set grads off'
'set hershey off'
'set font 12 file /usr/share/fonts/type1/gsfonts/n019023l.pfb'
'set font 11 file /usr/share/fonts/type1/gsfonts/n019004l.pfb'
'set font 10 file /usr/share/fonts/type1/gsfonts/n019003l.pfb'
dim1=0.37
dim2=10.07
dim3=0.15
dim4=7.5
*'set parea '%dim1' '%dim2' '%dim3' '%dim4
'set parea 0.37 10.07 0.15 7.5'

'open /home/mint/controlfiles/GFS_0.25_DEGREE/2017111100000_500_mb_HGT.ctl'

*style map
'set mpdset hires'
'set mpt 0 1 1 6'
'set mpt 1 1 1 6'
'set mpt 2 1 1 3'
'set grid on 5 1 1'
'set xlevs -120 -110 -100 -90 -80 -70'
'set ylevs 50 40 30 20'



*Get time of forecast
'q time'
forecastutc=substr(result, 24, 3)
forecastdate=substr(result, 27, 2)
forecastmonth=substr(result, 29, 3)
forecastyear=substr(result, 32, 4)
forecastday=substr(result, 45, 3)

INITHOUR=00Z
INIT_STRINGDATE="APRIL 2007"
MODELFORTITLE="GFS"
H=0

*Set spatial domain for Grads to retrieve data from
'set lat  19 56'
'set lon -128 -65'

*Draw shapefiles
'set line 1 1 1'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Canada/PROVINCE.shp'
'draw shp /home/mint/opengrads/Contents/Shapefiles/Mexico/mexstates.shp'

*draw titles and strings for map!
'set strsiz .15'
'draw string .45 8.00  "500 hPa Geopotential Height (contours, dam)"'
'draw string .45 7.71  "500 hPa Wind (barbs, mph)"'
'draw string .45 7.42 Absolute Vorticity (shaded, s`a-1`n)' 
'set strsiz .14'
'set string 1 br'
'draw string 9.95 8.09 '"Model: "''INITHOUR%'Z '%INIT_STRINGDATE' '%MODELFORTITLE
'set font 12'
'set string 4'n
'draw string 9.95 7.84 '"Valid: "''%forecastutc' '%forecastday' '%forecastdate''%forecastmonth''%forecastyear
'draw string 9.95 7.64 '%H' '"- hour forecast"
'set font 11'
'set strsiz .17'
'set string 11'
'draw string 9.95 7.34 weathertogether.net' 



*Get time of forecast
*'q time'
*forecastutc=substr(result, 24, 3)
*forecastdate=substr(result, 27, 2)
*forecastmonth=substr(result, 29, 3)
*forecastyear=substr(result, 32, 4)
*forecastday=substr(result, 45, 3)
