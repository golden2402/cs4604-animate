#!/bin/bash   

for (( i = 1031; i >= 250; i-- ));
do                                                                                                                                                                                  
curl http://localhost:5000/anime/populate/$i
done