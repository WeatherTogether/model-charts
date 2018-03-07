#!/bin/bash

#$1=model
#$2=intdate
#$3=inithour
#$4=forecasthour

#scp -i /home/mint/.ssh/id_rsa /home/mint/grads_pics/${1}/${2}/${3}z/*${4}hrfcst.png /home/mint/grads_pics/${1}/${2}/${3}z/*.txt weathfc0@weathertogether.net:public_html/models/${1}/${2}/${3}z/ 

#scp -i /home/mint/.ssh/id_rsa /home/mint/grads_pics/${1}/${2}/${3}z/*.txt weathfc0@weathertogether.net:public_html/models/${1}/latest/${3}z/

scp -i /home/mint/.ssh/id_rsa /home/mint/grads_pics/${1}/${2}/${3}z/*${4}*.png /home/mint/grads_pics/${1}/${2}/${3}z/*.txt weathfc0@weathertogether.net:public_html/models/${1}/${2}/${3}z/ 

scp -i /home/mint/.ssh/id_rsa /home/mint/grads_pics/${1}/${2}/${3}z/*.txt weathfc0@weathertogether.net:public_html/models/${1}/latest/${3}z/
