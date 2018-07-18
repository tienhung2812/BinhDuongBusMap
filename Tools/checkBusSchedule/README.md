# Check Bus schedule doc
### Run command
` checkBusScheduleCSV.py **your file** `

## File description
### Source Code
[` checkBusScheduleCSV.py`]( ./BinhDuongBusMap/Tools/checkBusSchedule/checkBusScheduleCSV.py )  
  
### Folder **sample**  
  
Keeping sample to compare, copy from [General_timetable.xlsx](https://github.com/tienhung2812/BinhDuongBusMap/blob/master/Document/General_timetable.xlsx)
* `route_id` _ ` (another route_id) `-`direction`  
  
## Definition from `out.csv`
* Route ID: `route_id`
* Stop name: `stop_name`
* Running day:  `monday` to `sunday` 
    * >`0`: not run, `1`: run  
* Date off : `date`
* Service type: `service_id`
    * > `1` là chạy everyday
    * > `2` là chạy từ t2->t7
    * > `3` là chạy từ t2->t6
    * > `4` là chạy mỗi t7, cn
    * > `5` là chỉ chạy t7

## Test steps
### Step 1. Analyze `input file`
