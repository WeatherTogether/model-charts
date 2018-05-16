from datetime import date, timedelta, datetime
import sys
import requests
import subprocess
import time


#This script does three primary tasks. First, it downloads the specified grib files. Second, it runs the specified grads scripts. Third, it makes a text file of the URLs each model chart will be located at and invokes a shell script to upload the charts and the text files. 

#It takes two command-line arguments: the initialization hour  ( 00, 06, etc.) and the model name. The model name must be 'GFS_0.25', 'NAM_12', or 'GDPS'. We will have more models in the future.


def initialmodelurl(model, inithour, forecasthour, init_intdate):
    """Define an initial url to see if the model has begun running via the "if requests.get(url).status_code == 200:" code in the main loop."""
    if model == 'GFS_0.25':
        url='http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t{0}z.pgrb2.0p25.f{1}&lev_0-0.1_m_below_ground=on&lev_500_mb=on&var_HGT=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&showurl=&dir=%2Fgfs.{2}{0}'.format(inithour, forecasthour, init_intdate)     
    elif model == 'NAM_12':
        url='http://nomads.ncep.noaa.gov/cgi-bin/filter_nam.pl?file=nam.t{0}z.awphys{1}.tm00.grib2&lev_500_mb=on&var_HGT=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fnam.{2}'.format(inithour, forecasthour, init_intdate)
    elif model == 'GDPS':
        url='http://dd.weather.gc.ca/model_gem_global/25km/grib2/lat_lon/{0}/{1}/CMC_glb_ABSV_ISBL_500_latlon.24x.24_{2}{0}_P{1}.grib2'.format(inithour, forecasthour, init_intdate)
    elif model == 'HRRR_Sub':
        url='http://nomads.ncep.noaa.gov/cgi-bin/filter_hrrr_sub.pl?file=hrrr.t{0}z.wrfsubhf{1}.grib2&lev_80_m_above_ground=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fhrrr.{2}'.format(inithour, forecasthour, init_intdate)
    return url




def initialmodeltitle(model):
    """The modelfortitle is the model title that will be displayed on the Grads charts"""
    if model == 'GFS_0.25':
        modelfortitle='GFS'
    elif model == 'NAM_12':
        modelfortitle='NAM-12km'
    elif model == 'GDPS':
        modelfortitle='GEM'
    elif model == 'HRRR_Sub':
        modelfortitle='HRRR-Subhourly'
    return modelfortitle




def findenddate(model, today, inithour):
    """Find the end date of the model. This is checked against the date of the current forecast hour in the main loop"""
    if model == "GFS_0.25":
        enddate=(today+timedelta(hours=384+int(inithour))).strftime('%Y%m%d%H')
    elif model == "NAM_12":
        enddate=(today+timedelta(hours=84+int(inithour))).strftime('%Y%m%d%H')
    elif model == 'GDPS':
        enddate=(today+timedelta(hours=240+int(inithour))).strftime('%Y%m%d%H')
    elif model == 'HRRR_Sub':
        enddate=(today+timedelta(hours=12+int(inithour))).strftime('%Y%m%d%H')       
    return enddate




def findforecasthour(model):
    """Depending on the length of the model, the forecast hour in the URL either has three digits or two digits"""
    if model == "GFS_0.25" or model == 'GDPS':
        forecasthour="000"
    elif  model == "NAM_12" or 'HRRR_Sub':
        forecasthour="00"
    return forecasthour


def change_hr(model, h):
    """Change the hour as you iterate through the model run"""
    if model == 'GFS_0.25' or model == 'GDPS': 
        if h >= 240:
            h=h+12
        elif h >= 120 and h < 240:
            h=h+6  
        else:
            h=h+3
        return h
    elif model=="NAM_12" or model == 'HRRR_Sub':
        if h >= 24:
            h=h+3
        else:
            h=h+1
        return h




def change_fcsthr(model, h):
    """Change the 2 or 3 digit "forecast hour" used in the URL"""
    if model=='GFS_0.25' or model == 'GDPS': 
        if h <= 9: 
            FORECASTHOUR="00{0}".format(h)
        elif h >= 10  and h < 100:
            FORECASTHOUR="0{0}".format(h)
        else:
            FORECASTHOUR=str(h)
        return FORECASTHOUR
    elif model=="NAM_12" or 'HRRR_Sub':
        if h <= 9: 
            FORECASTHOUR="0{0}".format(h)
        else:
            FORECASTHOUR=str(h)
        return FORECASTHOUR




def geturl(inithour, forecasthour, init_intdate, level, variable, model):
    """Determine the current url of the grib file you want to get"""
    if model == 'GFS_0.25':
        URL='http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t{0}z.pgrb2.0p25.f{1}&lev_{3}=on&var_{4}=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fgfs.{2}{0}'.format(inithour, forecasthour, init_intdate, level, variable)
    elif model == 'NAM_12':
        URL='http://nomads.ncep.noaa.gov/cgi-bin/filter_nam.pl?file=nam.t{0}z.awphys{1}.tm00.grib2&lev_{3}=on&var_{4}=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fnam.{2}'.format(inithour, forecasthour, init_intdate, level, variable)
    elif model == 'GDPS':
        URL='http://dd.weather.gc.ca/model_gem_global/25km/grib2/lat_lon/{0}/{1}/CMC_glb_{4}_{3}_latlon.24x.24_{2}{0}_P{1}.grib2'.format(inithour, forecasthour, init_intdate, level, variable)
    elif model == 'HRRR_Sub':
        URL='http://nomads.ncep.noaa.gov/cgi-bin/filter_hrrr_sub.pl?file=hrrr.t{0}z.wrfsubhf{1}.grib2&lev_{3}=on&var_{4}=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fhrrr.{2}'.format(inithour, forecasthour, init_intdate, level, variable)
    return URL




def upload_files (model, init_intdate, inithour, forecasthour):
    """Upload pictures and a text file that points to their path onto weathertogether.net"""
    subprocess.call(['bash', '/home/mint/opengrads/myscripts/uploadfiles.sh', model, init_intdate, inithour, forecasthour])




def download_grib (levelvar, inithour, forecasthour, init_intdate, model):
    """get url, define locations of grib and control files. In the bash script, use wget to download the file from $url as $gribfile, then convert $gribfile to $controlfile with g2ctl.pl and create index from control file with gribmap.pl""" 
    for level in levelvar:       
        for var in range(len(levelvar[level])):
            # put boolean method in here to check for scripts for downloading at certain hours
            if checkdownloadhour (levelvar[level][var], forecasthour):
                url=geturl(inithour, forecasthour, init_intdate, level, levelvar[level][var], model)
                gribfile="/home/mint/gribfiles/{5}/{2}{0}/{3}_{4}_{1}".format(inithour, forecasthour, init_intdate, level, levelvar[level][var], model)
                controlfile="/home/mint/controlfiles/{5}/{2}{0}/{3}_{4}_{1}.ctl".format(inithour, forecasthour, init_intdate, level, levelvar[level][var], model)            
                subprocess.call(['bash', '/home/mint/opengrads/myscripts/gribdownload.sh', url, gribfile, controlfile, model, init_intdate, inithour, forecasthour])

def checkdownloadhour (gribtodownload, forecasthour):
    #remove leading zeros
    while forecasthour[1:]=="0":
        forecasthour=forecasthour[1:]
    if (int(forecasthour) == 0 or int(forecasthour) % 6 != 0) and gribtodownload == "APCP":
        return False
    else:
        return True

def checkscripthour (scripttorun, forecasthour):
    #remove leading zeros
    while forecasthour[1:]=="0":
        forecasthour=forecasthour[1:]
    if (int(forecasthour) == 0 or int(forecasthour) % 6 != 0) and (scripttorun == "precipmslp.gs"):
        print("totalprecip.gs won't run")
        print(scripttorun)
        return False
    elif (int(forecasthour) == 0 or int(forecasthour) % 6 != 0) and (scripttorun == "accumulatedprecip.gs"):
        print("totalprecip.gs won't run")
        print(scripttorun)
        return False
    else:
        return True

def call_grads (gradsregions, stringdate, init_intdate, inithour, forecasthour, h, model, modelfortitle, dayofyear, uploadurl):
    """Call grads by iterating through the places you want your script to run for a given model"""
    print(forecasthour)
    print("blah")
    for script in gradsregions[model]:
        for places in gradsregions[model][script]:
            # put boolean method in here to check for scripts for downloading at certain hours
            if checkscripthour(script, forecasthour):
                print(gradsregions[model])
                print(forecasthour)
                subprocess.call(['bash', '/home/mint/opengrads/myscripts/rungrads.sh', script, stringdate, init_intdate, inithour, str(places), forecasthour, str(h), model, modelfortitle, dayofyear, uploadurl])
                uploadurl="http://weathertogether.net/models/{0}/{1}/{2}z/".format(model, init_intdate, inithour)
                with open("/home/mint/grads_pics/{0}/{1}/{2}z/{0}_{3}_{4}.txt".format(model, init_intdate, inithour, places, script[:-3]) , "a") as myfile:

                    if model == 'HRRR_Sub':  ##### Ugly Hack... fix!
                        if forecasthour == '00':
                            myfile.write('{0}{1}_{2}_{3}_{4}.1.png\n'.format(uploadurl, model, places, script[:-3], forecasthour))
                        else:
                            myfile.write('{0}{1}_{2}_{3}_{4}.1.png\n'.format(uploadurl, model, places, script[:-3], forecasthour))
                            myfile.write('{0}{1}_{2}_{3}_{4}.2.png\n'.format(uploadurl, model, places, script[:-3], forecasthour))
                            myfile.write('{0}{1}_{2}_{3}_{4}.3.png\n'.format(uploadurl, model, places, script[:-3], forecasthour))
                            myfile.write('{0}{1}_{2}_{3}_{4}.4.png\n'.format(uploadurl, model, places, script[:-3], forecasthour))
                    else:
                            myfile.write('{0}{1}_{2}_{3}_{4}.png\n'.format(uploadurl, model, places, script[:-3], forecasthour))
    upload_files(model, init_intdate, inithour, forecasthour) 

##### End Ugly Hack


#######decide what variables you want to download for a given height for a given model######

levelvar={}
##### ##### GFS_0.25 ##### ###### 
levelvar['GFS_0.25']={}
levelvar['GFS_0.25']['850_mb']=['TMP', 'HGT', 'UGRD', 'VGRD', 'ABSV']
levelvar['GFS_0.25']['925_mb']=['TMP', 'HGT', 'UGRD', 'VGRD']
levelvar['GFS_0.25']['700_mb']=['TMP', 'HGT', 'UGRD', 'VGRD', 'ABSV']
levelvar['GFS_0.25']['500_mb']=['TMP', 'HGT', 'UGRD', 'VGRD', 'ABSV']
levelvar['GFS_0.25']['250_mb']=['UGRD', 'VGRD', 'HGT']
levelvar['GFS_0.25']['entire_atmosphere_%5C%28considered_as_a_single_layer%5C%29']=['PWAT']
levelvar['GFS_0.25']['1000_mb']=['HGT']
levelvar['GFS_0.25']['mean_sea_level']=['PRMSL']
levelvar['GFS_0.25']['10_m_above_ground']=['UGRD', 'VGRD']
levelvar['GFS_0.25']['80_m_above_ground']=['UGRD', 'VGRD']
levelvar['GFS_0.25']['2_m_above_ground']=['TMP', 'DPT']
levelvar['GFS_0.25']['surface']=['CAPE', 'APCP']

#heat flux: lhtfl = latent heat net flux, shtfl = sensible heat net flux

#want to plot snow depth
#24-hour precipitation
#vertical velocity (pressure - Pa/s - VVEL) (geometric - m/s - DZDT)
#vwsh vertical speed shear
#weasd - watter equivalent of accumulated snow depth


#925 mb 
#850 mb heights, temp, wind
#700 mb heights, temp, wind
#relative humidity, heights: 850 700 500
#absolute vorticity, winds, heights: 850, 700, 500
#4lftx (best (4-layer) lifted index) - LFTX - surface lifted index
#cin?
#clwmr - cloud mixing ratio 
#cwat - cloud water
#hlcy - storm relative helicity
#hpbl - planetary boundary layer height
#pot - potential temperature
#rh - relative humidity
#pvort
#pot
#epot




##### ##### NAM_12 ##### ######
levelvar['NAM_12']={}
levelvar['NAM_12']['500_mb']=['HGT', 'ABSV']
levelvar['NAM_12']['850_mb']=['TMP', 'HGT', 'UGRD', 'VGRD']
levelvar['NAM_12']['250_mb']=['UGRD', 'VGRD', 'HGT']
levelvar['NAM_12']['entire_atmosphere_%5C%28considered_as_a_single_layer%5C%29']=['PWAT']
levelvar['NAM_12']['1000_mb']=['HGT']
levelvar['NAM_12']['mean_sea_level']=['PRMSL']
levelvar['NAM_12']['10_m_above_ground']=['UGRD', 'VGRD']
levelvar['NAM_12']['80_m_above_ground']=['UGRD', 'VGRD']
levelvar['NAM_12']['2_m_above_ground']=['TMP', 'DPT']
levelvar['NAM_12']['surface']=['CAPE', 'APCP']

##### ##### GDPS ##### ######
levelvar['GDPS']={}
levelvar['GDPS']['ISBL_500']=['HGT', 'ABSV']
levelvar['GDPS']['ISBL_850']=['TMP']
levelvar['GDPS']['EATM_0']=['CWAT']

##### ##### HRRR_Sub ##### ######
levelvar['HRRR_Sub']={}
levelvar['HRRR_Sub']['80_m_above_ground']=['UGRD','VGRD']
levelvar['HRRR_Sub']['10_m_above_ground']=['UGRD','VGRD']
levelvar['HRRR_Sub']['entire_atmosphere']=['REFC']
levelvar['HRRR_Sub']['top_of_atmosphere']=['SBT124']


##### ##### ##### ##### ##### END levelvar{} ##### ##### ##### ##### #####

########decide what regions you want each script to run for a given model######

gradsregions={}
##### ##### GFS_0.25 ##### ###### 
gradsregions['GFS_0.25']={}
gradsregions['GFS_0.25']['850mbvort.gs']=['pacnw', 'conus', 'nepacific']
gradsregions['GFS_0.25']['700mbvort.gs']=['pacnw', 'conus', 'nepacific']
gradsregions['GFS_0.25']['500mbvort.gs']=['northamerica', 'pacnw', 'conus', 'nepacific']
gradsregions['GFS_0.25']['500mbheightanomaly.gs']=['northamerica', 'nepacific']
gradsregions['GFS_0.25']['850mbtempanomaly.gs']=['northamerica', 'conus', 'nepacific']
gradsregions['GFS_0.25']['1000-500mbthickness.gs']=['conus', 'northamerica', 'antarctica']
gradsregions['GFS_0.25']['1000-850mbthickness.gs']=['conus', 'northamerica', 'antarctica']
gradsregions['GFS_0.25']['2mdp.gs']=['pacnw', 'conus', 'northamerica']
gradsregions['GFS_0.25']['2mtemp.gs']=['pacnw', 'conus', 'nepacific', 'northamerica']
gradsregions['GFS_0.25']['925mbtemp.gs']=['conus', 'northamerica', 'antarctica']
gradsregions['GFS_0.25']['850mbtemp.gs']=['conus', 'nepacific', 'northamerica']
gradsregions['GFS_0.25']['700mbtemp.gs']=['conus', 'nepacific', 'northamerica']
gradsregions['GFS_0.25']['500mbtemp.gs']=['conus', 'nepacific', 'northamerica']
gradsregions['GFS_0.25']['10mwind.gs']=['pacnw', 'nepacific', 'conus']
gradsregions['GFS_0.25']['80mwind.gs']=['pacnw', 'nepacific']
gradsregions['GFS_0.25']['250mbwind.gs']=['northamerica', 'nepacific']
gradsregions['GFS_0.25']['precipmslp.gs']=['pacnw', 'nepacific', 'conus', 'northamerica']
gradsregions['GFS_0.25']['accumulatedprecip.gs']=['pacnw', 'nepacific', 'conus']
gradsregions['GFS_0.25']['pwat.gs']=['pacnw', 'conus', 'nepacific']
gradsregions['GFS_0.25']['capesfc.gs']=['conus', 'pacnw']


##### ##### NAM_12 ##### ###### 
gradsregions['NAM_12']={}
gradsregions['NAM_12']['500mbvort.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['pwat.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['2mtemp.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['2mdp.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['capesfc.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['10mwind.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['80mwind.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['250mbwind.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['precipmslp.gs']=['pacnw', 'namconus']
gradsregions['NAM_12']['accumulatedprecip.gs']=['pacnw', 'namconus']

##### ##### GDPS ##### ###### 
gradsregions['GDPS']={}
gradsregions['GDPS']['500mbvort.gs']=['northamerica', 'pacnw', 'conus', 'nepacific']

##### ##### HRRR_Sub ##### ###### 
gradsregions['HRRR_Sub']={}
gradsregions['HRRR_Sub']['80mwind_HRRR.gs']=['pacnwzoom', 'colriver']
gradsregions['HRRR_Sub']['10mwind_HRRR.gs']=['pacnwzoom', 'hrrrconus']
gradsregions['HRRR_Sub']['radar_SubHRRR.gs']=['pacnwzoom', 'hrrrconus']
gradsregions['HRRR_Sub']['olw_SubHRRR.gs']=['hrrrconus', 'pacnwzoom']

##### ##### ##### ##### ##### END gradsregions{} ##### ##### ##### ##### #####

#Global variables
inithour=sys.argv[1] # initialization hour
model=sys.argv[2] # model

today = datetime.now()
today = today.replace(hour=0, minute=0, second=0)

init_intdate=today.strftime('%Y%m%d') #today's date
init_stringdate=today.strftime('%d%^b%Y') #today's date in DDMONYYYY - used for plotting the chart
chartdate=init_intdate+inithour #get the date of the current forecast chart
dayofyear=today.strftime('%j')
uploadurl="http://weathertogether.net/models/{0}/{1}/{2}z/".format(model, init_intdate, inithour)
hour=0 #hour used as a counter in while loop

forecasthour=findforecasthour(model)
enddate=findenddate(model,today,inithour)
url=initialmodelurl(model, inithour, forecasthour, init_intdate)
modelfortitle=initialmodeltitle(model)


#main script
print("blah")
while chartdate <= enddate:
    print("blah2")
    if requests.get(url).status_code == 200: #Bug... This returns true even if the file at the NOMADS server is nonexistent... ex: hour 383 for the GFS.
    #if True:        
        print("blah3")
        download_grib(levelvar[model], inithour, forecasthour, init_intdate, model)
        call_grads(gradsregions, init_stringdate, init_intdate, inithour, forecasthour, hour, model, modelfortitle, dayofyear, uploadurl)
        hour=change_hr(model,hour)
        forecasthour=change_fcsthr(model,hour)
        chartdate=(today+timedelta(hours=hour+int(inithour))).strftime('%Y%m%d%H')
        url=initialmodelurl(model, inithour, forecasthour, init_intdate)          
    else:
        print("Gribfile not ready")
        time.sleep(10)

