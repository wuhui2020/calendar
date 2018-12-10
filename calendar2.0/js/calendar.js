$(function(){
	var other = "N";//Y时间选择正点时间
	var calendar_Time;//定时器
	var isClick = "Y";//Y控制超过当前年月日不让选择,N不控制
    var NOW_TIME = new Date();
    var NOW_YEAR = NOW_TIME.getFullYear();//当前年
    var NOW_MONTH = NOW_TIME.getMonth()+1; //当前月
    var NOW_DAY = NOW_TIME.getDate(); //当前日

    var NOW_MONTH_FIRST_DAY = new Date(NOW_YEAR,NOW_MONTH,1);  //取当年当月中的第一天 
    var MONTH_ALL_DAY =   (new Date(NOW_MONTH_FIRST_DAY.getTime()-1000*60*60*24)).getDate();//获得当前月有多少天
    var FIRST_WEEK = new Date(NOW_YEAR,NOW_MONTH-1,1).getDay();//当前年的当前月的第一天是星期几
   	var END_WEEK = new Date(NOW_YEAR,NOW_MONTH-1,MONTH_ALL_DAY).getDay();//当前年的当前月的最后一天是星期几
    var PREV_MONTH = NOW_MONTH - 1; //上个月
    var PREV_MONTH_FIRST_DAY = new Date(NOW_YEAR,PREV_MONTH,1);  //取当年上个月的第一天 
    var PREV_MONTH_ALL_DAY =   (new Date(PREV_MONTH_FIRST_DAY.getTime()-1000*60*60*24)).getDate();//获得当前年上个月有多少天


	//获得当前年月日
    $(".calendar-showYear").html(NOW_YEAR + "年").attr("value",NOW_YEAR);
    $(".calendar-showMonth").html(NOW_MONTH + "月").attr("value",NOW_MONTH);	  

    //显示前后十年
    yearHtml = "";
    for(var i = NOW_YEAR - 10;i <= NOW_YEAR + 10;i++){
    	yearHtml += '<li value="'+i+'">'+i+'年</li>'
    }
    $(".calendar-selectYear").html(yearHtml);
    $(".calendar-selectYear").find("li").hover(function(){
        $(this).addClass("calendar-checked");
    },function(){
        if($(this).attr("value") == $(".calendar-showYear").attr("value")){
            $(this).addClass("calendar-checked");
        }else{
           $(this).removeClass("calendar-checked"); 
        }
    })
    //显示月
    var monthHtml = "";
    for(var i = 1;i <= 12;i++){
    	monthHtml += '<li value="'+i+'">'+i+'</li>'
    }
    $(".calendar-selectMonth").html(monthHtml);
    $(".calendar-selectMonth").find("li").hover(function(){
        $(this).addClass("calendar-checked");
    },function(){
        if($(this).attr("value") == $(".calendar-showMonth").attr("value")){
            $(this).addClass("calendar-checked");
        }else{
           $(this).removeClass("calendar-checked"); 
        }
    })
	//---获取时分秒
    function SetTime(){
    	var nowTime = new Date();
    	$('.calendar-Hour span').html(nowTime.getHours() < 10 ?"0"+nowTime.getHours():nowTime.getHours());
    	$('.calendar-Minute span').html(nowTime.getMinutes() < 10?"0"+nowTime.getMinutes():nowTime.getMinutes());
    	$('.calendar-Second span').html(nowTime.getSeconds() < 10?"0"+nowTime.getSeconds():nowTime.getSeconds());
    }
    SetTime();
	calendar_Time = setInterval(SetTime,1000);

	//点击修改时间
    $(".calendar-time li").off("click");
    $(".calendar-time li").on("click",function(){
    	var spanVal = $(this).find("span").text();
    	$(this).find("span").css({display:"none"});
    	$(this).find("input").css({display:"block"}).focus().val(spanVal);
    	clearInterval(calendar_Time);
    	inputBlur($(this),spanVal);
        yearOrMonthHidden();
    })
    
    function inputBlur(_this,spanVal){
    	_this.find("input").off("blur");
    	_this.find("input").on("blur",function(e){
    		var _thisPar = $(this).parents("li.calendar-liTime");
    		if($(this).val() != ""){
    			if($(this).attr("name") == "h"){
    				if($(this).val()>= 0 && $(this).val()< 24 ){
			    		_thisPar.find("span").css({display:"block"});
				    	_thisPar.find("input").css({display:"none"});
				    	$(this).parents(".calendar-head").find(".calendar-alertMessage").html("").css({display:"none"});
				    	_thisPar.find("span").html(parseFloat($(this).val()).toFixed(0)<10?"0"+parseFloat($(this).val()).toFixed(0):parseFloat($(this).val()).toFixed(0));
			    	}else if($(this).val() < 0 || $(this).val() >= 24){
			    		_thisPar.find("span").css({display:"none"});
				    	_thisPar.find("input").css({display:"block"});
				    	$(this).parents(".calendar-head").find(".calendar-alertMessage").html("小于0大于24").css({color:"red",display:"block"});
				    	$(this).focus();
			    	}
    			}else if($(this).attr("name") == "m" || $(this).attr("name") == "s"){
    				if($(this).val()>= 0 && $(this).val()< 60 ){
			    		_thisPar.find("span").css({display:"block"});
				    	_thisPar.find("input").css({display:"none"});
				    	$(this).parents(".calendar-head").find(".calendar-alertMessage").html("").css({display:"none"});
				    	_thisPar.find("span").html(parseFloat($(this).val()).toFixed(0)<10?"0"+parseFloat($(this).val()).toFixed(0):parseFloat($(this).val()).toFixed(0));
			    	}else if($(this).val() < 0 || $(this).val() >= 60){
			    		_thisPar.find("span").css({display:"none"});
				    	_thisPar.find("input").css({display:"block"});
				    	$(this).parents(".calendar-head").find(".calendar-alertMessage").html("不能小于0大于60").css({display:"block"});
				    	$(this).focus();
			    	}
    			}
    		}else{
    			_thisPar.find("span").css({display:"block"});
		    	_thisPar.find("input").css({display:"none"});
		    	_thisPar.find("span").html(spanVal);
    		}
	    })
    }


    var othertime = '';
    if(other == "Y"){
    	$(".calendar-timeDiv").empty();
    	html ='<select class="calendar-otherSelect">'
    		for(var i = 0; i < 24; i++){
    			html+=	'<option value="'+(i<10?"0"+i:i)+':00:00">'+(i<10?"0"+i:i)+':00:00</option>'
    		}
    	+'</select>'
    	$(".calendar-timeDiv").html(html);	
    	othertime = "00:00:00";
    	$(".calendar-otherSelect").on("change",function(){
    		othertime = $(".calendar-otherSelect").val();
            yearOrMonthHidden();
    	})
    }
		
    //选择年份月份
    function yearOrMonth(){
    	//年份选择框隐藏出现
	    $(".calendar-showYear").off("click").on("click",function(){
            var _this = $(this);
            $(".calendar-selectMonth").css({display:"none"});
            console.log($(".calendar-selectYear").css("display"))
	    	if($(".calendar-selectYear").css("display") == "none"){
                $(".calendar-selectYear").css({display:"block"});
                $(".calendar-selectYear").find("li").each(function(){
                    if(_this.attr("value") == $(this).attr("value")){
                        $(this).addClass("calendar-checked").siblings("li").removeClass("calendar-checked");
                        return false;
                    }
                })
	    		
	    	}else{
	    		$(".calendar-selectYear").css({display:"none"});
	    	}
	    })
	    //月份选择框隐藏出现
	    $(".calendar-showMonth").on("click",function(){
            var _this = $(this);
            $(".calendar-selectYear").css({display:"none"});
	    	if($(".calendar-selectMonth").css("display") == "none"){
                $(".calendar-selectMonth").find("li").each(function(){
                    if(_this.attr("value") == $(this).attr("value")){
                        $(this).addClass("calendar-checked").siblings("li").removeClass("calendar-checked");
                        return false;
                    }
                })
	    		$(".calendar-selectMonth").css({display:"block"});
	    	}else{
	    		$(".calendar-selectMonth").css({display:"none"});
	    	}
	    })
	    //选择年份值
	    $(".calendar-selectYear li").each(function(){
	    	$(this).click(function(){
	    		$(".calendar-showYear").html($(this).val()+"年").attr("value",$(this).val());
	    		$(".calendar-selectYear").css({display:"none"});
	    		var setMonth = $(".calendar-showMonth").attr("value");
	    		$(".calendar-everyData").html("");
	    		getYearMonth($(this).val(),setMonth);
	    	})
	    })
	    //选择月份值
	    $(".calendar-selectMonth li").each(function(){
	    	$(this).click(function(){
	    		$(".calendar-showMonth").html($(this).val() + "月").attr("value",$(this).val());
	    		$(".calendar-selectMonth").css({display:"none"});
	    		var setYear = $(".calendar-showYear").attr("value");
	    		getYearMonth(setYear,$(this).val());
	    	})
	    })
		
	    //点击加减月份
	    $(".calendar-nextMonth").on("click",function(){
            clickNextMonth();
	    })
	    $(".calendar-prevMonth").on("click",function(){
            clickPrevMonth();
	    })
        
	}
	yearOrMonth();
    //点击上一个月
    $(".calendar-selectPrevMonth").on("click",function(){
        clickPrevMonth();
    })
    $(".calendar-selectPrevMonth").hover(function(){
        $(this).css({opacity:"1"});
    },function(){
        $(this).css({opacity:"0.5"});
    })
    //点击下一个月
    $(".calendar-selectNextMonth").on("click",function(){
        clickNextMonth();
    })
    $(".calendar-selectNextMonth").hover(function(){
        $(this).css({opacity:"1"});
    },function(){
        $(this).css({opacity:"0.5"});
    })
    //上一个月
	function clickPrevMonth(){
        $(".calendar-selectYear").css({display:"none"});
        var years = $(".calendar-showYear").attr("value") * 1;
        var months = $(".calendar-showMonth").attr("value") * 1;
        if(years >= NOW_YEAR - 10){
            if(months > 1){
                $(".calendar-showMonth").html(months - 1 +"月").attr("value",months - 1);
                getYearMonth(years,months - 1);
            }else if(months == 1 && years != (NOW_YEAR - 10)){
                $(".calendar-showYear").html(years - 1+"年").attr("value",years -1);
                $(".calendar-showMonth").html(12 +"月").attr("value",12);
                getYearMonth(years - 1 ,12);
            }
            $(".calendar-selectMonth").css({display:"none"});
        }
    }
    //下一个月
    function clickNextMonth(){
        $(".calendar-selectYear").css({display:"none"});
        var years = $(".calendar-showYear").attr("value") * 1;
        var months = $(".calendar-showMonth").attr("value") * 1;
        if(years <= NOW_YEAR+10){
            if(months < 12){
                $(".calendar-showMonth").html(months + 1 +"月").attr("value",months + 1);
                getYearMonth(years,months + 1);
            }else if(months == 12 && years != (NOW_YEAR + 10)){
                $(".calendar-showYear").html(years + 1+"年").attr("value",years + 1);
                $(".calendar-showMonth").html(1 +"月").attr("value",1);
                getYearMonth(years + 1 ,1);
            }
            $(".calendar-selectMonth").css({display:"none"});
        }
    }
    function yearOrMonthHidden(){
        $(".calendar-selectYear").css({display:"none"});
        $(".calendar-selectMonth").css({display:"none"});
    }

    function monthData(){
    	if(NOW_MONTH == 1){
    		preYear = (NOW_YEAR * 1) - 1;
    		preMonth = 12;
    		nextYear = NOW_YEAR;
    		nextMonth = NOW_MONTH + 1;
    	}else if(NOW_MONTH == 12){
    		preYear = NOW_YEAR;
    		preMonth = 11;
    		nextYear = (NOW_YEAR * 1) + 1;
    		nextMonth = 1;
    	}else{
    		preYear = NOW_YEAR;
    		preMonth = (NOW_MONTH * 1) - 1;
    		nextYear = NOW_YEAR;
    		nextMonth = (NOW_MONTH * 1) + 1;
    	}

    	//获取当前月
    	var html = "";
        var Class = "";
    	for( i=1; i <= MONTH_ALL_DAY;i++){
            if(isClick == "Y"){

               Class = i > NOW_DAY?"calendar-isClick":""; 
            }
	    	var everyWeek = new Date(NOW_YEAR,NOW_MONTH-1,i).getDay();
	    	 html += '<li class="'+Class+'">'
	    		+ 	'<span class="calendar-everyDay" week="'+everyWeek+'">'+i+'</span>'
	    		+ 	'<input type="hidden" class="" value="'+NOW_YEAR+'-'+(NOW_MONTH<10?"0"+NOW_MONTH:""+NOW_MONTH)+'-'+(i<10?"0"+i:""+i)+'"/>'
	    		+ '</li>'
    	}
    	$(".calendar-content_day").html(html);
    	//获取上一个月补齐前面天
    	for(j = PREV_MONTH_ALL_DAY; j > PREV_MONTH_ALL_DAY-FIRST_WEEK;j--){
			$('<li class="calendar-on">'
			+ 	'<span class="calendar-everyDay-on" >'+j+'</span>'
			+ 	'<input type="hidden" value="'+preYear+'-'+(preMonth<10?"0"+preMonth:""+preMonth)+'-'+(j<10?"0"+j:""+j)+'"/>'
			+ '</li>').prependTo(".calendar-content_day");
	    }
	    //获取下一个月补齐后面几天
	    for(m = 1; m <= 6 - END_WEEK; m++){
	    	$(".calendar-content_day").append('<li class="calendar-on">'
			+ 	'<span class="calendar-everyDay-on" >'+(m)+'</span>'
			+ 	'<input type="hidden" value="'+nextYear+'-'+(nextMonth<10?"0"+nextMonth:""+nextMonth)+'-'+(m<10?"0"+m:""+m)+'"/>'
			+ '</li>');
	    }

    }
    monthData();
		
    function getYearMonth(year,month){
    	var preYear;
    	var preMonth;
    	var nextYear;
    	var nextMonth;
    	if(month == 1){
    		preYear = (year * 1) - 1;
    		preMonth = 12;
    		nextYear = year;
    		nextMonth = month + 1;
    	}else if(month == 12){
    		preYear = year;
    		preMonth = 11;
    		nextYear = (year * 1) + 1;
    		nextMonth = 1;
    	}else{
    		preYear = year;
    		preMonth = (month * 1) - 1;
    		nextYear = year;
    		nextMonth = (month * 1) + 1;
    	}
    	var day = new Date(year,month,0); 
    	var getMonthDay = day.getDate();
    	var prevDay = new Date(year,month-1,0);//上一个月
    	var getPrevMonthDay = prevDay.getDate();//上一个月多少天
    	var getWeek = new Date(year,month-1,1).getDay();//选择年月的第一天是星期几
    	var endWeek = new Date(year,month-1,getMonthDay).getDay();//选择年月的最后一天是星期几
    	var Class = "";
    	var html = "";
    	for( i = 1; i <= getMonthDay; i++){
	    	var geteveryWeek = new Date(year,month-1,i).getDay()
            if(isClick == "Y"){
               Class = (month == NOW_MONTH && year == NOW_YEAR && i > NOW_DAY) || (month > NOW_MONTH && year >= NOW_YEAR)?"calendar-isClick":"";
            }
	    	html+= '<li class="'+Class+'">'
	    		+ 	'<span class="calendar-everyDay" week="'+geteveryWeek+'">'+i+'</span>'
	    		+ 	'<input type="hidden" class="" value="'+year+'-'+(month<10?"0"+month:month)+'-'+(i<10?"0"+i:i)+'"/>'
	    		+ '</li>'
    	}
    	$(".calendar-content_day").html(html);

    	// console.log(getPrevMonthDay)
    	for(j = getPrevMonthDay; j >= getPrevMonthDay-getWeek+1 ; j--){
			$('<li class="calendar-on">'
			+ 	'<span class="calendar-everyDay-on" >'+j+'</span>'
			+ 	'<input type="hidden" class="" value="'+preYear+'-'+(preMonth<10?"0"+preMonth:preMonth)+'-'+(j<10?"0"+j:j)+'"/>'
			+ '</li>').prependTo(".calendar-content_day");
	    }

	    for(m = 1; m <= 6 - endWeek; m++){
	    	$(".calendar-content_day").append('<li class="calendar-on">'
			+ 	'<span class="calendar-everyDay-on" >'+m+'</span>'
			+ 	'<input type="hidden" value="'+nextYear+'-'+(nextMonth<10?"0"+nextMonth:nextMonth)+'-'+(m<10?"0"+m:m)+'"/>'
			+ '</li>');
	    }
	    changeBgColor()
    }

    //返回今天
    $(".calendar-back").click(function(){
    	$(".calendar-showYear").html(NOW_YEAR + "年").attr("value",NOW_YEAR);
    	$(".calendar-showMonth").html(NOW_MONTH + "月").attr("value",NOW_MONTH);
        getYearMonth(NOW_YEAR,NOW_MONTH);
        calendar_Time = setInterval(SetTime,1000);
    	changeBgColor();
        yearOrMonthHidden();
    })


    //改变选中的背景颜色
    function changeBgColor(){
    	$("span[week = '0']").css({color:"#fd5b5b"});
    	$("span[week = '6']").css({color:"#fd5b5b"});
    	$(".calendar-content_day").find("li").each(function(){
    		$(this).on("click",function(){
                yearOrMonthHidden();
                if($(this).hasClass("calendar-isClick")){
                    return false;
                }
                
			    var times = $('.calendar-time-hour span').text();
			    var minutes = $('.calendar-time-minute span').text();
			    var miao = $('.calendar-time-second span').text();

    			defaultsStatus();
    			$(this).find("span").css({backgroundColor:"#fd5b5b",color:"#fff",fontSize:"16px"});
    			// clearInterval(calendar_Time);
    		})
    		//判断当前天背景变色
            if($(this).find("span").text() == NOW_DAY){
                if($(this).find("input").val() == (""+NOW_YEAR)+'-'+(NOW_MONTH<10?"0"+NOW_MONTH:""+NOW_MONTH)+'-'+(NOW_DAY<10?"0"+NOW_DAY:""+NOW_DAY)){
                    defaultsStatus();
                    $(this).find("span").css({backgroundColor:"#fd5b5b",color:"#fff",fontSize:"16px"});
                    return false;
                }else{
                    defaultsStatus();
                   $(this).find("span").css({backgroundColor:"#fd5b5b",color:"#fff",fontSize:"16px"}); 
                }
            }
    	})
    }
    changeBgColor();
    function defaultsStatus(){
        $(".calendar-content_day").find("li span").css({backgroundColor:"#fff",color:"#424242",fontSize:"14px"});
        $(".calendar-content_day span.calendar-everyDay-on").css({color:"#ccc"});
        $(".calendar-content_day").find("span[week='0']").css({color:"#fd5b5b"});
        $(".calendar-content_day").find("span[week='6']").css({color:"#fd5b5b"});
    }

})
   
     
   
          
