$(function(){
	var other = "N";
	var calendar_Time;
		
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
    for(var i =NOW_YEAR-10;i<NOW_YEAR+10;i++){
    	yearHtml += '<li value="'+i+'">'+i+'年</li>'
    }
    $(".calendar-selectYear").html(yearHtml);

    //显示月
    var monthHtml = "";
    for(var i = 1;i < 13;i++){
    	monthHtml += '<li value="'+i+'">'+i+'</li>'
    }
    $(".calendar-selectMonth").html(monthHtml)

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
    })

    function inputBlur(_this,spanVal){
    	_this.find("input").off("blur")
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
    	})
    }
		
    //选择年份月份
    function yearOrMonth(){
    	//年份选择框隐藏出现
	    $(".calendar-showYear").on("click",function(){
	    	if($(".calendar-selectYear").css("display") == "none"){
	    		$(".calendar-selectYear").css({display:"block"});
	    	}else{
	    		$(".calendar-selectYear").css({display:"none"});
	    	}
	    })
	    //月份选择框隐藏出现
	    $(".calendar-showMonth").on("click",function(){
	    	if($(".calendar-selectMonth").css("display") == "none"){
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
	    		getYearMonth($(this).val(),setMonth)
	    	})

	    })
	    //选择月份值
	    $(".calendar-selectMonth li").each(function(){
	    	$(this).click(function(){
	    		$(".calendar-showMonth").html($(this).val() + "月").attr("value",$(this).val());
	    		$(".calendar-selectMonth").css({display:"none"});
	    		var setYear = $(".calendar-showYear").attr("value");
	    		getYearMonth(setYear,$(this).val())
	    		
	    	})
	    })
		
	    //加减月份
	    $(".calendar-nextMonth").on("click",function(){
	    	var years = $(".calendar-showYear").attr("value") * 1;
	    	var months = $(".calendar-showMonth").attr("value") * 1;
	    	if(months > 1){
	    		$(".calendar-showMonth").html(months - 1 +"月").attr("value",months - 1);
	    		$(".calendar-selectMonth").css({display:"none"});
	    		getYearMonth(years,months - 1)
	    	}
	    })
	    $(".calendar-prevMonth").on("click",function(){
	     	var years = $(".calendar-showYear").attr("value") * 1;
	    	var months = $(".calendar-showMonth").attr("value") * 1;
	    	if(months < 12){
	    		$(".calendar-showMonth").html(months + 1 +"月").attr("value",months + 1);
	    		$(".calendar-selectMonth").css({display:"none"});
	    		getYearMonth(years,months + 1)
	    	}
	    })
	}
	yearOrMonth();
		    
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
    	for( i=1; i <= MONTH_ALL_DAY;i++){
	    	var everyWeek = new Date(NOW_YEAR,NOW_MONTH-1,i).getDay();
	    	 html += '<li>'
	    		+ 	'<span name="'+everyWeek+'">'+i+'</span>'
	    		+ 	'<input type="hidden" class="" value="'+NOW_YEAR+'-'+(NOW_MONTH<10?"0"+NOW_MONTH:""+NOW_MONTH)+'-'+(i<10?"0"+i:""+i)+'"/>'
	    		+ '</li>'
    	}
    	$(".calendar-everyData").html(html);
    	//获取上一个月补齐前面天
    	for(j = PREV_MONTH_ALL_DAY; j > PREV_MONTH_ALL_DAY-FIRST_WEEK;j--){
			$('<li class="calendar-on">'
			+ 	'<span class="calendar-everyData-add-span">'+j+'</span>'
			+ 	'<input type="hidden" value="'+preYear+'-'+(preMonth<10?"0"+preMonth:""+preMonth)+'-'+(j<10?"0"+j:""+j)+'"/>'
			+ '</li>').prependTo(".calendar-everyData");
	    }
	    //获取下一个月补齐后面几天
	    for(m = 1; m <= 6 - END_WEEK; m++){
	    	$(".calendar-everyData").append('<li class="calendar-on">'
			+ 	'<span class="calendar-everyData-add-span">'+(m)+'</span>'
			+ 	'<input type="hidden" value="'+nextYear+'-'+(preMonth<10?"0"+preMonth:""+preMonth)+'-'+(m<10?"0"+m:""+m)+'"/>'
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
    	
    	var html = "";
    	for( i = 1; i <= getMonthDay; i++){
	    	var geteveryWeek = new Date(year,month-1,i).getDay()
	    	html+= '<li>'
	    		+ 	'<span name="'+geteveryWeek+'">'+i+'</span>'
	    		+ 	'<input type="hidden" class="" value="'+year+'-'+(month<10?"0"+month:month)+'-'+(i<10?"0"+i:i)+'"/>'
	    		+ '</li>'
    	}
    	$(".calendar-everyData").html(html);

    	// console.log(getPrevMonthDay)
    	for(j = getPrevMonthDay; j >= getPrevMonthDay-getWeek+1 ; j--){
			$('<li class="calendar-on">'
			+ 	'<span class="calendar-everyData-add-span">'+j+'</span>'
			+ 	'<input type="hidden" class="" value="'+preYear+'-'+(preMonth<10?"0"+preMonth:preMonth)+'-'+(j<10?"0"+j:j)+'"/>'
			+ '</li>').prependTo(".calendar-everyData");
	    }

	    for(m = 1; m <= 6 - endWeek; m++){
	    	$(".calendar-everyData").append('<li class="calendar-on">'
			+ 	'<span class="calendar-everyData-add-span">'+m+'</span>'
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
    })


    //改变选中的背景颜色
    function changeBgColor(){
    	$("span[name = '0']").css({color:"#fd5b5b"});
    	$("span[name = '6']").css({color:"#fd5b5b"});
    	$(".calendar-everyData").find("li").each(function(){
    		$(this).click(function(){
    			//返回选择的值
    			// if(calendar.para.resource && calendar.para.resource != ""){

			    	var times = $('.calendar-time-hour span').text();

			    	var minutes = $('.calendar-time-minute span').text();

			        var miao = $('.calendar-time-second span').text();

    			// 	if(calendar.para.addtime == "Y" && calendar.para.onlyone == "S"){
    			// 		calendar.para.resource.val($(this).find("input").val() + " 00:00:00");
    			// 	}else if(calendar.para.addtime == "Y" && calendar.para.onlyone == "E"){
    			// 		calendar.para.resource.val($(this).find("input").val() + " 23:59:59");
    			// 	}else if(calendar.para.addtime == "Y"){
    			// 		calendar.para.resource.val($(this).find("input").val() + " " +times+":"+minutes+":"+miao ).focus();
    			// 	}else if(calendar.para.other == "Y"){
    			// 		calendar.para.resource.val($(this).find("input").val() + " " +othertime ).focus();
    			// 	}else{
    			// 		calendar.para.resource.val($(this).find("input").val()).focus();
    			// 	}
    			// 	if(calendar.para.backstrfunc && calendar.para.backstrfunc != null && calendar.para.backstrfunc != "" && typeof(calendar.para.backstrfunc) == 'function'){
    			// 		var obj = {};
    			// 		obj.date = $(this).find("input").val();
    			// 		obj.times = times;
    			// 		obj.minutes = minutes;
    			// 		obj.miao = miao;
    			// 		calendar.para.backstrfunc(obj);
    			// 	}
    			// 	calendar.para.assisdiv.css({display:"none"});
    			// 	calendar.para.assisdiv.find(".platformmng-relaceModel").html("");
    				
    			// }
    			$(".calendar-everyData").find("li span").css({backgroundColor:"#fff",color:"#424242",fontSize:"14px"});
    			$(".calendar-everyData span.calendar-everyData-add-span").css({color:"#ccc"});
    			$(".calendar-everyData").find("span[name='0']").css({color:"#fd5b5b"});
    			$(".calendar-everyData").find("span[name='6']").css({color:"#fd5b5b"});
    			$(this).find("span").css({backgroundColor:"#fd5b5b",color:"#fff",fontSize:"16px"});
    			clearInterval(calendar_Time);
    		})
    		//判断当前天背景变色
    		if($(this).find("input").val() == (""+NOW_YEAR)+'-'+(NOW_MONTH<10?"0"+NOW_MONTH:""+NOW_MONTH)+'-'+(NOW_DAY<10?"0"+NOW_DAY:""+NOW_DAY)){
    			$(this).find("span").css({backgroundColor:"#fd5b5b",color:"#fff",fontSize:"16px"});
    		}
    		
    	})
    }
    changeBgColor();
    

})
   
     
   
          
