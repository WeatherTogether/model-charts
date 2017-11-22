from datetime import date, timedelta, datetime
import sys
import requests
import subprocess
import time


def initialmodelurl(model, inithour, forecasthour, init_intdate):
    """Define an initial url to see if the model has begun running via the "if requests.get(url).status_code == 200:" code in the main loop"""
    if model == 'GFS_0.25':
        url='http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t{0}z.pgrb2.0p25.f{1}&lev_0-0.1_m_below_ground=on&lev_500_mb=on&var_HGT=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&showurl=&dir=%2Fgfs.{2}{0}'.format(inithour, forecasthour, init_intdate)     
    elif model == 'NAM_12':
        url='http://nomads.ncep.noaa.gov/cgi-bin/filter_nam.pl?file=nam.t{0}z.awphys{1}.tm00.grib2&lev_500_mb=on&var_HGT=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fnam.{2}'.format(inithour, forecasthour, init_intdate)
    elif model == 'GDPS':
        url='http://dd.weather.gc.ca/model_gem_global/25km/grib2/lat_lon/{0}/{1}/CMC_glb_ABSV_ISBL_500_latlon.24x.24_{2}{0}_P{1}.grib2'.format(inithour, forecasthour, init_intdate)
    return url




def initialmodeltitle(model):
    """The modelfortitle is the model title that will be displayed on the Grads charts"""
    if model == 'GFS_0.25':
        modelfortitle='GFS'
    elif model == 'NAM_12':
        modelfortitle='NAM-12km'
    elif model == 'GDPS':
        modelfortitle='GEM'
    return modelfortitle




def findenddate(model, today, inithour):
    """Find the end date of the model. This is checked against the date of the current forecast hour in the main loop"""
    if model == "GFS_0.25":
        enddate=(today+timedelta(hours=384+int(inithour))).strftime('%Y%m%d%H')
    if model == "NAM_12":
        enddate=(today+timedelta(hours=84+int(inithour))).strftime('%Y%m%d%H')
    if model == 'GDPS':
        enddate=(today+timedelta(hours=240+int(inithour))).strftime('%Y%m%d%H')       
    return enddate




def findforecasthour(model):
    """Depending on the length of the model, the forecast hour in the URL either has three digits or two digits"""
    if model == "GFS_0.25" or model == 'GDPS':
        forecasthour="000"
    if model == "NAM_12":
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
    elif model=="NAM_12":
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
    elif model=="NAM_12":
        if h <= 9: 
            FORECASTHOUR="0{0}".format(h)
        else:
            FORECASTHOUR=str(h)
        return FORECASTHOUR




def geturl(inithour, forecasthour, init_intdate, level, variable, model):
    """Determine the current url of the grib file you want to get"""
    if model == 'GFS_0.25':
        URL='http://nomads.ncep.noaa.gov/cgi-bin/filter_gfs_0p25.pl?file=gfs.t{0}z.pgrb2.0p25.f{1}&lev_{3}=on&var_{4}=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fgfs.{2}{0}'.format(inithour, forecasthour, init_intdate, level, variable)
    if model == 'NAM_12':
        URL='http://nomads.ncep.noaa.gov/cgi-bin/filter_nam.pl?file=nam.t{0}z.awphys{1}.tm00.grib2&lev_{3}=on&var_{4}=on&leftlon=0&rightlon=360&toplat=90&bottomlat=-90&dir=%2Fnam.{2}'.format(inithour, forecasthour, init_intdate, level, variable)
    if model == 'GDPS':
        URL='http://dd.weather.gc.ca/model_gem_global/25km/grib2/lat_lon/{0}/{1}/CMC_glb_{4}_{3}_latlon.24x.24_{2}{0}_P{1}.grib2'.format(inithour, forecasthour, init_intdate, level, variable)
    return URL




def upload_files (model, init_intdate, inithour, forecasthour):
    """Upload pictures and a text file that points to their path onto weathertogether.net"""
    subprocess.call(['bash', '/home/mint/gradswork/uploadfiles.sh', model, init_intdate, inithour, forecasthour])




def download_grib (levelvar, inithour, forecasthour, init_intdate, model):
    """get url, define locations of grib and control files. In the bash script, use wget to download the file from $url as $gribfile, then convert $gribfile to $controlfile with g2ctl.pl and create index from control file with gribmap.pl""" 
    for level in levelvar:       
        for var in range(len(levelvar[level])):
            url=geturl(inithour, forecasthour, init_intdate, level, levelvar[level][var], model)
            gribfile="/home/mint/gribfiles/{5}/{2}{0}/{3}_{4}_{1}".format(inithour, forecasthour, init_intdate, level, levelvar[level][var], model)
            controlfile="/home/mint/controlfiles/{5}/{2}{0}/{3}_{4}_{1}.ctl".format(inithour, forecasthour, init_intdate, level, levelvar[level][var], model)
            subprocess.call(['bash', '/home/mint/gradswork/gribdownload.sh', url, gribfile, controlfile])




def call_grads (gradsregions, stringdate, init_intdate, inithour, forecasthour, h, model, modelfortitle, dayofyear, uploadurl):
    """Call grads by iterating through the places you want your script to run for a given model"""
    for script in gradsregions:
        for places in gradsregions[script][model]:
            subprocess.call(['bash', '/home/mint/gradswork/rungrads.sh', script, stringdate, init_intdate, inithour, str(places), forecasthour, str(h), model, modelfortitle, dayofyear, uploadurl])
            uploadurl="http://weathertogether.net/models/{0}/{1}/{2}z/".format(model, init_intdate, inithour)
            with open("/home/mint/gradswork/grads_pics/{0}/{1}/{2}z/{0}_{3}_{4}.txt".format(model, init_intdate, inithour, places, script[:-3]) , "a") as myfile:
                myfile.write('{0}{1}_{2}_{3}_{4}.png\n'.format(uploadurl, model, places, script[:-3], forecasthour))
        upload_files(model, init_intdate, inithour, forecasthour)     









#decide what variables you want to download for a given height for a given model
levelvar={}
levelvar['GFS_0.25']={}
levelvar['GFS_0.25']['500_mb']=['HGT', 'ABSV']
levelvar['NAM_12']={}
levelvar['NAM_12']['500_mb']=['HGT', 'ABSV']
levelvar['GDPS']={}
levelvar['GDPS']['ISBL_500']=['HGT', 'ABSV']

#decide what regions you want each script to run for a given model.
gradsregions={}
gradsregions['500mbvort.gs']={}
gradsregions['500mbvort.gs']['GFS_0.25']=['northamerica', 'middleeast']
gradsregions['500mbvort.gs']['NAM_12']=['pacnw']
gradsregions['500mbvort.gs']['GDPS']=['middleeast', 'pacnw']


 

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
#=int(INITHOUR)/6
hour=0 #hour used as a counter in while loop

forecasthour=findforecasthour(model)
enddate=findenddate(model,today,inithour)
url=initialmodelurl(model, inithour, forecasthour, init_intdate)
modelfortitle=initialmodeltitle(model)


#main script
while chartdate <= enddate:
    if requests.get(url).status_code == 200: #This returns true even if the file at the NOMADS server is nonexistent... ex: hour 383 for the GFS.
        print(url)
        download_grib(levelvar[model], inithour, forecasthour, init_intdate, model)
        call_grads(gradsregions, init_stringdate, init_intdate, inithour, forecasthour, hour, model, modelfortitle, dayofyear, uploadurl)
        hour=change_hr(model,hour)
        forecasthour=change_fcsthr(model,hour)
        chartdate=(today+timedelta(hours=hour+int(inithour))).strftime('%Y%m%d%H')
        url=initialmodelurl(model, inithour, forecasthour, init_intdate)          
    else:
        print("Gribfile not ready")
        time.sleep(10)
