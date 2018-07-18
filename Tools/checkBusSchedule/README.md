# Check Bus schedule doc
### Run command
` checkBusScheduleCSV.py **your file** `

## File description
### Source Code
[` checkBusScheduleCSV.py`](checkBusScheduleCSV.py)  
  
### Folder [**sample**](./sample)  
  
Keeping sample to compare, copy from [General_timetable.xlsx](../../Document/General_timetable.xlsx)
* `route_id` _ ` (another route_id) `-`direction`  
  
## Definition from [`out.csv`](out.csv)
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

## Function
* ### Open Sample `openSample(route_id,direction)`
    * Parameter:
        * `route_id` : Mã sỗ xe
        * `direction` : Chiều 
    *  Lấy dữ liệu của sample tùy thuộc vào các route khác nhau
* ### Translate Service `translateService(service_id)`
    * Parameters:
        * `service_id` : service id, col cuối trong out.csv
    * Đổi từ service_id sang danh sách các ngày hoạt động trong tuần 
* ### Is New Route `isNewRoute(route_id)`
    * Parameter:
        * `route_id`: Ma so xe
    * Lập một danh sách các tuyến hiện có trong `input file`

* ### Check Service ID `checkServiceID(input,service_id)`
    * Parameters:
        * `input`: Array of day, length must == 7
        * `service_id`: service_id code
    * Kiểm tra các ngày nghỉ có đúng với serviceID không

* ### Print Data `printData(data)`
    * Parameter:
        * `data`: Array of data from `cdata`
    * In dữ liệu của `cdata`

* ### Analyze Content `AnalyzeContent(data)`
    * Parameter
        * `data`: Array of data from `content`
    * Chia dữ liệu theo row vào biến `cdata` để chuẩn bị so sánh
## Test steps
### **Step 1**: Analyze `input file`
#### Object schema  
>Route ID
    --> Stop Name
        --> Time 
            --> Service type, Date Off
Phân tích dữ liệu các tuyến vô `cdata` theo Schema ở trên
